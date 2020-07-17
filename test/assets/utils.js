const  _ = require('lodash');
const assert = require('assert');
const fixtures = require('../fixtures');

const path = require('path');
const fs = require('fs');
const Q = require('q');
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const reqSrc = p => require(PROJECT_ROOT + '/src/server/' + p);

const Client = reqSrc('client');
const Socket = require('./mock-websocket');
const Logger = require(PROJECT_ROOT + '/src/server/logger');
const Storage = require(PROJECT_ROOT + '/src/server/storage/storage');
const ServiceStorage = reqSrc('services/storage');
const mainLogger = new Logger('netsblox:test');
const serverUtils = reqSrc('server-utils');
const Services = reqSrc('services/api').services;
const Projects = reqSrc('storage/projects');
const NetworkTopology = reqSrc('network-topology');

NetworkTopology.init(new Logger('netsblox:test'), Client);

// load the *exact* XML_Serializer from Snap!... pretty hacky...
(function() {
    var clientDir = path.join(PROJECT_ROOT, 'src', 'browser'),
        srcFiles = ['morphic.js', 'xml.js', 'store.js', 'actions.js'],
        src;

    src = srcFiles
        .map(file => path.join(clientDir, file))
        .map(file => {
            var code = fs.readFileSync(file, 'utf8');
            if (file.includes('morphic.js')) {
                code = code
                    .split('// Morph')[0]
                    .split('// Global Functions')[1];
            }

            if (file.includes('store.js')) {  // remove the SnapSerializer stuff
                code = code.split('StageMorph.prototype.toXML')[0];
            }
            return code;
        })
        .join('\n');


    // expose the XML_Serializer
    src = [
        'modules = {};',
        'window = {location:{}};',
        'var CLIENT_ID, SERVER_URL;',
        'var SnapActions;',
        'var SnapCloud = {};',
        src,
        'global.Browser = global.Browser || {};',
        'global.Browser.XML_Serializer = XML_Serializer;',
        'global.Browser.SnapActions = SnapActions;'
    ].join('\n');
    eval(src);
})(this);

// Test loading of xml
const idBlocks = block => {
    block.attributes.collabId = 'testId';
    block.children.forEach(child => idBlocks(child));
    return block;
};

const parser = new Browser.XML_Serializer();
const canLoadXml = string => {
    var xml;

    // Add a collabId and reserialize
    var res = Browser.SnapActions.assignUniqueIds(string);
    xml = res.toString();
    assert(parser.parse(xml));
};

// Create configured room helpers
let logger = new Logger('netsblox:test');
const createSocket = function(username) {
    const socket = new Client(logger, new Socket());
    socket.uuid = serverUtils.getNewClientId();
    socket.username = username || socket.uuid;
    NetworkTopology.onConnect(socket);
    return socket;
};

const createRoom = async function(config) {
    // Get the room and attach a project
    const roleNames = Object.keys(config.roles);

    // Ensure there is an owner
    config.owner = config.owner || roleNames
        .map(name => config.roles[name])
        .reduce((l1, l2) => l1.concat(l2), [])
        .unshift();

    const {name, owner} = config;
    const project = await Projects.new({name, owner});
    const roles = roleNames.map(name => serverUtils.getEmptyRole(name));
    await project.setRoles(roles);
    const ids = await project.getRoleIdsFor(roleNames);

    const projectId = project.getId();
    roleNames.forEach((name, i) => {
        const roleId = ids[i];
        const usernames = config.roles[name] || [];

        usernames.forEach(username => {
            const socket = createSocket(username);
            NetworkTopology.setClientState(socket.uuid, projectId, roleId, username);
            return socket;
        });
    });

    return project;

};

const sendEmptyRole = function(msg) {
    return {
        type: 'project-response',
        id: msg.id,
        project: serverUtils.getEmptyRole(this.role)
    };
};

let connection = null;
const connect = async function() {
    const mongoUri = 'mongodb://127.0.0.1:27017/netsblox-tests';
    if (!connection) {
        connection = Storage.connect(mongoUri)
            .then(async db => {
                await ServiceStorage.init(logger, db);
                return db;
            });
    }
    return await connection;
};

const clearCache = function() {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(arg => {
        try {
            let fullName = require.resolve(arg);
            delete require.cache[fullName];
        } catch(e) {
            throw `${arg}: ${e}`;
        }
    });
};

const reset = function(seedDefaults=true) {
    let db = null;
    // TODO: load the seed data
    // Reload the server and the paths
    let routes = fs.readdirSync(path.join(__dirname, '..', '..', 'src', 'server', 'routes'))
        .map(file => `../../src/server/routes/${file}`);
    let modulesToRefresh = routes.concat('../../src/server/server');
    clearCache.apply(null, modulesToRefresh);

    return Q(connect())
        .then(_db => db = _db)
        .then(() => db.dropDatabase())
        .then(() => fixtures.init(Storage, db))
        .then(() => seedDefaults && fixtures.seedDefaults(Storage))
        .then(() => logger.info('Finished loading test fixtures!'))
        .then(() => Storage._db);
};

const sleep = delay => {
    const deferred = Q.defer();
    setTimeout(deferred.resolve, delay);
    return deferred.promise;
};

async function shouldThrow(fn, Err, msg) {
    try {
        await fn();
    } catch (err) {
        if (err instanceof Error) {
            assert.equal(err.constructor.name, Err.name, `Expected ${Err.name}. Found ${err}`);
        } else {
            console.error(`Caught ${typeof err}:`, err);
        }
        return;
    }
    throw new Error(msg || `Expected fn to throw ${Err.name}`);
}

function suiteName(filename) {
    return filename
        .replace(PROJECT_ROOT, '')
        .replace(new RegExp('/test/(unit/server|[a-z]+)/'), '')
        .replace(/\.js$/, '');
}

async function expect(fn, err) {
    const start = Date.now();
    const maxEndTime = start + 1500;
    while (!await fn()) {
        await sleep(25);
        if (Date.now() > maxEndTime) {
            throw err;
        }
    }
}

module.exports = {
    verifyRPCInterfaces: function(serviceName, interfaces) {
        describe(`${serviceName} interfaces`, function() {
            before(async () => {
                await connect();
                await Services.initialize();
            });

            interfaces.forEach(interface => {
                const [name, expected=[]] = interface;

                it(`${name} args should be ${expected.join(', ')}`, function() {
                    const args = Services.getArgumentsFor(serviceName, name);
                    assert(_.isEqual(args, expected), `Found ${args.join(', ')}`);
                });
            });

            it(`should not have any untested RPCs`, function() {
                const expectedRPCs = interfaces.map(pair => pair[0]);
                const actualRPCs = Services.getMethodsFor(serviceName);
                const untestedRPCs = _.difference(actualRPCs, expectedRPCs);
                assert(
                    untestedRPCs.length === 0,
                    `Found extra (untested) RPCs: ${untestedRPCs.join(', ')}`
                );
            });
        });
    },
    XML_Serializer: Client.XML_Serializer,
    canLoadXml: canLoadXml,

    connect: connect,
    reset: reset,
    sleep: sleep,
    logger: mainLogger,
    createRoom: createRoom,
    createSocket: createSocket,
    sendEmptyRole: sendEmptyRole,
    shouldThrow,
    fixtures,
    suiteName,
    expect,
    nop: () => {},

    reqSrc
};

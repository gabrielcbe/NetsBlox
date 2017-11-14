// blob storage used for the raw project storage and media storage
// Set the location using NETSBLOX_BLOB_DIR (default is /<netsblox-root>/blob-storage)

// Functionality:
//  - CRD (create/store, get, remove/delete)
//    - they should all be "promisified"
//  - create should return id (hash - probably sha256)

// The blob will have a "backend" such as fs or s3
// The blob will store data by...
//   - projects:
//     - in projects/
//       - src@role@project@owner.xml
//       - media@role@project@owner.xml
//   - user-actions:

const Logger = require('../../logger'),
    logger = new Logger('netsblox:blob'),
    _ = require('lodash'),
    Q = require('q');

const FsBackend = require('./fs-backend');
var BlobStorage = function() {
    // create the given directory, if needed
    this.backend = new FsBackend(logger);
};

BlobStorage.prototype.configure = function(options) {
    return this.backend.configure(options);
};

BlobStorage.prototype.putRole = function(role, project) {
    // store the source code and media and return the metadata object
    const basename = this.getRoleUuid(role, project);
    const content = _.clone(role);
    return Q.all([
            this.backend.put('projects', `src@${basename}`, content.SourceCode),
            this.backend.put('projects', `media@${basename}`, content.Media),
        ])
        .then(ids => {
            const [srcId, mediaId] = ids;

            content.SourceCode = srcId;
            content.Media = mediaId;
            return content;
        });
};

BlobStorage.prototype.getRole = function(role, project) {
    const content = _.clone(role);
    return Q.all([
            this.backend.get('projects', role.SourceCode),
            this.backend.get('projects', role.Media),
        ])
        .then(data => {
            const [src, media] = data;

            content.SourceCode = src;
            content.Media = media;
            return content;
        });
};

BlobStorage.prototype.deleteRole = function(role, project) {
    const basename = this.getRoleUuid(role, project);
    return this.backend.delete('projects', basename);
};

BlobStorage.prototype.getRoleUuid = function(role, project) {
    // TODO: escape existing @ symbols?
    // TODO: what if the project/role is renamed? Then we should use the ids from the role...
    // could I just make ids that I guarantee to be unique? add some counter?
    // I could add a timestamp and server name?
    return [
        role.ProjectName,
        project.name,
        project.owner
    ].join('@');
};

BlobStorage.prototype.putUserAction = function(event) {
    let type = 'user-actions';
    let preprocess = Q();

    // If openProject, store the project in the blob
    if (event.action.type === 'openProject' && event.action.args.length) {
        var xml = event.action.args[0];
        if (xml && xml.substring(0, 10) === 'snapdata') {
            // split the media, source code
            var endOfCode = xml.lastIndexOf('</project>') + 10,
                code = xml.substring(11, endOfCode),
                media = xml.substring(endOfCode).replace('</snapdata>', '');

            preprocess = Q.all([code, media].map(data => blob.put(data)))
                .then(hashes => event.action.args[0] = hashes);
        } else if (xml) {  // store the xml in one chunk in the blob
            preprocess = Q.all([xml].map(data => blob.put(data)))
                .then(hashes => event.action.args[0] = hashes);
        }
    }

    return preprocess()
        .then(event => event);
};

module.exports = new BlobStorage();
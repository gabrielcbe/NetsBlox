// init decorator

SpriteMorph.prototype.originalInit = SpriteMorph.prototype.init;
SpriteMorph.prototype.init = function(globals) {
  this.originalInit(globals);
};

// Cria novas categorias;

SpriteMorph.prototype.categories.push('mBot')
SpriteMorph.prototype.categories.push('Sphero')
SpriteMorph.prototype.categories.push('LittleBits')
SpriteMorph.prototype.categories.push('SalaIoT')
SpriteMorph.prototype.categories.push('Arduino')
SpriteMorph.prototype.categories.push('RaspberryPi')

// Da novas cores para as categorias;

SpriteMorph.prototype.blockColor.mBot = new Color(20, 193, 253);
SpriteMorph.prototype.blockColor.Sphero = new Color(0, 100, 200);
SpriteMorph.prototype.blockColor.LittleBits = new Color(74, 0, 139);
SpriteMorph.prototype.blockColor.SalaIoT = new Color(180, 180, 180);
SpriteMorph.prototype.blockColor.Arduino = new Color(29, 32, 135);
SpriteMorph.prototype.blockColor.RaspberryPi = new Color(42, 75, 29);

/*

// %br     - user-forced line break
// %s      - white rectangular type-in slot ("string-type")
// %txt    - white rectangular type-in slot ("text-type")
// %mlt    - white rectangular type-in slot ("multi-line-text-type")
// %code   - white rectangular type-in slot, monospaced font
// %n      - white roundish type-in slot ("numerical")
// %dir    - white roundish type-in slot with drop-down for directions
// %inst   - white roundish type-in slot with drop-down for instruments
// %ida    - white roundish type-in slot with drop-down for list indices
// %idx    - white roundish type-in slot for indices incl. "any"
// %obj    - specially drawn slot for object reporters
// %rel    - chameleon colored rectangular drop-down for relation options
// %spr    - chameleon colored rectangular drop-down for object-names
// %col    - chameleon colored rectangular drop-down for collidables
// %dst    - chameleon colored rectangular drop-down for distances
// %cst    - chameleon colored rectangular drop-down for costume-names
// %eff    - chameleon colored rectangular drop-down for graphic effects
// %snd    - chameleon colored rectangular drop-down for sound names
// %key    - chameleon colored rectangular drop-down for keyboard keys
// %msg    - chameleon colored rectangular drop-down for messages
// %att    - chameleon colored rectangular drop-down for attributes
// %fun    - chameleon colored rectangular drop-down for math functions
// %typ    - chameleon colored rectangular drop-down for data types
// %var    - chameleon colored rectangular drop-down for variable names
// %shd    - Chameleon colored rectuangular drop-down for shadowed var names
// %lst    - chameleon colored rectangular drop-down for list names
// %b      - chameleon colored hexagonal slot (for predicates)
// %bool   - chameleon colored hexagonal slot (for predicates), static
// %l      - list icon
// %c      - C-shaped command slot, special form for primitives
// %loop   - C-shaped with loop arrow, special form for certain primitives
// %ca     - C-shaped with loop arrow, for custom blocks
// %cs     - C-shaped, auto-reifying, accepts reporter drops
// %cl     - C-shaped, auto-reifying, rejects reporters
// %cla    - C-shaped with loop arrows, auto-reifying, rejects reporters
// %clr    - interactive color slot
// %t      - inline variable reporter template
// %anyUE  - white rectangular type-in slot, unevaluated if replaced
// %boolUE - chameleon colored hexagonal slot, unevaluated if replaced
// %f      - round function slot, unevaluated if replaced,
// %r      - round reporter slot
// %p      - hexagonal predicate slot
// %vid    - chameleon colored rectangular drop-down for video modes
//
// rings:
//
// %cmdRing    - command slotted ring with %ringparms
// %repRing    - round slotted ringn with %ringparms
// %predRing   - diamond slotted ring with %ringparms
//
// arity: multiple
//
// %mult%x      - where %x stands for any of the above single inputs
// %inputs      - for an additional text label 'with inputs'
// %words       - for an expandable list of default 2 (used in JOIN)
// %exp         - for a static expandable list of minimum 0 (used in LIST)
// %scriptVars  - for an expandable list of variable reporter templates
// %parms       - for an expandable list of formal parameters
// %ringparms   - the same for use inside Rings
//
// special form: upvar
//
// %upvar       - same as %t (inline variable reporter template)
//
// special form: input name
//
// %inputName   - variable blob (used in input type dialog)
//
// examples:
//
//     'if %b %c else %c'        - creates Scratch's If/Else block
//     'set pen color to %clr'   - creates Scratch's Pen color block
//     'list %mult%s'            - creates BYOB's list reporter block
//     'call %n %inputs'         - creates BYOB's Call block
//     'the script %parms %c'    - creates BYOB's THE SCRIPT block
//

*/

SpriteMorph.prototype.originalInitBlocks = SpriteMorph.prototype.initBlocks;
SpriteMorph.prototype.initMindMakersBlocks = function() {

  this.blocks.mBotUltraSonic = {
    type: 'reporter',
    category: 'mBot',
    spec: 'ultrasonic sensor'
  };
  this.blocks.mBotLightSensor = {
    type: 'reporter',
    category: 'mBot',
    spec: 'light sensor'
  };
  this.blocks.mBotLineFollower = {
    type: 'reporter',
    category: 'mBot',
    spec: 'line follower'
  };

  this.blocks.mBotRun = {
    type: 'command',
    category: 'mBot',
    spec: 'move motor left: %mbot1 right: %mbot1',
    defaults: [125, 125]
  };
  this.blocks.mBotStop = {
    type: 'command',
    category: 'mBot',
    spec: 'stop'
  };
  this.blocks.mBotMotor = {
    type: 'command',
    category: 'mBot',
    spec: 'set motor %mbot2 to %mbot1',
    defaults: [
      ['Both'], 125
    ]
  };
  this.blocks.mBotTurn = {
    type: 'command',
    category: 'mBot',
    spec: 'motors turn %mbot9 speed %mbot1',
    defaults: [
      ['Clockwise'], 125
    ]
  };
  this.blocks.mBotServo = { //Unico que não esta funcionando ainda.
    type: 'command',
    category: 'mBot',
    spec: 'set servo port: %mbot3 slot: %mbot4 angle: %mbot5',
    defaults: ['1', '1', 100]
  };
  this.blocks.mBotLed = {
    type: 'command',
    category: 'mBot',
    spec: 'set LED %mbot6 R: %n G: %n B: %n',
    defaults: [
      ['Both'], 255, 255, 255
    ]
  };
  this.blocks.mBotBuzzer = {
    type: 'command',
    category: 'mBot',
    spec: 'play tone on note: %mbot7 beat: %mbot8',
    defaults: ['B4', '1/4']
  };


  this.blocks.ArduinoReportConnected = {
    type: 'predicate',
    category: 'Arduino',
    spec: 'arduino connected?'
  };
  this.blocks.ArduinoDigital_write = {
    type: 'command',
    category: 'Arduino',
    spec: 'write digital pin %arduinoDIGITAL %onoff',
    defaults: ['2', 1]
  };
  this.blocks.ArduinoPMW_write = {
    type: 'command',
    category: 'Arduino',
    spec: 'write PWM pin %arduinoPWM %n %',
    defaults: ['3', '51']
  };
  this.blocks.ArduinoTone_on = {
    type: 'command',
    category: 'Arduino',
    spec: 'tone pin %arduinoDIGITAL %n Hz %n ms',
    defaults: ['2', '100', '50']
  };
  this.blocks.ArduinoServo = {
    type: 'command',
    category: 'Arduino',
    spec: 'write servo pin %arduinoDIGITAL %n Deg.',
    defaults: ['2', 90]
  };

  this.blocks.ArduinoAnalog_Read = {
    type: 'reporter',
    category: 'Arduino',
    spec: 'read analog pin %arduinoANALOG',
    defaults: ['A0']
  };
  this.blocks.ArduinoDigital_Read = {
    type: 'reporter',
    category: 'Arduino',
    spec: 'read digital pin %arduinoDIGITAL',
    defaults: ['2']
  };
  this.blocks.ArduinoSonar_read = {
    type: 'reporter',
    category: 'Arduino',
    spec: 'read sonar  T %arduinoDIGITAL  E %arduinoDIGITAL',
    defaults: ['2', '3']
  };


  this.blocks.RaspberryPiReportConnected = {
    type: 'predicate',
    category: 'RaspberryPi',
    spec: 'raspberryPi connected?'
  };
  this.blocks.RpiRemoteIP = {
    type: 'command',
    category: 'RaspberryPi',
    spec: 'connect to remote station: %RemoteStations',
    defaults: ['A']
  };
  this.blocks.RpiDigital_write = {
    type: 'command',
    category: 'RaspberryPi',
    spec: 'write digital pin %rpipins %onoff',
    defaults: ['2', '1']
  };
  this.blocks.RpiPMW_write = {
    type: 'command',
    category: 'RaspberryPi',
    spec: 'write PWM pin %rpipins %n %',
    defaults: ['2', '50']
  };
  this.blocks.RpiTone_on = {
    type: 'command',
    category: 'RaspberryPi',
    spec: 'tone pin %rpipins %n Hz %n ms',
    defaults: ['2', '100', '50']
  };
  this.blocks.RpiServo = {
    type: 'command',
    category: 'RaspberryPi',
    spec: 'write servo pin %rpipins %n Deg.',
    defaults: ['2', 90]
  };
  this.blocks.RpiDigital_Read = {
    type: 'reporter',
    category: 'RaspberryPi',
    spec: 'read digital pin %rpipins',
    defaults: ['2']
  };
  this.blocks.RpiSonar_read = {
    type: 'reporter',
    category: 'RaspberryPi',
    spec: 'read sonar  T %rpipins  E %rpipins',
    defaults: ['2', '3']
  };





  this.blocks.SpheroTotalColisoes = {
    type: 'reporter',
    category: 'Sphero',
    spec: 'total collisions'
  };
  this.blocks.SpheroResetColisoes = {
    type: 'command',
    category: 'Sphero',
    spec: 'set total collisions to 0'
  };
  this.blocks.SpheroLED = {
    type: 'command',
    category: 'Sphero',
    spec: 'set LED to %sphero1', // valor %sphero1 fica definido como um "case" em blocks.js
    defaults: ['white']
  };


  this.blocks.BLEout = {
    type: 'command',
    category: 'LittleBits',
    spec: 'set value to %n',
    defaults: [125]
  };
  this.blocks.BLEoutTxt = {
    type: 'command',
    category: 'LittleBits',
    spec: 'set value to %blebit1',
    defaults: [
      ['on']
    ]
  };
  this.blocks.BLEin = {
    type: 'reporter',
    category: 'LittleBits',
    spec: 'Bit input value'
  };


  this.blocks.LampBLEonoff = {
    type: 'command',
    category: 'SalaIoT',
    spec: 'set white mode to %blebit1',
    defaults: [
      ['on']
    ]
  };

  this.blocks.LampBLERGB = {
    type: 'command',
    category: 'SalaIoT',
    spec: 'set color mode to R: %n , G: %n , B: %n',
    defaults: [255, 255, 255]
  };

  this.blocks.LampBLEAnyClr = {
    type: 'command',
    category: 'SalaIoT',
    spec: 'set color mode to %clr' //,
    //defaults: [255 , 255 , 255]
  };

  this.blocks.LampBLEIntensity = {
    type: 'command',
    category: 'SalaIoT',
    spec: 'set color mode to %RGBW with intensity %n',
    defaults: [
      ['white'], 100
    ]
  };




}

SpriteMorph.prototype.initBlocks = function() {
  this.originalInitBlocks();
  this.initMindMakersBlocks();
};

SpriteMorph.prototype.initBlocks();

// blockTemplates decorator

SpriteMorph.prototype.originalBlockTemplates = SpriteMorph.prototype.blockTemplates;
SpriteMorph.prototype.blockTemplates = function(category) {
  var myself = this,
    blocks = myself.originalBlockTemplates(category);
  //console.log('this' + myself);

  //  Button that triggers a connection attempt
  myself.mBotConnectButton = new PushButtonMorph(
    null,
    function() {
      this.statusConnectionmBot();
    },
    'Connect mBot'
  );

  //  Button that triggers a disconnection from board
  myself.mBotDisconnectButton = new PushButtonMorph(
    null,
    function() {
      this.registraDesconexaoMBOT();
    },
    'Disconnect mBot'
  );

  myself.SpheroConnectButton = new PushButtonMorph(
    null,
    function() {
      this.statusConnectionSphero();
    },
    'Connect Sphero'
  );

  myself.SpheroDisconnectButton = new PushButtonMorph(
    null,
    function() {
      this.registraDesconexaoSphero();
    },
    'Disconnect Sphero'
  );

  myself.BLEBitConnectButton = new PushButtonMorph(
    null,
    function() {
      this.statusConnectionBLEBIT();
    },
    'Connect BLEBit'
  );

  myself.BLEBitDisconnectButton = new PushButtonMorph(
    null,
    function() {
      this.registraDesconexaoBLEBIT();
    },
    'Disconnect BLEBit'
  );
  myself.ArduinoConnectButton = new PushButtonMorph(
    null,
    function() {
      this.statusConnectionArduino();
    },
    'Connect Arduino'
  );

  myself.ArduinoDisconnectButton = new PushButtonMorph(
    null,
    function() {
      this.registraDesconexaoArduino();
    },
    'Disconnect Arduino'
  );

  myself.RaspberryPiConnectButton = new PushButtonMorph(
    null,
    function() {
      this.statusConnectionRaspberryPi();
    },
    'Connect RaspberryPi'
  );

  myself.RaspberryPiDisconnectButton = new PushButtonMorph(
    null,
    function() {
      this.registraDesconexaoRaspberryPi();
    },
    'Disconnect RaspberryPi'
  );
  myself.LampBLEConnectButton = new PushButtonMorph(
    null,
    function() {
      this.statusConnectionLampBLE();
    },
    'Connect LampBLE'
  );

  myself.LampBLEDisconnectButton = new PushButtonMorph(
    null,
    function() {
      this.registraDesconexaoLampBLE();
    },
    'Disconnect LampBLE'
  );





  function blockBySelector(selector) {
    if (StageMorph.prototype.hiddenPrimitives[selector]) {
      return null;
    }
    var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
    newBlock.isTemplate = true;
    return newBlock;
  };

  if (category === 'mBot') {

    blocks.push(myself.mBotConnectButton);
    blocks.push(myself.mBotDisconnectButton);
    blocks.push('-');

    //blocks.push(watcherToggle('mBotUltraSonic'));
    blocks.push(blockBySelector('mBotUltraSonic'));

    //blocks.push(watcherToggle('mBotLightSensor'));
    blocks.push(blockBySelector('mBotLightSensor'));

    //blocks.push(watcherToggle('mBotLineFollower'));
    blocks.push(blockBySelector('mBotLineFollower'));
    blocks.push('-');

    blocks.push(blockBySelector('mBotStop'));
    blocks.push(blockBySelector('mBotRun'));
    blocks.push(blockBySelector('mBotMotor'));
    blocks.push(blockBySelector('mBotTurn'));
    blocks.push('-');

    blocks.push(blockBySelector('mBotServo'));
    blocks.push(blockBySelector('mBotLed'));
    blocks.push(blockBySelector('mBotBuzzer'));

  } else if (category === 'Sphero') {

    blocks.push(myself.SpheroConnectButton);
    blocks.push(myself.SpheroDisconnectButton);
    blocks.push('-');

    blocks.push(blockBySelector('SpheroTotalColisoes'));
    blocks.push('-');

    blocks.push(blockBySelector('SpheroResetColisoes'));
    blocks.push('-');

    blocks.push(blockBySelector('SpheroLED'));



  } else if (category === 'LittleBits') {

    blocks.push(myself.BLEBitConnectButton);
    blocks.push(myself.BLEBitDisconnectButton);
    blocks.push('-');

    blocks.push(blockBySelector('BLEin'));
    //blocks.push(watcherToggle('BLEin'));
    blocks.push('-');

    blocks.push(blockBySelector('BLEout'));
    blocks.push(blockBySelector('BLEoutTxt'));


  } else if (category === 'Arduino') {

    blocks.push(myself.ArduinoConnectButton);
    blocks.push(myself.ArduinoDisconnectButton);
    blocks.push('-');
    blocks.push(blockBySelector('ArduinoReportConnected'));
    blocks.push('=');

    blocks.push(blockBySelector('ArduinoAnalog_Read')); // ainda não está funcionando
    blocks.push('-');
    blocks.push(blockBySelector('ArduinoDigital_Read')); // ainda não está funcionando
    blocks.push('-');
    blocks.push(blockBySelector('ArduinoSonar_read')); // ainda não está funcionando
    blocks.push('=');

    blocks.push(blockBySelector('ArduinoDigital_write')); // ainda não está funcionando
    blocks.push('-');
    blocks.push(blockBySelector('ArduinoPMW_write')); // ainda não está funcionando
    blocks.push('-');
    blocks.push(blockBySelector('ArduinoTone_on')); // ainda não está funcionando
    blocks.push('-');
    blocks.push(blockBySelector('ArduinoServo')); // ainda não está funcionando
    blocks.push('-');


    // blocks.push(blockBySelector('ArduinoPinSetUp'));
    // blocks.push(blockBySelector('ArduinoPinWrite'));
    // blocks.push(blockBySelector('ArduinoPMWPinWrite'));
    // blocks.push('=');
    //
    // blocks.push(blockBySelector('ArduinoPinReadDigital'));
    // blocks.push('-');
    //
    // blocks.push(blockBySelector('ArduinoPinReadAnalog'));
    // blocks.push('=');
    //
    // blocks.push(blockBySelector('ArduinoLED'));
    // blocks.push('=');
    //
    // blocks.push(blockBySelector('ArduinoServo'));
    // blocks.push('=');
    //
    // blocks.push(blockBySelector('ArduinoButtonPressed'));

  } else if (category === 'SalaIoT') {

    blocks.push(myself.LampBLEConnectButton);
    blocks.push(myself.LampBLEDisconnectButton);
    blocks.push('=');

    blocks.push(blockBySelector('LampBLEonoff'));
    blocks.push('-');
    blocks.push(blockBySelector('LampBLEIntensity'));
    blocks.push('-');
    blocks.push(blockBySelector('LampBLEAnyClr'));
    blocks.push('-');
    blocks.push(blockBySelector('LampBLERGB'));
    blocks.push('-');




  } else if (category === 'RaspberryPi') {

    blocks.push(myself.RaspberryPiConnectButton);
    blocks.push(myself.RaspberryPiDisconnectButton);

    blocks.push('-');
    blocks.push(blockBySelector('RpiRemoteIP'));
    blocks.push('-');
    blocks.push(blockBySelector('RaspberryPiReportConnected'));
    blocks.push('=');

    blocks.push(blockBySelector('RpiDigital_Read')); // ainda não está funcionando
    blocks.push('-');
    blocks.push(blockBySelector('RpiSonar_read')); // ainda não está funcionando
    blocks.push('=');

    blocks.push(blockBySelector('RpiDigital_write')); // ainda não está funcionando
    blocks.push('-');
    blocks.push(blockBySelector('RpiPMW_write')); // ainda não está funcionando
    blocks.push('-');
    blocks.push(blockBySelector('RpiTone_on')); // ainda não está funcionando
    blocks.push('-');
    blocks.push(blockBySelector('RpiServo')); // ainda não está funcionando
    blocks.push('-');




    // blocks.push('=');


  }



  return blocks;
};


/*
//---------------------------------------------------------------
//--------------Definição das funções dos blocos-----------------
//---------------------------------------------------------------
*/

//Sensores mBot
SpriteMorph.prototype.mBotUltraSonic = function() {
  if (clienteConectadoMBOT == false) {
    alert("mBot not connected");

  } else {
    return ultrasound
  }
};

SpriteMorph.prototype.mBotLightSensor = function() {
  if (clienteConectadoMBOT == false) {
    alert("mBot not connected");

  } else {
    return light
  }
};

SpriteMorph.prototype.mBotLineFollower = function() {
  if (clienteConectadoMBOT == false) {
    alert("mBot not connected");

  } else {
    return line

  }
}

//Atuadores mBot
SpriteMorph.prototype.mBotRun = function(speed1, speed2) {
  if (!lastmsg1) {
    var lastmsg1 = -1
  }
  if (!lastmsg2) {
    var lastmsg2 = -1
  }

  if (speed1 != lastmsg1) { //tentativa de tratar mensagens duplicadas
    lastmsg1 = speed1;

    if (speed1 > 255) { //validação de speed máxima
      speed1 = 255;
    } else if (speed1 < -255) {
      speed1 = -255;
    }

    if (speed1 >= 0) {

      var comando = DCMOTORM1;
      var valor = DCMOTOR_FORWARD + ',' + speed1;
      sendMessagemBot(comando, valor); //manda o valor
    } else {
      speed1 = -speed1;

      var comando = DCMOTORM1;
      var valor = DCMOTOR_BACK + ',' + speed1;
      sendMessagemBot(comando, valor); //manda o valor
    }
  }

  if (speed2 != lastmsg2) { //tentativa de tratar mensagens duplicadas
    lastmsg2 = speed2;

    if (speed2 > 255) { //validação de speed máxima
      speed2 = 255;
    } else if (speed2 < -255) {
      speed2 = -255;
    }

    if (speed2 >= 0) {

      var comando = DCMOTORM2;
      var valor = DCMOTOR_FORWARD + ',' + speed2;
      sendMessagemBot(comando, valor); //manda o valor
    } else {
      speed2 = -speed2;

      var comando = DCMOTORM2;
      var valor = DCMOTOR_BACK + ',' + speed2;
      sendMessagemBot(comando, valor); //manda o valor
    }
  }
};

SpriteMorph.prototype.mBotTurn = function(direction, speed) {
  if (speed > 255) {
    speed = 255;
  }
  if (speed < -255) {
    speed = -255;
  }

  if (direction == "Clockwise") {

    if (speed >= 0) {

      var comando = DCMOTORS_RIGHT;
      var valor = speed + ",0,0";
      sendMessagemBot(comando, valor); //manda o valor

    } else {
      speed = -speed;

      var comando = DCMOTORS_LEFT;
      var valor = speed + ",0,0";
      sendMessagemBot(comando, valor); //manda o valor

    }

  } else {

    if (speed >= 0) {

      var comando = DCMOTORS_LEFT;
      var valor = speed + ",0,0";
      sendMessagemBot(comando, valor); //manda o valor

    } else {
      speed = -speed;

      var comando = DCMOTORS_RIGHT;
      var valor = speed + ",0,0";
      sendMessagemBot(comando, valor); //manda o valor

    }
  }
};

SpriteMorph.prototype.mBotStop = function() {
  var comando = DCMOTORS;
  var valor = "0,0,0";
  sendMessagemBot(comando, valor); //manda o valor

};

SpriteMorph.prototype.mBotMotor = function(motor, speed) {
  if (speed > 255) {
    speed = 255;
  }
  if (speed < -255) {
    speed = -255;
  }

  if (motor == "M1") {

    if (speed >= 0) {

      var comando = DCMOTORM1;
      var valor = DCMOTOR_FORWARD + ',' + speed;
      sendMessagemBot(comando, valor); //manda o valor

    } else {
      speed = -speed;

      var comando = DCMOTORM1;
      var valor = DCMOTOR_BACK + ',' + speed;
      sendMessagemBot(comando, valor); //manda o valor

    }

  } else if (motor == "M2") {

    if (speed >= 0) {

      var comando = DCMOTORM2;
      var valor = DCMOTOR_FORWARD + ',' + speed;
      sendMessagemBot(comando, valor); //manda o valor

    } else {
      speed = -speed;

      var comando = DCMOTORM2;
      var valor = DCMOTOR_BACK + ',' + speed;
      sendMessagemBot(comando, valor); //manda o valor

    }

  } else {
    //Ambos or Both
    if (speed >= 0) { //validação de frente ou ré

      var comando = DCMOTORS;
      var valor = speed + ",0,0";
      sendMessagemBot(comando, valor); //manda o valor

    } else {
      speed = -speed;

      var comando = DCMOTORS_BACK;
      var valor = speed + ",0,0";
      sendMessagemBot(comando, valor);

    }
  }
};

SpriteMorph.prototype.mBotServo = function(connector, slot, angle) {
  var now = +new Date();
  if (now - lastmsg > 1000) { // 1 s
    lastmsg = now;
    if (angle > 150) {
      angle = 150;
    }

    var comando = SERVOMOTOR;
    var valor = connector + ',' + slot + ',' + angle;
    sendMessagemBot(comando, valor); //manda o valor

  }
}

SpriteMorph.prototype.mBotLed = function(index, red, green, blue) {
  var now = +new Date();
  if (now - lastmsg > 1000) { // 1s
    lastmsg = now;
    if (red > 255) {
      red = 255;
    }
    if (green > 255) {
      green = 255;
    }
    if (blue > 255) {
      blue = 255;
    }

    if (index == "1") {

      var comando = LEDLEFT;
      var valor = red + "," + green + "," + blue;
      sendMessagemBot(comando, valor);

    } else if (index == "2") {

      var comando = LEDRIGHT;
      var valor = red + "," + green + "," + blue;
      sendMessagemBot(comando, valor);

    } else {

      var comando = LEDBOTH;
      var valor = red + "," + green + "," + blue;
      sendMessagemBot(comando, valor);

    }
  }
}

SpriteMorph.prototype.mBotBuzzer = function(tone, beat) {
  //console.log('min: '+min)
  if (min < 125)
    min = 125;
  else
    min = eval(beat) * 1000;

  var now = +new Date();
  if (now - lastmsg > min) { // 500ms
    lastmsg = now;

    var comando = PLAYNOTE;
    var valor = tone + ',' + beat;
    sendMessagemBot(comando, valor);

  } else {
    console.log('too fast');
  }
}


SpriteMorph.prototype.ArduinoReportConnected = function () {
  if (!clienteConectadoArduino) {
    if (!connection_pending_arduino) {
      globalthis.statusConnectionArduino();
      connection_pending_arduino = true;
    }
  }
  if (!clienteConectadoArduino) {
    let callbackEntry = [this.ArduinoDigital_write.bind(this)];
    wait_open_arduino.push(callbackEntry);
  } else {
    return isBoardReady();
  }
};

SpriteMorph.prototype.ArduinoDigital_write = function (pin, value) {
  if (!clienteConectadoArduino) {
    if (!connection_pending_arduino) {
      globalthis.statusConnectionArduino();
      connection_pending_arduino = true;
    }
  }
  if (!clienteConectadoArduino) {
    let callbackEntry = [this.ArduinoDigital_write.bind(this), pin, value];
    wait_open_arduino.push(callbackEntry);
  } else {
    pin = parseInt(pin, 10);
    if (pin_modes_arduino[pin] !== DIGITAL_OUTPUT) {
      pin_modes_arduino[pin] = DIGITAL_OUTPUT;
      msg = {
        command: "set_mode_digital_output",
        pin: pin,
      };
      msg = JSON.stringify(msg);
      console.log(msg);
      clientArduino.send(msg);
    }

    value = parseInt(value, 10);
    if (value >= 1) value = 1;
    else if (value <= 0) value = 0;

    msg = {
      command: "digital_write",
      pin: pin,
      value: value,
    };
    msg = JSON.stringify(msg);
    console.log(msg);
    if(digital_inputs_arduino[pin] != value){
      console.log('valor mudou')
      digital_inputs_arduino[pin] == value
    }else{
      console.log('valor era igual')
    }
    clientArduino.send(msg);
  }
};

SpriteMorph.prototype.ArduinoPMW_write = function (pin, value) {
  if (!clienteConectadoArduino) {
    if (!connection_pending_arduino) {
      globalthis.statusConnectionArduino();
      connection_pending_arduino = true;
    }
  }
  if (!clienteConectadoArduino) {
    let callbackEntry = [this.ArduinoPMW_write.bind(this), pin, value];
    wait_open_arduino.push(callbackEntry);
  } else {
    pin = parseInt(pin, 10);
    // maximum value for Arduino
    if (pin_modes_arduino[pin] !== PWM) {
      pin_modes_arduino[pin] = PWM;
      msg = {
        command: "set_mode_pwm",
        pin: pin,
      };
      msg = JSON.stringify(msg);
      console.log(msg);
      clientArduino.send(msg);
    }

    let the_max = 1023;
    value = parseInt(value, 10);
    if (value >= 100) value = 100;
    else if (value <= 0) value = 0;

    // calculate the value based on percentage
    value = the_max * (value / 100);
    value = Math.round(value);

    msg = {
      command: "pwm_write",
      pin: pin,
      value: value,
    };
    msg = JSON.stringify(msg);
    console.log(msg);
    if(analog_inputs_arduino[pin] != value){
      console.log('valor mudou')
      analog_inputs_arduino[pin] == value
    }else{
      console.log('valor era igual')
    }
    clientArduino.send(msg);
  }
};

SpriteMorph.prototype.ArduinoTone_on = function (pin, freq, duration) {
  if (!clienteConectadoArduino) {
    if (!connection_pending_arduino) {
      globalthis.statusConnectionArduino();
      connection_pending_arduino = true;
    }
  }
  if (!clienteConectadoArduino) {
    let callbackEntry = [this.ArduinoTone_on.bind(this), pin, freq, duration];
    wait_open_arduino.push(callbackEntry);
  } else {
    pin = parseInt(pin, 10);
    freq = parseInt(freq, 10);
    duration = parseInt(duration, 10);
    // make sure duration maximum is 5 seconds
    if (duration > 5000) {
      duration = 5000;
    }

    if (pin_modes_arduino[pin] !== TONE) {
      pin_modes_arduino[pin] = TONE;
      msg = {
        command: "set_mode_tone",
        pin: pin,
      };
      msg = JSON.stringify(msg);
      console.log(msg);
      clientArduino.send(msg);
    }

    msg = {
      command: "play_tone",
      pin: pin,
      freq: freq,
      duration: duration,
    };
    msg = JSON.stringify(msg);
    clientArduino.send(msg);
  }
};
SpriteMorph.prototype.ArduinoServo = function (pin, angle) {
  if (!clienteConectadoArduino) {
    if (!connection_pending_arduino) {
      globalthis.statusConnectionArduino();
      connection_pending_arduino = true;
    }
  }
  if (!clienteConectadoArduino) {
    let callbackEntry = [this.ArduinoServo.bind(this), pin, angle];
    wait_open_arduino.push(callbackEntry);
  } else {
    pin = parseInt(pin, 10);
    angle = parseInt(angle, 10);

    if (angle > 200) angle = 200;
    else if (angle < 0) angle = 0;

    if (pin_modes_arduino[pin] !== SERVO) {
      pin_modes_arduino[pin] = SERVO;
      msg = {
        command: "set_mode_servo",
        pin: pin,
      };
      msg = JSON.stringify(msg);
      console.log(msg);
      clientArduino.send(msg);
    }
    msg = {
      command: "servo_position",
      pin: pin,
      position: angle,
    };
    msg = JSON.stringify(msg);
    console.log(msg);
    clientArduino.send(msg);
  }
};
var globalthis = this;
SpriteMorph.prototype.ArduinoAnalog_Read = function (pin) {
  if (!clienteConectadoArduino) {
    if (!connection_pending_arduino) {
      globalthis.statusConnectionArduino();
      connection_pending_arduino = true;
    }
  }
  if (!clienteConectadoArduino) {
    let callbackEntry = [this.ArduinoAnalog_Read.bind(this), pin];
    wait_open_arduino.push(callbackEntry);
  } else {
    pin = parseInt(pin.split("")[1], 10);
    if (pin_modes_arduino[pin] !== ANALOG_INPUT) {
      pin_modes_arduino[pin] = ANALOG_INPUT;
      msg = {
        command: "set_mode_analog_input",
        pin: pin,
      };
      msg = JSON.stringify(msg);
      console.log(msg);
      clientArduino.send(msg);
    }
    //console.log('analog_inputs_arduino[pin]; ' + analog_inputs_arduino[pin])
    return analog_inputs_arduino[pin];
  }
};

SpriteMorph.prototype.ArduinoDigital_Read = function (pin) {
  if (!clienteConectadoArduino) {
    if (!connection_pending_arduino) {
      globalthis.statusConnectionArduino();
      connection_pending_arduino = true;
    }
  }
  if (!clienteConectadoArduino) {
    let callbackEntry = [this.ArduinoDigital_Read.bind(this), pin];
    wait_open_arduino.push(callbackEntry);
  } else {
    pin = parseInt(pin, 10);
    if (pin_modes_arduino[pin] !== DIGITAL_INPUT) {
      pin_modes_arduino[pin] = DIGITAL_INPUT;
      msg = {
        command: "set_mode_digital_input",
        pin: pin,
      };
      msg = JSON.stringify(msg);
      console.log(msg);
      clientArduino.send(msg);
    }

    return digital_inputs_arduino[pin];
  }
};
SpriteMorph.prototype.ArduinoSonar_read = function (trigger_pin, echo_pin) {
  if (!clienteConectadoArduino) {
    if (!connection_pending_arduino) {
      globalthis.statusConnectionArduino();
      connection_pending_arduino = true;
    }
  }
  if (!clienteConectadoArduino) {
    let callbackEntry = [
      this.ArduinoSonar_read.bind(this),
      trigger_pin,
      echo_pin,
    ];
    wait_open_arduino.push(callbackEntry);
  } else {
    pin = parseInt(pin, 10);
    trigger_pin = parseInt(trigger_pin, 10);
    sonar_report_pin_arduino = trigger_pin;

    echo_pin = parseInt(echo_pin, 10);

    if (pin_modes_arduino[trigger_pin] !== SONAR) {
      pin_modes_arduino[trigger_pin] = SONAR;
      msg = {
        command: "set_mode_sonar",
        trigger_pin: trigger_pin,
        echo_pin: echo_pin,
      };
      msg = JSON.stringify(msg);
      console.log(msg);
      clientArduino.send(msg);
    }

    return digital_inputs_arduino[sonar_report_pin_arduino];
  }
};


SpriteMorph.prototype.RaspberryPiReportConnected = function() {
  if (!clienteConectadoRaspberryPi) {
    if (!connection_pending_rpi) {
      globalthis.statusConnectionRaspberryPi();
      connection_pending_rpi = true;
    }
  }
  if (!clienteConectadoRaspberryPi) {
    let callbackEntry = [this.RaspberryPiReportConnected.bind(this)];
    wait_open_rpi.push(callbackEntry);
  } else {
    return isRpiReady();
  }
}

SpriteMorph.prototype.RpiRemoteIP = function(station) {
  //KNOWN ISSUE.. precisa fechar a velha antes de abir uma nova, teste abaixo nao funciona
  // if (clienteConectadoRaspberryPi) {
  //   //alert('WS client already connected ' + JSON.stringify(clientRaspberryPi));
  //   clientRaspberryPi.close();
  //
  //   clienteConectadoRaspberryPi = false;
  //   //registraDesconexaoRaspberryPi('abrir nova')
  //   // sleep(500);
  // }

  //pegar sala e se der erro, assume classNum =1
  var Http = new XMLHttpRequest();
  Http.open("GET", 'http://localhost:800/id');
  Http.send();

  Http.onreadystatechange = function (e) {

    if (Http.readyState != 4 || Http.status != 200)
      return;

    try {
      var retorno = JSON.parse(Http.responseText);
      console.log('retorno; ' + JSON.stringify(retorno));
      if (retorno && retorno != null) {
        var classNum = retorno.sala;
      }
    } catch (e) {
      console.log('Erro ao tentar recuperar sala = ' + e);
    }

    //classNum = parseInt(classNum, 10);
    //station = parseInt(station, 10);

    if (station < 1)
      station = 1;
    else if (station >= 1 && station <= 9)
      station = '0' + station;
    else
      station += station;

    console.log('trying to connect address: s' + classNum + 'e' + station)
    statusConnectionRaspberryPi('s' + classNum + 'e' + station);
  }

}

SpriteMorph.prototype.RpiDigital_write = function (pin, value) {
  if (!clienteConectadoRaspberryPi) {
    if (!connection_pending_rpi) {
      globalthis.statusConnectionRaspberryPi();
      connection_pending_rpi = true;
    }
  }
  if (!clienteConectadoRaspberryPi) {
    let callbackEntry = [this.RpiDigital_write.bind(this), pin, value];
    wait_open_rpi.push(callbackEntry);
  } else {
    pin = parseInt(pin, 10);

    if (pin_modes_rpi[pin] !== DIGITAL_OUTPUT) {
      pin_modes_rpi[pin] = DIGITAL_OUTPUT;
      msg = {
        command: "set_mode_digital_output",
        pin: pin,
      };
      msg = JSON.stringify(msg);
      clientRaspberryPi.send(msg);
    }

    value = parseInt(value, 10);

    if (value > 1) value = 1;
    else if (value < 0) value = 0;

    msg = {
      command: "digital_write",
      pin: pin,
      value: value,
    };
    msg = JSON.stringify(msg);
    console.log(msg);
    if(digital_inputs_rpi[pin] != value){
      console.log('valor mudou')
      digital_inputs_rpi[pin] == value
    }else{
      console.log('valor era igual')
    }
    clientRaspberryPi.send(msg);
  }
};
SpriteMorph.prototype.RpiPMW_write = function (pin, value) {
  if (!clienteConectadoRaspberryPi) {
    if (!connection_pending_rpi) {
      globalthis.statusConnectionRaspberryPi();
      connection_pending_rpi = true;
    }
  }
  if (!clienteConectadoRaspberryPi) {
    let callbackEntry = [this.RpiPMW_write.bind(this), pin, value];
    wait_open_rpi.push(callbackEntry);
  } else {
    pin = parseInt(pin, 10);

    if (pin_modes_rpi[pin] !== PWM) {
      pin_modes_rpi[pin] = PWM;
      msg = {
        command: "set_mode_pwm",
        pin: pin,
      };
      msg = JSON.stringify(msg);
      clientRaspberryPi.send(msg);
    }

    // maximum value for RPi
    let the_max = 254;
    value = parseInt(value, 10);

    if (value > 100) value = 100;
    else if (value < 0) value = 0;

    // calculate the value based on percentage
    value = the_max * (value / 100);
    value = Math.round(value);

    msg = {
      command: "pwm_write",
      pin: pin,
      value: value,
    };
    msg = JSON.stringify(msg);
    console.log(msg);

    if(analog_inputs_rpi[pin] != value){
      console.log('valor mudou')
      analog_inputs_rpi[pin] == value
    }else{
      console.log('valor era igual')
    }
    clientRaspberryPi.send(msg);
  }
};

SpriteMorph.prototype.RpiTone_on = function (pin, freq, duration) {
  if (!clienteConectadoRaspberryPi) {
    if (!connection_pending_rpi) {
      globalthis.statusConnectionRaspberryPi();
      connection_pending_rpi = true;
    }
  }
  if (!clienteConectadoRaspberryPi) {
    let callbackEntry = [this.RpiTone_on.bind(this), pin, freq, duration];
    wait_open_rpi.push(callbackEntry);
  } else {
    pin = parseInt(pin, 10);

    if (pin_modes_rpi[pin] !== TONE) {
      pin_modes_rpi[pin] = TONE;
      msg = {
        command: "set_mode_tone",
        pin: pin,
      };
      msg = JSON.stringify(msg);
      console.log(msg);
      clientRaspberryPi.send(msg);
    }

    freq = parseInt(freq, 10);
    duration = parseInt(duration, 10);
    // make sure maximum duration is 5 seconds
    if (duration > 5000) {
      duration = 5000;
    }

    msg = {
      command: "play_tone",
      pin: pin,
      freq: freq,
      duration: duration,
    };
    msg = JSON.stringify(msg);
    clientRaspberryPi.send(msg);
  }
};

SpriteMorph.prototype.RpiServo = function (pin, angle) {
  if (!clienteConectadoRaspberryPi) {
    if (!connection_pending_rpi) {
      globalthis.statusConnectionRaspberryPi();
      connection_pending_rpi = true;
    }
  }
  if (!clienteConectadoRaspberryPi) {
    let callbackEntry = [this.RpiServo.bind(this), pin, angle];
    wait_open_rpi.push(callbackEntry);
  } else {
    pin = parseInt(pin, 10);

    if (pin_modes_rpi[pin] !== SERVO) {
      pin_modes_rpi[pin] = SERVO;
      msg = {
        command: "set_mode_servo",
        pin: pin,
      };
      msg = JSON.stringify(msg);
      clientRaspberryPi.send(msg);
    }

    angle = parseInt(angle, 10);

    if (angle > 200) angle = 200;
    else if (angle < 0) angle = 0;

    msg = {
      command: "servo_position",
      pin: pin,
      position: angle,
    };

    msg = JSON.stringify(msg);
    console.log(msg);
    clientRaspberryPi.send(msg);
  }
};
SpriteMorph.prototype.RpiDigital_Read = function (pin) {
  if (!clienteConectadoRaspberryPi) {
    if (!connection_pending_rpi) {
      globalthis.statusConnectionRaspberryPi();
      connection_pending_rpi = true;
    }
  }
  if (!clienteConectadoRaspberryPi) {
    let callbackEntry = [this.RpiDigital_Read.bind(this), pin];
    wait_open_rpi.push(callbackEntry);
  } else {
    pin = parseInt(pin, 10);

    if (pin_modes_rpi[pin] !== DIGITAL_INPUT) {
      pin_modes_rpi[pin] = DIGITAL_INPUT;
      msg = {
        command: "set_mode_digital_input",
        pin: pin,
      };
      msg = JSON.stringify(msg);
      clientRaspberryPi.send(msg);
    }

    return digital_inputs[pin];
  }
};

SpriteMorph.prototype.RpiSonar_read = function (trigger_pin, echo_pin) {
  if (!clienteConectadoRaspberryPi) {
    if (!connection_pending_rpi) {
      globalthis.statusConnectionRaspberryPi();
      connection_pending_rpi = true;
    }
  }
  if (!clienteConectadoRaspberryPi) {
    let callbackEntry = [this.RpiSonar_read.bind(this), trigger_pin, echo_pin];
    wait_open_rpi.push(callbackEntry);
  } else {
    trigger_pin = parseInt(trigger_pin, 10);
    sonar_report_pin_rpi = trigger_pin;

    echo_pin = parseInt(echo_pin, 10);

    if (pin_modes_rpi[trigger_pin] !== SONAR) {
      pin_modes_rpi[trigger_pin] = SONAR;
      msg = {
        command: "set_mode_sonar",
        trigger_pin: trigger_pin,
        echo_pin: echo_pin,
      };
      msg = JSON.stringify(msg);
      clientRaspberryPi.send(msg);
    }

    return digital_inputs[sonar_report_pin_rpi];
  }
};

SpriteMorph.prototype.SpheroLED = function(cor) {
  var comando = COLOR;
  var valor = cor + '';
  sendMessageSphero(comando, valor);

}

SpriteMorph.prototype.SpheroTotalColisoes = function() {
  if (clienteConectadoSphero == false) {
    alert("BLEBit not connected");

  } else {
    return totalColisoes

  }
}
SpriteMorph.prototype.SpheroResetColisoes = function() {
  if (clienteConectadoSphero == false) {
    alert("BLEBit not connected");

  } else {
    totalColisoes = 0;

  }
}

SpriteMorph.prototype.BLEout = function(power) {
  if (clienteConectadoBLEBIT == false) {
    alert("BLEBit not connected");

  } else {
    if (power > 255) { //validação de valores
      power = 255;
    } else if (power < 0) {
      power = 0;
    }

    var valor = parseInt(power);
    sendMessageBLEBIT(valor);

  }
};

SpriteMorph.prototype.BLEoutTxt = function(text) {
  if (clienteConectadoBLEBIT == false) {
    alert("BLEBit not connected");

  } else {
    if (text == 'on') {
      sendMessageBLEBIT(255);

    } else if (text == 'off') {
      sendMessageBLEBIT(0);

    } else {
      console.log('Texto BLEoutTxt: ' + text);

    }
  }
};

SpriteMorph.prototype.BLEin = function() {
  if (clienteConectadoBLEBIT == false) {
    alert("BLEBit not connected");

  } else {
    return inputBLEBIT

  }
};

SpriteMorph.prototype.LampBLEonoff = function(text) {
  if (clienteConectadoLampBLE == false) {
    alert("LampBLE not connected");

  } else {
    if (text == 'on') {
      sendMessageLampBLE(LAMPADA_BRANCA, 255);

    } else if (text == 'off') {
      sendMessageLampBLE(LAMPADA_BRANCA, 0);

    } else {
      console.log('Texto LampBLEonoff: ' + text);

    }
  }
};

SpriteMorph.prototype.LampBLEIntensity = function(text, intensity) {
  if (clienteConectadoLampBLE == false) {
    alert("LampBLE not connected");

  } else {
    if (text == 'white') {
      sendMessageLampBLE(LAMPADA_BRANCA, intensity);

    } else if (text == 'off') {
      sendMessageLampBLE(LAMPADA_BRANCA, intensity);

    } else if (text == 'red') {
      var valor = intensity + ",0,0";
      sendMessageLampBLE(LAMPADA_RGB, valor);

    } else if (text == 'green') {
      var valor = "0," + intensity + ",0";
      sendMessageLampBLE(LAMPADA_RGB, valor);

    } else if (text == 'blue') {
      var valor = "0,0," + intensity;
      sendMessageLampBLE(LAMPADA_RGB, valor);

    } else {
      console.log('Texto LampBLEonoff: ' + text);

    }

  }
};

SpriteMorph.prototype.LampBLERGB = function(red, green, blue) {
  if (clienteConectadoLampBLE == false) {
    alert("LampBLE not connected");

  } else {

    var valor = red + "," + green + "," + blue;

    sendMessageLampBLE(LAMPADA_RGB, valor);

  }
};

SpriteMorph.prototype.LampBLEAnyClr = function(clr) {
  if (clienteConectadoLampBLE == false) {
    alert("LampBLE not connected");

  } else {
    clr = clr + "";
    var valor = clr.split("(");
    valor = valor[1].split(",");
    valor = valor[0] + "," + valor[1] + "," + valor[2];

    console.log('r,g,b: ' + valor);

    sendMessageLampBLE(LAMPADA_RGB, valor);

  }
};

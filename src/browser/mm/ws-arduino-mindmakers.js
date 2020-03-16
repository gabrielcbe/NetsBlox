///////////// Codigo Arduino

var clientArduino = null;
var PORTA_Arduino = 9000;
var urlConexaoRecenteArduino = "";
var clienteConectadoArduino = false;

// var DIGITAL_INPUT = 1;   //Alreaty defined in ws-gpio-mindmakers.js
// var DIGITAL_OUTPUT = 2;
// var PWM = 3;
// var SERVO = 4;
// var TONE = 5;
// var SONAR = 6;
// var ANALOG_INPUT = 7;

// an array to save the current pin mode
// this is common to all board types since it contains enough
// entries for all the boards.
// Modes are listed above - initialize to invalid mode of -1
var pin_modes_arduino = new Array(30).fill(-1);

// var connection_pending = false;

// general outgoing websocket message holder
var msg_arduino = null;

// the pin assigned to the sonar trigger
// initially set to -1, an illegal value
var sonar_report_pin_arduino = -1;

// arrays to hold input values
var digital_inputs_arduino = new Array(19);
var analog_inputs_arduino = new Array(5);

// flag to indicate if a websocket connect was
// ever attempted.
var connect_attempt_arduino = false;

// an array to buffer operations until socket is opened
var wait_open_arduino = [];

function isBoardReady() {
  return clienteConectadoArduino;
}

function registraDesconexaoArduino(dado) {
  if (dado !== undefined) {
    console.log('Entrou para deregistrarArduino: ' + JSON.stringify(dado));
  }
  clienteConectadoArduino = false;
  clientArduino.close();

}


//----Inicia websocket----//

function statusConnectionArduino(urlConexaoArduinoArg) {
  if (!urlConexaoArduinoArg || urlConexaoArduinoArg == "" || urlConexaoArduinoArg == "localhost") {
    urlConexaoRecenteArduino = 'localhost';
  } else if (urlConexaoArduinoArg.indexOf('.local') == -1) {
    urlConexaoRecenteArduino = urlConexaoArduinoArg + '.local';
  }

  if (clienteConectadoArduino) {
    //alert('WS client already connected ' + JSON.stringify(clientArduino));
    return;

  } else {
    connect_attempt_arduino = true;

    clientArduino = new WebSocket("ws://" + urlConexaoRecenteArduino + ":" + PORTA_Arduino);
    console.log('WebSocket Client Trying to Connect on Port: ' + PORTA_Arduino);
    var msg_arduino = JSON.stringify({
      "id": "to_arduino_gateway"
    });

    clientArduino.onopen = function() {
      alert('Arduino Connected')
      digital_inputs_arduino.fill(-1);

      analog_inputs_arduino.fill(0);
      // connection compvare
      clienteConectadoArduino = true;
      connect_attempt_arduino = true;
      // the message is built above
      clientArduino.send(msg_arduino);

      console.log('WebSocket Client Connected on Port: ' + PORTA_Arduino)
      for (var index = 0; index < wait_open_arduino.length; index++) {
        var data = wait_open_arduino[index];
        data[0](data[1]);
      }

      /* for(var pinos = 0; pinos < 19 ; pinos++){
        sendMessageArduino("set_mode_digital_output", pinos, null, function(){
          console.log('1pin: ' + pinos + 'tem valor zero');
          sendMessageArduino("digital_write", pinos, 0, function() {
            console.log('pin: ' + pinos + 'tem valor zero');
          })
        })
      }; */
      
    }

    clientArduino.onclose = function(e) {
      console.log("Conexão Arduino fechada.");
      digital_inputs_arduino.fill(0);
      analog_inputs_arduino.fill(0);
      pin_modes_arduino.fill(-1);
      
      clienteConectadoArduino = false;
      registraDesconexaoArduino(e);
    };

    clientArduino.onmessage = function(message) {
      clienteConectadoArduino = true;

      msg_arduino = JSON.parse(message.data);
      var report_type_arduino = msg_arduino["report"];
      var pin_arduino = null;
      var value = null;
      //console.log('mensagem arduino'+JSON.stringify(msg_arduino))
      //console.log('report_type_arduino; ' +report_type_arduino)

      // types - digital, analog, sonar
      if (report_type_arduino === 'digital_input') {
        pin_arduino = msg_arduino['pin'];
        pin_arduino = parseInt(pin_arduino, 10);
        value = msg_arduino['value'];
        digital_inputs_arduino[pin_arduino] = value;
      } else if (report_type_arduino === 'analog_input') {
        pin_arduino = msg_arduino['pin'];
        pin_arduino = parseInt(pin_arduino, 10);
        value = msg_arduino['value'];
        analog_inputs_arduino[pin_arduino] = value;
      } else if (report_type === 'sonar_data') {
        value = msg_arduino['value'];
        digital_inputs_arduino[sonar_report_pin_arduino] = value;
      }
      

    };

    clientArduino.onerror = function(error) {
      alert('Erro de conexão na porta: ' + PORTA_Arduino);
      clienteConectadoArduino = false;
      registraDesconexaoArduino(error);
    };

  }
};


function sendMessageArduino(comandoArduino, pinArduino, valorArduino, cb) {
  //alert(comandoArduino + ',' + valorArduino)
  comandoArduino = comandoArduino + ""
  pinArduino = parseInt(pinArduino, 10);
  valorArduino = parseInt(valorArduino, 10);

  if(valorArduino){
    var msg = {
      "command": comandoArduino,
      "pin": pinArduino,
      "value": valorArduino
    };
  }else{
    var msg = {
      "command": comandoArduino,
      "pin": pinArduino
    };
  }
    

  waitForSocketConnectionArduino(clientArduino, function() {
    clientArduino.send(JSON.stringify(msg));

    waitForSocketConnectionArduino(clientArduino, function() {
      //console.log('Arduino comando: ' + comandoArduino + ' valor: ' + valorArduino);
      if (cb !== undefined) {
        cb();
      }
    });

  });
};

function waitForSocketConnectionArduino(socket, callback) { //Valida que ws está aberta antes de mandar msg
  setTimeout(
    function() {
      if (socket.readyState === socket.OPEN) {
        if (callback !== undefined) {
          callback();
        }
        return;
      } else {
        waitForSocketConnectionArduino(socket, callback);
      }
    }, 5);
};

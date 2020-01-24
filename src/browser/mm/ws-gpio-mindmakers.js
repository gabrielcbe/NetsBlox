///////////// Codigo RaspberryPi

var clientRaspberryPi = null;
var PORTA_RaspberryPi = 9001;
var urlConexaoRecenteRaspberryPi = "";
var clienteConectadoRaspberryPi = false;

var DIGITAL_INPUT = 1;
var DIGITAL_OUTPUT = 2;
var PWM = 3;
var SERVO = 4;
var TONE = 5;
var SONAR = 6;
var ANALOG_INPUT = 7;

// an array to save the current pin mode
// this is common to all board types since it contains enough
// entries for all the boards.
// Modes are listed above - initialize to invalid mode of -1
var pin_modes = new Array(30).fill(-1);

var connection_pending = false;

// general outgoing websocket message holder
var msg = null;

// the pin assigned to the sonar trigger
// initially set to -1, an illegal value
var sonar_report_pin = -1;

// arrays to hold input values
var digital_inputs = new Array(32);
var analog_inputs = new Array(8);

// flag to indicate if a websocket connect was
// ever attempted.
var connect_attempt = false;

// an array to buffer operations until socket is opened
var wait_open = [];

function isRpiReady() {
  return clienteConectadoRaspberryPi;
}

function registraDesconexaoRaspberryPi(dado) {
  if (dado !== undefined) {
    console.log('Entrou para deregistrarRaspberryPi: ' + JSON.stringify(dado));
  }
  clienteConectadoRaspberryPi = false;
  clientRaspberryPi.close();

}


//----Inicia websocket----//

function statusConnectionRaspberryPi(urlConexaoRaspberryPiArg) {
  if (!urlConexaoRaspberryPiArg || urlConexaoRaspberryPiArg == "" || urlConexaoRaspberryPiArg == "localhost") {
    urlConexaoRecenteRaspberryPi = 'localhost';
  } else if (urlConexaoRaspberryPiArg.indexOf('.local') == -1) {
    urlConexaoRecenteRaspberryPi = urlConexaoRaspberryPiArg + '.local';
  }

  if (clienteConectadoRaspberryPi) {
    //alert('WS client already connected ' + JSON.stringify(clientRaspberryPi));
    return;

  } else {
    connect_attempt = true;

    clientRaspberryPi = new WebSocket("ws://" + urlConexaoRecenteRaspberryPi + ":" + PORTA_RaspberryPi);
    console.log('WebSocket Client Trying to Connect on Port: ' + PORTA_RaspberryPi);
    var msg = JSON.stringify({
      "id": "to_rpi_gateway"
    });

    clientRaspberryPi.onopen = function() {
      alert('GPIO Connected')
      digital_inputs.fill(0);

      analog_inputs.fill(0);
      // connection compvare
      clienteConectadoRaspberryPi = true;
      connect_attempt = true;
      // the message is built above
      clientRaspberryPi.send(msg);

      console.log('WebSocket Client Connected on Port: ' + PORTA_RaspberryPi)
      for (var index = 0; index < wait_open.length; index++) {
        var data = wait_open[index];
        data[0](data[1]);
      }
    };

    clientRaspberryPi.onclose = function(e) {
      console.log("Conexão RaspberryPi fechada.");
      clienteConectadoRaspberryPi = false;
      registraDesconexaoRaspberryPi(e);
    };

    clientRaspberryPi.onmessage = function(message) {
      clienteConectadoRaspberryPi = true;

      msg = JSON.parse(message.data);
      var report_type = msg["report"];
      var pin = null;
      var value = null;

      // types - digital, analog, sonar
      if (report_type === 'digital_input') {
        pin = msg['pin'];
        pin = parseInt(pin, 10);
        value = msg['value'];
        digital_inputs[pin] = value;
      } else if (report_type === 'analog_input') {
        pin = msg['pin'];
        pin = parseInt(pin, 10);
        value = msg['value'];
        analog_inputs[pin] = value;
      } else if (report_type === 'sonar_data') {
        value = msg['value'];
        digital_inputs[sonar_report_pin] = value;
      }

    };

    clientRaspberryPi.onerror = function(error) {
      alert('Erro de conexão na porta: ' + PORTA_RaspberryPi);
      clienteConectadoRaspberryPi = false;
      registraDesconexaoRaspberryPi(error);
    };

  }
};


function sendMessageRaspberryPi(comandoRaspberryPi, pinRaspberryPi, valorRaspberryPi, cb) {
  //alert(comandoRaspberryPi + ',' + valorRaspberryPi)

  waitForSocketConnectionRaspberryPi(clientRaspberryPi, function() {
    clientRaspberryPi.send(JSON.stringify({
      comando: comandoRaspberryPi,
      pin: pinRaspberryPi,
      valor: valorRaspberryPi
    }));

    waitForSocketConnectionRaspberryPi(clientRaspberryPi, function() {
      //console.log('RaspberryPi comando: ' + comandoRaspberryPi + ' valor: ' + valorRaspberryPi);
      if (cb !== undefined) {
        cb();
      }
    });

  });
};

function waitForSocketConnectionRaspberryPi(socket, callback) { //Valida que ws está aberta antes de mandar msg
  setTimeout(
    function() {
      if (socket.readyState === socket.OPEN) {
        if (callback !== undefined) {
          callback();
        }
        return;
      } else {
        waitForSocketConnectionRaspberryPi(socket, callback);
      }
    }, 5);
};

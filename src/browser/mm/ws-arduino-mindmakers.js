///////////// Codigo Arduino

let clientArduino = null;
const PORTA_Arduino = 9000;
let urlConexaoRecenteArduino = "";
let clienteConectadoArduino = false;

const DIGITAL_INPUT_arduino = 1; //Alreaty defined in ws-gpio-mindmakers.js
const DIGITAL_OUTPUT_arduino = 2;
const PWM_arduino = 3;
const SERVO_arduino = 4;
const TONE_arduino = 5;
const SONAR_arduino = 6;
const ANALOG_INPUT_arduino = 7;

// an array to save the current pin mode
// this is common to all board types since it contains enough
// entries for all the boards.
// Modes are listed above - initialize to invalid mode of -1
let pin_modes_arduino = new Array(30).fill(-1);

// has an websocket message already been received
let alerted_arduino = false;

let connection_pending_arduino = false;

// general outgoing websocket message holder
let msg_arduino = null;

// the pin assigned to the sonar trigger
// initially set to -1, an illegal value
let sonar_report_pin_arduino = -1;

// arrays to hold input values
let digital_inputs_arduino = new Array(32);
let analog_inputs_arduino = new Array(8);

// flag to indicate if a websocket connect was
// ever attempted.
let connect_attempt_arduino = false;

// an array to buffer operations until socket is opened
let wait_open_arduino = [];

let urlConexaoArduinoArg = "127.0.0.1";

function isBoardReady() {
  return clienteConectadoArduino;
}

function registraDesconexaoArduino(dado) {
  if (dado !== undefined) {
    console.log("Entrou para deregistrarArduino: " + JSON.stringify(dado));
  }
  clienteConectadoArduino = false;
  clientArduino.close();
}

//----Inicia websocket----//

function statusConnectionArduino(urlConexaoArduinoArg) {
  if (
    !urlConexaoArduinoArg ||
    urlConexaoArduinoArg == "" ||
    urlConexaoArduinoArg == "localhost"
  ) {
    urlConexaoRecenteArduino = "localhost";
  } else if (urlConexaoArduinoArg.indexOf(".local") == -1) {
    urlConexaoRecenteArduino = urlConexaoArduinoArg + ".local";
  }

  if (clienteConectadoArduino) {
    // ignore additional connection attempts
    return;
  } else {
    connect_attempt_arduino = true;

    let url = "ws://" + urlConexaoRecenteArduino + ":" + PORTA_Arduino;

    clientArduino = new WebSocket(url);

    msg_arduino = JSON.stringify({
      id: "to_arduino_gateway",
    });

    clientArduino.onopen = function () {
      msg_arduino = JSON.stringify({
        id: "to_arduino_gateway",
      });

      digital_inputs_arduino.fill(-1);
      analog_inputs_arduino.fill(-1);
      pin_modes_arduino.fill(-1);

      // connection compare
      clienteConectadoArduino = true;
      connect_attempt_arduino = true;
      try {
        // the message is built above
        clientArduino.send(msg_arduino);
        console.log("Conectado ao Arduino: ");
        connection_pending_arduino = false;
        //alert("Arduino Connected");
      } catch (err) {
        console.log("erro ao conectar: ", err);
        // ignore this exception
      }

      console.log("WebSocket Client Connected on Port: " + PORTA_Arduino);
      for (let index = 0; index < wait_open_arduino.length; index++) {
        let data = wait_open_arduino[index];
        //send command after connection
        console.log("wait_open_arduino data:", data);
        //console.log('tamanho de data',data.length)
        if (data.length == 1) data[0]();
        else if (data.length == 2) data[0](data[1]);
        else if (data.length == 3) data[0](data[1], data[2]);
        else if (data.length == 4) data[0](data[1], data[2], data[3]);
        else if (data.length == 5) data[0](data[1], data[2], data[3], data[4]);
        else console.log("tamanho de data icompativel:", data.length);
      }
    };

    clientArduino.onclose = function (e) {
      digital_inputs_arduino.fill(-1);
      analog_inputs_arduino.fill(-1);
      pin_modes_arduino.fill(-1);
      wait_open_arduino = [];
      if (alerted === false) {
        alerted = true;
        alert("Conexão Arduino fechada.");
      }
      clienteConectadoArduino = false;
      connection_pending_arduino = false;
      registraDesconexaoArduino(e);
    };

    clientArduino.onmessage = function (message) {
      clienteConectadoArduino = true;

      msg_arduino = JSON.parse(message.data);
      let report_type = msg_arduino["report"];
      let pin = null;
      let value = null;

      // types - digital, analog, sonar
      if (report_type === "digital_input") {
        pin = msg_arduino["pin"];
        pin = parseInt(pin, 10);
        value = msg_arduino["value"];
        digital_inputs_arduino[pin] = value;
      } else if (report_type === "analog_input") {
        pin = msg_arduino["pin"];
        pin = parseInt(pin, 10);
        value = msg_arduino["value"];
        analog_inputs_arduino[pin] = value;
      } else if (report_type === "sonar_data") {
        value = msg_arduino["value"];
        digital_inputs_arduino[sonar_report_pin_arduino] = value;
      }
    };

    clientArduino.onerror = function (error) {
      alert("Erro de conexão na porta: " + PORTA_Arduino);
      console.log("Erro WS_arduino: ", error);
      clienteConectadoArduino = false;
      connection_pending_arduino = false;
      registraDesconexaoArduino(error);
    };
  }
}

function sendMessageArduino(
  comandoArduino,
  pinArduino,
  valorArduino,
  cb
) {
  //alert(comandoRaspberryPi + ',' + valorRaspberryPi)

  waitForSocketConnectionArduino(clientArduino, function () {
    clientArduino.send(
      JSON.stringify({
        command: comandoArduino,
        pin: pinArduino,
        value: valorArduino,
      })
    );

    waitForSocketConnectionArduino(clientArduino, function () {
      if (cb !== undefined) {
        cb(
          JSON.stringify({
            command: comandoArduino,
            pin: pinArduino,
            value: valorArduino,
          })
        );
      }
    });
  });
}

function waitForSocketConnectionArduino(socket, callback) {
  //validate open ws connection before sending msg
  setTimeout(function () {
    if (socket.readyState === socket.OPEN) {
      if (callback !== undefined) {
        callback();
      }
      return;
    } else {
      waitForSocketConnectionArduino(socket, callback);
    }
  }, 5);
}

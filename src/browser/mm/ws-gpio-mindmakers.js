///////////// Codigo RaspberryPi

let clientRaspberryPi = null;
const PORTA_RaspberryPi = 9001;
let urlConexaoRecenteRaspberryPi = "";
let clienteConectadoRaspberryPi = false;

const DIGITAL_INPUT_rpi = 1;
const DIGITAL_OUTPUT_rpi = 2;
const PWM_rpi = 3;
const SERVO_rpi = 4;
const TONE_rpi = 5;
const SONAR_rpi = 6;
const ANALOG_INPUT_rpi = 7;

// an array to save the current pin mode
// this is common to all board types since it contains enough
// entries for all the boards.
// Modes are listed above - initialize to invalid mode of -1
let pin_modes_rpi = new Array(30).fill(-1);

// has an websocket message already been received
let alerted_rpi = false;

let connection_pending_rpi = false;

// general outgoing websocket message holder
let msg_rpi = null;

// the pin assigned to the sonar trigger
// initially set to -1, an illegal value
let sonar_report_pin_rpi = -1;

// arrays to hold input values
let digital_inputs_rpi = new Array(32);
let analog_inputs_rpi = new Array(8);

// flag to indicate if a websocket connect was
// ever attempted.
let connect_attempt_rpi = false;

// an array to buffer operations until socket is opened
let wait_open_rpi = [];

let urlConexaoRaspberryPiArg = "127.0.0.1";

function isRpiReady() {
  return clienteConectadoRaspberryPi;
}

function registraDesconexaoRaspberryPi(dado) {
  if (dado !== undefined) {
    console.log("Entrou para deregistrarRaspberryPi: " + JSON.stringify(dado));
  }
  clienteConectadoRaspberryPi = false;
  clientRaspberryPi.close();
}

//----Inicia websocket----//

function statusConnectionRaspberryPi(urlConexaoRaspberryPiArg) {
  if (
    !urlConexaoRaspberryPiArg ||
    urlConexaoRaspberryPiArg == "" ||
    urlConexaoRaspberryPiArg == "localhost"
  ) {
    urlConexaoRecenteRaspberryPi = "localhost";
  } else if (urlConexaoRaspberryPiArg.indexOf(".local") == -1) {
    urlConexaoRecenteRaspberryPi = urlConexaoRaspberryPiArg + ".local";
  }

  if (clienteConectadoRaspberryPi) {
    /// ignore additional connection attempts
    return;
  } else {
    connect_attempt_rpi = true;

    let url = "ws://" + urlConexaoRecenteRaspberryPi + ":" + PORTA_RaspberryPi;

    clientRaspberryPi = new WebSocket(url);

    msg_rpi = JSON.stringify({
      id: "to_rpi_gateway",
    });

    clientRaspberryPi.onopen = function () {
      msg_rpi = JSON.stringify({
        id: "to_rpi_gateway",
      });

      digital_inputs_rpi.fill(-1);
      analog_inputs_rpi.fill(-1);
      pin_modes_rpi.fill(-1);

      // connection compvare
      clienteConectadoRaspberryPi = true;
      connect_attempt_rpi = true;
      try {
        // the message is built above
        clientRaspberryPi.send(msg_rpi);
        console.log("Conectado ao Arduino: ");
        onnection_pending_rpi = false;
        //alert("GPIO Connected");
      } catch (err) {
        console.log("erro ao conectar: ", err);
        // ignore this exception
      }

      console.log("WebSocket Client Connected on Port: " + PORTA_RaspberryPi);
      for (let index = 0; index < wait_open_rpi.length; index++) {
        let data = wait_open_rpi[index];
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

    clientRaspberryPi.onclose = function (e) {
      digital_inputs.fill(-1);
      analog_inputs.fill(-1);
      pin_modes_rpi.fill(-1);
      wait_open_rpi = [];
      if (alerted === false) {
        alerted = true;
        alert("GPIO Disconnected");
      }
      clienteConectadoRaspberryPi = false;
      connection_pending_arduino = false;
      registraDesconexaoRaspberryPi(e);
    };

    clientRaspberryPi.onmessage = function (message) {
      clienteConectadoRaspberryPi = true;

      msg_rpi = JSON.parse(message.data);
      let report_type = msg_rpi["report"];
      let pin = null;
      let value = null;

      // types - digital, analog, sonar
      if (report_type === "digital_input") {
        pin = msg_rpi["pin"];
        pin = parseInt(pin, 10);
        value = msg_rpi["value"];
        digital_inputs_rpi[pin] = value;
      } else if (report_type === "analog_input") {
        pin = msg_rpi["pin"];
        pin = parseInt(pin, 10);
        value = msg_rpi["value"];
        analog_inputs_rpi[pin] = value;
      } else if (report_type === "sonar_data") {
        value = msg_rpi["value"];
        digital_inputs_rpi[sonar_report_pin_rpi] = value;
      }
    };

    clientRaspberryPi.onerror = function (error) {
      alert("Erro de conexão na porta: " + PORTA_RaspberryPi);
      console.log("Erro WS_RPi: ", error);
      clienteConectadoRaspberryPi = false;
      connection_pending_arduino = true;
      registraDesconexaoRaspberryPi(error);
    };
  }
}

function sendMessageRaspberryPi(
  comandoRaspberryPi,
  pinRaspberryPi,
  valorRaspberryPi,
  cb
) {
  //alert(comandoRaspberryPi + ',' + valorRaspberryPi)

  waitForSocketConnectionRaspberryPi(clientRaspberryPi, function () {
    clientRaspberryPi.send(
      JSON.stringify({
        command: comandoRaspberryPi,
        pin: pinRaspberryPi,
        value: valorRaspberryPi,
      })
    );

    waitForSocketConnectionRaspberryPi(clientRaspberryPi, function () {
      //console.log('RaspberryPi comando: ' + comandoRaspberryPi + ' valor: ' + valorRaspberryPi);
      if (cb !== undefined) {
        cb(
          JSON.stringify({
            command: comandoRaspberryPi,
            pin: pinRaspberryPi,
            value: valorRaspberryPi,
          })
        );
      }
    });
  });
}

function waitForSocketConnectionRaspberryPi(socket, callback) {
  //Validate an open ws before sending in data
  setTimeout(function () {
    if (socket.readyState === socket.OPEN) {
      if (callback !== undefined) {
        callback();
      }
      return;
    } else {
      waitForSocketConnectionRaspberryPi(socket, callback);
    }
  }, 5);
}

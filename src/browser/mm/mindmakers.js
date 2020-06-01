///////////// Codigo LampBLE

var clientLampBLE = null;
const PORTA_LampBLE = "8090";
var urlConexaoRecenteLampBLE = "";
var clienteConectadoLampBLE = false;

var salaLampBLE = "1";
var estacaoLampBLE = "";
var macLampBLE = "";

let valorLampBLE = '';
let inputLampBLE = 0;

const LAMPADA_RGB = 'lampadargb';
const LAMPADA_BRANCA = 'lampadabranca';


//Validar somente valores diferentes?
//var  lastMsgIn = 0;

function lampBLERecebeValor(valorLampBLE) {
  //console.log('lampBLERecebeValor = valorLampBLE: ' + valorLampBLE);
  inputLampBLE = parseInt(valorLampBLE);

}

function registraConexaoLampBLE(dado) {
  //Recebe macaddress da unidade e sala correntemente registrada
  //console.log('registraConex - dado: ' + dado);

  let msg = dado.split(',');
  let mac = msg[0].substring(10).toUpperCase();

  if (mac.indexOf(':') == -1)
    macLampBLE = mac.substring(0, 2) + ':' + mac.substring(2, 4) + ':' + mac.substring(4, 6) + ':' + mac.substring(6, 8) + ':' + mac.substring(8, 10) + ':' + mac.substring(10, 12);

  if (msg[1]) {
    salaLampBLE = msg[1].substring(5);
    if (parseInt(msg[2].substring(8)) < 10 && msg[2].substring(8).indexOf('0') != 0)
      estacaoLampBLE = '0' + msg[2].substring(8);
    else
      estacaoLampBLE = msg[2].substring(8);
  }

  clienteConectadoLampBLE = true;
}

function registraDesconexaoLampBLE(dado) {

  if (dado !== undefined) {
    console.log('Entrou para deregistrarLampBLE: ' + JSON.stringify(dado));
  }
  clienteConectadoLampBLE = false;
  clientLampBLE.close();

}


//----Inicia websocket----//
function statusConnectionLampBLE(urlConexaoLampBLEArg) {

  if (!urlConexaoLampBLEArg || urlConexaoLampBLEArg == "" || urlConexaoLampBLEArg == "localhost") {
    urlConexaoRecenteLampBLE = 'localhost';
  } else {
    if (urlConexaoLampBLEArg.indexOf('.local') == -1)
      urlConexaoRecenteLampBLE = urlConexaoLampBLEArg + '.local';
  }

  if (clienteConectadoLampBLE) {

    alert('WS client already connected ' + JSON.stringify(clientLampBLE));

  } else {

    clientLampBLE = new WebSocket("ws://" + urlConexaoRecenteLampBLE + ":" + PORTA_LampBLE, 'echo-protocol');
    console.log('WebSocket Client Trying to Connect on Port: ' + PORTA_LampBLE);

    clientLampBLE.onopen = function() {

      // let msg = JSON.stringify({
      //   "command": "ready"
      // });
      // clientLampBLE.send(msg);

      clienteConectadoLampBLE = true;
      console.log('WebSocket Client Connected on Port: ' + PORTA_LampBLE)

    };

    clientLampBLE.onmessage = function(message) {

      clienteConectadoLampBLE = true;

      if (message.data.toLowerCase().indexOf('desconectado') > -1) {
        registraDesconexaoLampBLE(message.data);

      } else if (message.data.indexOf('conectado') > -1) {
        setTimeout(function() {
          registraConexaoLampBLE(message.data);
        }, 1000);

      } else if (message.data.indexOf('COMANDO_FINAL') > -1) {
        // Indica finais de execução
        endReturn();

      } else {
        //para implementar pegar valores do sensor
        //console.log('messageELSE: '+JSON.stringify(message.data));

        lampBLERecebeValor(message.data);

      }

    };

    clientLampBLE.onerror = function(error) {
      alert('Erro de conexão na porta: ' + PORTA_LampBLE);
      clienteConectadoMBOT = false;
      registraDesconexaoLampBLE(error);
    };

    clientLampBLE.onclose = function(e) {
      console.log("Conexão LampBLE fechada.");
      clienteConectadoLampBLE = false;
      registraDesconexaoLampBLE(e);
    };

    //Tentativa forçar reconexão
    if (clienteConectadoLampBLE == 'false') {
      setTimeout(statusConnectionLampBLE(urlConexaoLampBLEArg), 3000);
    }

  }

};

function sendMessageLampBLE(comandoLampBLE, valorLampBLE, cb) {
  //alert(valorLampBLE)
  //validar envios?
  waitForSocketConnectionLampBLE(clientLampBLE, function() {
    clientLampBLE.send(JSON.stringify({
      comando: comandoLampBLE,
      valor: valorLampBLE
    }));

    waitForSocketConnectionLampBLE(clientLampBLE, function() {
      //console.log('LampBLE valor: ' + valorLampBLE);
      if (cb !== undefined) {
        cb(comandoLampBLE, valorLampBLE);
      }
    });

  });
};

function waitForSocketConnectionLampBLE(socket, callback) { //Valida que ws está aberta antes de mandar msg
  setTimeout(
    function() {
      if (socket.readyState === socket.OPEN) {
        if (callback !== undefined) {
          callback();
        }
        return;
      } else {
        waitForSocketConnectionLampBLE(socket, callback);
      }
    }, 5);
};

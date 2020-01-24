///////////// Codigo BLEBIT

var clientBLEBIT = null;
var PORTA_BLEBIT = "8080";
var urlConexaoRecenteBLEBIT = "";
var clienteConectadoBLEBIT = false;

var salaBLEBIT = "1";
var estacaoBLEBIT = "";
var macBLEBIT = "";

var valorBLEBIT = '';
var inputBLEBIT = 0;


//Validar somente valores diferentes?
//var  lastMsgIn = 0;

function blebitRecebeValor(valorBLEBIT) {
  //console.log('blebitRecebeValor = valorBLEBIT: ' + valorBLEBIT);
  inputBLEBIT = parseInt(valorBLEBIT);

}

function registraConexaoBLEBIT(dado) {
  //Recebe macaddress da unidade e sala correntemente registrada
  //console.log('registraConex - dado: ' + dado);

  var msg = dado.split(',');
  var mac = msg[0].substring(10).toUpperCase();

  if (mac.indexOf(':') == -1)
    macBLEBIT = mac.substring(0, 2) + ':' + mac.substring(2, 4) + ':' + mac.substring(4, 6) + ':' + mac.substring(6, 8) + ':' + mac.substring(8, 10) + ':' + mac.substring(10, 12);

  if (msg[1]) {
    salaBLEBIT = msg[1].substring(5);
    if (parseInt(msg[2].substring(8)) < 10 && msg[2].substring(8).indexOf('0') != 0)
      estacaoBLEBIT = '0' + msg[2].substring(8);
    else
      estacaoBLEBIT = msg[2].substring(8);
  }

  clienteConectadoBLEBIT = true;
}

function registraDesconexaoBLEBIT(dado) {

  if (dado !== undefined) {
    console.log('Entrou para deregistrarBLEBIT: ' + JSON.stringify(dado));
  }
  clienteConectadoBLEBIT = false;
  clientBLEBIT.close();

}


//----Inicia websocket----//
function statusConnectionBLEBIT(urlConexaoBLEBITArg) {

  if (!urlConexaoBLEBITArg || urlConexaoBLEBITArg == "" || urlConexaoBLEBITArg == "localhost") {
    urlConexaoRecenteBLEBIT = 'localhost';
  } else {
    if (urlConexaoBLEBITArg.indexOf('.local') == -1)
      urlConexaoRecenteBLEBIT = urlConexaoBLEBITArg + '.local';
  }

  if (clienteConectadoBLEBIT) {

    alert('WS client already connected ' + JSON.stringify(clientBLEBIT));

  } else {

    clientBLEBIT = new WebSocket("ws://" + urlConexaoRecenteBLEBIT + ":" + PORTA_BLEBIT, 'echo-protocol');
    console.log('WebSocket Client Trying to Connect on Port: ' + PORTA_BLEBIT);

    clientBLEBIT.onopen = function() {
      alert('BLE:Bit Connected')
      // var msg = JSON.stringify({
      //   "command": "ready"
      // });
      // clientBLEBIT.send(msg);

      clienteConectadoBLEBIT = true;
      console.log('WebSocket Client Connected on Port: ' + PORTA_BLEBIT)

    };

    clientBLEBIT.onmessage = function(message) {

      clienteConectadoBLEBIT = true;

      if (message.data.toLowerCase().indexOf('desconectado') > -1) {
        registraDesconexaoBLEBIT(message.data);

      } else if (message.data.indexOf('conectado') > -1) {
        setTimeout(function() {
          registraConexaoBLEBIT(message.data);
        }, 1000);

      } else if (message.data.indexOf('COMANDO_FINAL') > -1) {
        // Indica finais de execução
        endReturn();

      } else {
        //para implementar pegar valores do sensor
        //console.log('messageELSE: '+JSON.stringify(message.data));

        blebitRecebeValor(message.data);

      }

    };

    clientBLEBIT.onerror = function(error) {
      alert('Erro de conexão na porta: ' + PORTA_BLEBIT);
      clienteConectadoMBOT = false;
      registraDesconexaoBLEBIT(error);
    };

    clientBLEBIT.onclose = function(e) {
      console.log("Conexão BLEBIT fechada.");
      clienteConectadoBLEBIT = false;
      registraDesconexaoBLEBIT(e);
    };

    //Tentativa forçar reconexão
    if (clienteConectadoBLEBIT == 'false') {
      setTimeout(statusConnectionBLEBIT(urlConexaoBLEBITArg), 3000);
    }

  }

};


//ainda precisa ser implementado no mmblebit-server.js
function sendMessageBLEBIT(valorBLEBIT, cb) {
  //alert(valorBLEBIT)
  //validar envios?
  waitForSocketConnectionBLEBIT(clientBLEBIT, function() {
    clientBLEBIT.send(valorBLEBIT);

    waitForSocketConnectionBLEBIT(clientBLEBIT, function() {
      //console.log('BLEBIT valor: ' + valorBLEBIT);
      if (cb !== undefined) {
        cb(valorBLEBIT);
      }
    });

  });
};

function waitForSocketConnectionBLEBIT(socket, callback) { //Valida que ws está aberta antes de mandar msg
  setTimeout(
    function() {
      if (socket.readyState === socket.OPEN) {
        if (callback !== undefined) {
          callback();
        }
        return;
      } else {
        waitForSocketConnectionBLEBIT(socket, callback);
      }
    }, 5);
};

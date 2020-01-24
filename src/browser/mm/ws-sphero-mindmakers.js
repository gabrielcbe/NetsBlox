///////////// Codigo Sphero

var clientSphero = null;
var PORTA_SPHERO = "8083";
var urlConexaoRecenteSphero = "";
var clienteConectadoSphero = false;

var salaSphero = "1";
var estacaoSphero = "";
var macSphero = "";

var comandoSphero = '';
var valorSphero = '';

//COMANDOS PARA PPOSSIVELMENTE VALIDAR
var COLOR = "color";
var ROLL = "roll";

var COLISAO = 'colisao';
var QUEDA = 'quedaLivre';
var ATERRISOU = 'aterrisou';

// var ultimoComandoValorMap = new Map();
// var ultimoComandoDateMap = new Map();
// var difSPHERO = 0;

var totalColisoes = 0;
var colisao = false;
var quedaLivre = false;
var intensidadeQueda = 0;
var fimQuedaLivre = false;
var intensidadeAterrisou = 0;

// devolve apenas uma vez para evitar captura duplicada do evento
function isColisao() {
  if (colisao) {
    colisao = false;
    return true;
  } else
    return false;
}

function isQuedaLivre() {
  if (quedaLivre) {
    quedaLivre = false;
    return true;
  } else
    return false;
}

function isFimQuedaLivre() {
  if (fimQuedaLivre) {
    fimQuedaLivre = false;
    return true;
  } else
    return false;
}

//TODO - pegar eventos
function spheroRecebeValor(componenteSphero, valorSphero) {
  //console.log('spheroRecebeValor=Componente: ' + componenteSphero + ' OBJvalorSphero: ' + JSON.stringify(valorSphero));

  if (componenteSphero == COLISAO) {
    colisao = true;
    totalColisoes++;
    //passível de pegar valores de {x, y, xMagnitude, yMagnitude, speed}

  } else if (componenteSphero == QUEDA) {
    quedaLivre = true;
    intensidadeQueda = valorSphero.valor;

  } else if (componenteSphero == ATERRISOU) {
    fimQuedaLivre = true;
    intensidadeAterrisou == valorSphero.valor;

  }

}

function registraConexaoSphero(dado) {
  //Recebe macaddress da unidade e sala correntemente registrada
  //console.log('registraConex - dado: ' + dado);

  var msg = dado.split(',');
  var mac = msg[0].substring(10).toUpperCase();

  if (mac.indexOf(':') == -1)
    macSphero = mac.substring(0, 2) + ':' + mac.substring(2, 4) + ':' + mac.substring(4, 6) + ':' + mac.substring(6, 8) + ':' + mac.substring(8, 10) + ':' + mac.substring(10, 12);

  if (msg[1]) {
    salaSphero = msg[1].substring(5);
    if (parseInt(msg[2].substring(8)) < 10 && msg[2].substring(8).indexOf('0') != 0)
      estacaoSphero = '0' + msg[2].substring(8);
    else
      estacaoSphero = msg[2].substring(8);
  }

  clienteConectadoSphero = true;
}

function registraDesconexaoSphero(dado) {
  if (dado !== undefined) {
    console.log('Entrou para deregistrar SPHERO: ' + JSON.stringify(dado));
  }
  clienteConectadoSphero = false;
  clientSphero.close();

}


//----Inicia websocket----//
function statusConnectionSphero(urlConexaoSpheroArg) {
  if (!urlConexaoSpheroArg || urlConexaoSpheroArg == "" || urlConexaoSpheroArg == "localhost") {
    urlConexaoRecenteSphero = 'localhost';
  } else {
    if (urlConexaoSpheroArg.indexOf('.local') == -1)
      urlConexaoRecenteSphero = urlConexaoSpheroArg + '.local';
  }

  if (clienteConectadoSphero) {
    alert('WS client already connected ' + JSON.stringify(clientSphero));

  } else {
    clientSphero = new WebSocket("ws://" + urlConexaoRecenteSphero + ":" + PORTA_SPHERO, 'echo-protocol');
    console.log('WebSocket Client Trying to Connect on Port: ' + PORTA_SPHERO);

    clientSphero.onopen = function() {
      var msg = JSON.stringify({
        "command": "ready"
      });

      clienteConectadoSphero = true;

      clientSphero.send(msg);
      console.log('WebSocket Client Connected on Port: ' + PORTA_SPHERO)

      //sendMessageSphero(SUBSCRICAO, "true,true,true");

    };

    clientSphero.onmessage = function(message) {

      clienteConectadoSphero = true;

      if (message.data.toLowerCase().indexOf('desconectado') > -1) {
        registraDesconexaoSphero(message.data);

      } else if (message.data.indexOf('conectado') > -1) {
        setTimeout(function() {
          registraConexaoSphero(message.data);
        }, 1000);

      } else if (message.data.indexOf('COMANDO_FINAL') > -1) {
        // Indica finais de execução
        endReturn();

      } else {
        //console.log('messageELSE: ' +JSON.stringify(message));
        var msg = message.data.split('=');
        spheroRecebeValor(msg[0], JSON.parse(msg[1]));

      }
    };

    clientSphero.onerror = function(error) {
      alert('Erro de conexão na porta: ' + PORTA_SPHERO);
      clienteConectadoMBOT = false;
      registraDesconexaoSphero(error);
    };

    clientSphero.onclose = function(e) {
      console.log("Conexão SPHERO fechada.");
      clienteConectadoSphero = false;
      registraDesconexaoSphero(e);
    };

    //Tentativa forçar reconexão
    if (clienteConectadoSphero == 'false') {
      setTimeout(statusConnectionSphero(urlConexaoSpheroArg), 3000);
    }

  }
};



//ainda precisa ser implementado no mmsphero-server.js
function sendMessageSphero(comandoSphero, valorSphero, cb) {
  //alert(comandoSphero + ',' + valorSphero)

  waitForSocketConnectionSPHERO(clientSphero, function() {
    clientSphero.send(JSON.stringify({
      comando: comandoSphero,
      valor: valorSphero
    }));

    waitForSocketConnectionSPHERO(clientSphero, function() {
      //console.log('Sphero comando: ' + comandoSphero + ' valor: ' + valorSphero);
      if (cb !== undefined) {
        cb(comandoSphero, valorSphero);
      }
    });

  });
};

function waitForSocketConnectionSPHERO(socket, callback) { //Valida que ws está aberta antes de mandar msg
  setTimeout(
    function() {
      if (socket.readyState === socket.OPEN) {
        if (callback !== undefined) {
          callback();
        }
        return;
      } else {
        waitForSocketConnectionSPHERO(socket, callback);
      }
    }, 5);
};

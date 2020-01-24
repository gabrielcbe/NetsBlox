///////////// Codigo mBot

var clientMBOT = null;
var PORTA_MBOT = "8081";
var urlConexaoRecenteMBOT = "";
var clienteConectadoMBOT = false;

var salaMBOT = "1";
var estacaoMBOT = "";
var macMBOT = "";

var comandoMBOT = '';
var valorMBOT = '';

//COMANDOS PARA PPOSSIVELMENTE VALIDAR
var LINESENSOR = 'linesensor';
var ULTRASOUNDSENSOR = 'ultrasoundsensor';
var LIGHTSENSOR = 'lightsensor';
var BUTTON = 'button';
var BUTTON_PRESSED = 'pressed';
var BUTTON_RELEASED = 'released';
var IRSENSOR = 'irsensor';
var BUZZER = 'buzzer';
var DCMOTORM1 = 'dcmotorm1';
var DCMOTORM2 = 'dcmotorm2';
var DCMOTOR_FORWARD = 'forward';
var DCMOTOR_BACK = 'back';
var DCMOTORS = 'dcmotors';
var DCMOTORS_BACK = 'dcmotorsBack';
var DCMOTORS_RIGHT = 'dcmotorsRight';
var DCMOTORS_LEFT = 'dcmotorsLeft';
var SERVOMOTOR = 'servomotor';
var LEDLEFT = 'ledleft';
var LEDRIGHT = 'ledright';
var LEDBOTH = 'ledboth';
var PLAYNOTE = 'playnote';

var SUBSCRICAO = 'subscricao';


// 0,1,2 ou 3
var line = 0;
// 0 a 1000
var light = 0;
// 0 a 400 cm
var ultrasound = 0;


var lastmsg = +new Date();
var min = 0;

function mBotRecebeValor(componente, valor) {
  clienteConectadoMBOT = true;
  if (componente == LINESENSOR) {
    line = parseInt(valor);

  } else if (componente == ULTRASOUNDSENSOR) {
    ultrasound = Math.trunc(parseFloat(valor));

  } else if (componente == LIGHTSENSOR) {
    light = Math.trunc(parseFloat(valor));

  } else if (componente == BUTTON) {
    button = valor;
    if (lastbutton != button) {
      lastbutton = button;
      console.log('button:', +button);
      console.log('e tem tipo:', typeof(button));
    }

  } else if (componente == IRSENSOR) {
    ir = valor;
    if (lastir != ir) {
      lastir = ir;
      console.log('ir:', +ir);
      console.log('e tem tipo:', typeof(ir));
    }

  }
}

function registraConexaoMBOT(dado) {
  //Recebe macaddress da unidade e sala correntemente registrada
  //console.log('registraConex - dado: ' + dado);

  var msg = dado.split(',');
  var mac = msg[0].substring(10).toUpperCase();

  if (mac.indexOf(':') == -1)
    macMBOT = mac.substring(0, 2) + ':' + mac.substring(2, 4) + ':' + mac.substring(4, 6) + ':' + mac.substring(6, 8) + ':' + mac.substring(8, 10) + ':' + mac.substring(10, 12);

  if (msg[1]) {
    salaMBOT = msg[1].substring(5);
    if (parseInt(msg[2].substring(8)) < 10 && msg[2].substring(8).indexOf('0') != 0)
      estacaoMBOT = '0' + msg[2].substring(8);
    else
      estacaoMBOT = msg[2].substring(8);
  }

  clienteConectadoMBOT = true;
}

function registraDesconexaoMBOT(dado) {
  //teste tirar subscrição antes de fechar conexão
  sendMessagemBot(SUBSCRICAO, "false,false,false", function () {
    if (dado !== undefined) {
      console.log('Entrou para deregistrar MBOT: ' + JSON.stringify(dado));
    }
    clienteConectadoMBOT = false;
    clientMBOT.close();
  });

}



//----Inicia websocket----//
function statusConnectionmBot(urlConexaoMBOTArg) {

  if (!urlConexaoMBOTArg || urlConexaoMBOTArg == "" || urlConexaoMBOTArg == "localhost") {
    urlConexaoRecenteMBOT = 'localhost';
  } else {
    if (urlConexaoMBOTArg.indexOf('.local') == -1)
      urlConexaoRecenteMBOT = urlConexaoMBOTArg + '.local';
  }

  if (clienteConectadoMBOT) {

    alert('WS client already connected ' + JSON.stringify(clientMBOT));

  } else {

    clientMBOT = new WebSocket("ws://" + urlConexaoRecenteMBOT + ":" + PORTA_MBOT, 'echo-protocol');
    console.log('WebSocket Client Trying to Connect on Port: ' + PORTA_MBOT);

    clientMBOT.onopen = function() {
      alert('mBot Connected')
      var msg = JSON.stringify({
        "command": "ready"
      });

      clienteConectadoMBOT = true;

      clientMBOT.send(msg);
      console.log('WebSocket Client Connected on Port: ' + PORTA_MBOT);

      sendMessagemBot(SUBSCRICAO, "true,true,true", function (a, b) {
        console.log('Comando: ' + a + ' Valor: ' + b);
      });

    };

    clientMBOT.onmessage = function(message) {

      clienteConectadoMBOT = true;

      if (message.data.toLowerCase().indexOf('desconectado') > -1) {

        registraDesconexaoMBOT(message.data);

      } else if (message.data.indexOf('conectado') > -1) {

        setTimeout(function() {
          registraConexaoMBOT(message.data);
        }, 1000);

      } else if (message.data.indexOf('COMANDO_FINAL') > -1) {
        // Indica finais de execução
        endReturn();

      } else {

        var componenteValorMBOT = message.data.split(',');
        //console.log('caiu no else, recebeu: '+componenteValor);
        mBotRecebeValor(componenteValorMBOT[0], componenteValorMBOT[1]);

      }

    };

    clientMBOT.onerror = function(error) {
      alert('Erro de conexão na porta: ' + PORTA_MBOT);
      clienteConectadoMBOT = false;
      registraDesconexaoMBOT(error);
    };

    clientMBOT.onclose = function(e) {
      console.log("Conexão mBot fechada.");
      clienteConectadoMBOT = false;
      registraDesconexaoMBOT(e);
    };

    if (clienteConectadoMBOT == 'false') {
      setTimeout(statusConnectionmBot(urlConexaoMBOTArg), 3000);
    }

  }

};


function sendMessagemBot(comandoMBOT, valorMBOT, cb) {

  waitForSocketConnectionMBOT(clientMBOT, function() {
    //alert(comandoMBOT + ',' + valorMBOT)
    clientMBOT.send(JSON.stringify({
      comando: comandoMBOT,
      valor: valorMBOT
    }));

    waitForSocketConnectionMBOT(clientMBOT, function() {
      //console.log('mBot comando: ' + comandoMBOT + ' valor: ' + valorMBOT);
      if (cb !== undefined) {
        cb(comandoMBOT, valorMBOT);
      }
    });

  });
};

function waitForSocketConnectionMBOT(socket, callback) { //Valida que ws está aberta antes de mandar msg
  setTimeout(
    function() {
      if (socket.readyState === socket.OPEN) {
        if (callback !== undefined) {
          callback();
        }
        return;
      } else {
        waitForSocketConnectionMBOT(socket, callback);
      }
    }, 5);
};

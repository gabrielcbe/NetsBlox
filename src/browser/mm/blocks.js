// labelPart() proxy

SyntaxElementMorph.prototype.originalLabelPart = SyntaxElementMorph.prototype.labelPart;
SyntaxElementMorph.prototype.labelPart = function(spec) {
  var part,
    block = this;

  switch (spec) {

    case '%onoff':
      part = new InputSlotMorph(
        null, // text
        true, // numeric?
        {
          '0': '0',
          '1': '1'
        });

      break;

    case '%mbot1':
      part = new InputSlotMorph(
        null, // text
        true, // numeric?
        {
          '(0) stop': '0', //Internacionalização procura pelo ['(0) stop'] no lang-pt_BR e substitui
          '(70) slow': 70,
          '(125) fast': 125,
          '(255) max': 255,
          '(-70) reverse slow': -70,
          '(-125) reverse fast': -125,
          '(-255) reverse max': -255
        }
      );
      part.setContents(['(125) fast']);
      break;
    case '%mbot2':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          'Both': 'Both',
          'M1': 'M1',
          'M2': 'M2'
        }
      );
      part.setContents(['Both']);
      break;
    case '%mbot3':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          'Port1': '1',
          'Port2': '2',
          'Port3': '3',
          'Port4': '4'

        }
      );
      part.setContents("1");
      break;
    case '%mbot4':
      part = new InputSlotMorph(
        null, // text
        true, // numeric?
        {
          '1': '1',
          '2': '2'
        }
      );
      part.setContents('1');
      break;
    case '%mbot5':
      part = new InputSlotMorph(
        null, // text
        true, // numeric?
        {
          '0': '0',
          '45': 45,
          '90': 90,
          '135': 135
        }
      );
      part.setContents('45');
      break;
    case '%mbot6':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          'Both': ['Both'],
          '1': '1',
          '2': '2'
        }
      );
      part.setContents(['Both']);
      break;
    case '%mbot7':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          'C2': 'C2',
          'D2': 'D2',
          'E2': 'E2',
          'F2': 'F2',
          'G2': 'G2',
          'A2': 'A2',
          'B2': 'B2',
          'C3': 'C3',
          'D3': 'D3',
          'E3': 'E3',
          'F3': 'F3',
          'G3': 'G3',
          'A3': 'A3',
          'B3': 'B3',
          'C4': 'C4',
          'D4': 'D4',
          'E4': 'E4',
          'F4': 'F4',
          'G4': 'G4',
          'A4': 'A4',
          'B4': 'B4',
          'C5': 'C5',
          'D5': 'D5',
          'E5': 'E5',
          'F5': 'F5',
          'G5': 'G5',
          'A5': 'A5',
          'B5': 'B5',
          'C6': 'C6',
          'D6': 'D6',
          'E6': 'E6',
          'F6': 'F6',
          'G6': 'G6',
          'A6': 'A6',
          'B6': 'B6',
          'C7': 'C7',
          'D7': 'D7',
          'E7': 'E7',
          'F7': 'F7',
          'G7': 'G7',
          'A7': 'A7',
          'B7': 'B7',
          'C8': 'C8',
          'D8': 'D8'
        });
      part.setContents('B4');
      break;
    case '%mbot8':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          'Half': '1/2',
          'Quater': '1/4',
          'Eighth': '1/8',
          'Whole': '1',
          'Double': '2'
        });
      part.setContents(['Quater']);
      break;
    case '%mbot9':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          'Clockwise': ['Clockwise'],
          'Counter-Clockwise': ['Counter-Clockwise']
        });
      part.setContents(['Clockwise']);
      break;
    case '%arduino1':
      part = new InputSlotMorph(
        null,
        false, {
          'digital input': ['digital input'],
          'digital output': ['digital output'],
          'PWM': ['PWM'],
          'servo': ['servo']
        },
        true
      );
      break;
    case '%arduino2':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          '1': 1,
          '2': 2,
          '3': 3,
          '4': 4,
          '5': 5,
          '6': 6,
          '7': 7,
          '8': 8,
          '9': 9,
          '10': 10,
          '11': 11,
          '12': 12,
          '13': 13,
          'A0': 'A0',
          'A1': 'A1',
          'A2': 'A2',
          'A3': 'A3',
          'A4': 'A4',
          'A5': 'A5'
        });
      // part.setContents('2');
      break;
    case '%arduino3':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          'min': 'min',
          'max': 'max',
          'angulo': 90
        });
      part.setContents('angulo');
      break;
    case '%arduinoHIGHLOW':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          'HIGH': 'HIGH',
          'LOW': 'LOW'
        });
      // part.setContents('3');
      break;
    case '%arduinoPWM':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          '3~': 3,
          '5~': 5,
          '6~': 6,
          '9~': 9,
          '10~': 10,
          '11~': 11
        });
      // part.setContents('3');
      break;
    case '%arduinoANALOG':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          'A0': 'A0',
          'A1': 'A1',
          'A2': 'A2',
          'A3': 'A3',
          'A4': 'A4',
          'A5': 'A5'
        });
      // part.setContents('3');
      break;
    case '%arduinoDIGITAL':
      part = new InputSlotMorph(
        null, // text
        true, // numeric?
        {
          '1': 1,
          '2': 2,
          '3': 3,
          '4': 4,
          '5': 5,
          '6': 6,
          '7': 7,
          '8': 8,
          '9': 9,
          '10': 10,
          '11': 11,
          '12': 12,
          '13': 13,
          '14': 14,
          '15': 15,
          '16': 16,
          '17': 17,
          '18': 18,
          '19': 19
        });
      // part.setContents('3');
      break;
    case '%usedDigitalPins': // All digitals have modes INPUT, OUTPUT, SERVO AND PULLUP
      part = new InputSlotMorph(
        null,
        true,
        function() {
          // // Get board associated to currentSprite
          // var sprite = ide.currentSprite,
          //     board = sprite.arduino.board;
          //
          // if (board) {
          //     return sprite.arduino.pinsSettableToMode(board.MODES.INPUT);
          // } else {
          //     return [];
          // }
          //TODO lista com pins utilizados
          var usedDigitalPins = [];
          for (var i = 0; i < pins.length; i++) {
            if (pins)
              usedDigitalPins.push = pins;
          }

          if (usedDigitalPins) {
            return usedDigitalPins
          } else {
            return []
          }
        }
      );
      part.originalChanged = part.changed;
      part.changed = function() {
        part.originalChanged();
        if (block.toggle) {
          block.toggle.refresh();
        }
      };
      break;
    case '%sphero1':
      part = new InputSlotMorph(
        true, // text
        false, // numeric?
        {
          'white': ['white'],
          'black': ['black'],
          'red': ['red'],
          'green': ['green'],
          'blue': ['blue']
        });
      part.setContents(['white']);
      break;
    case '%blebit1':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          'on': ['on'],
          'off': ['off']
        });
      part.setContents(['on']);
      break;
    case '%RGBW':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          'white': ['white'],
          'red': ['red'],
          'green': ['green'],
          'blue': ['blue']

        });
      part.setContents(['white']);
      break;
    case '%rpipins':
      part = new InputSlotMorph(
        null, // text
        true, // numeric?
        {
          '2': '2',
          '3': '3',
          '4': '4',
          '5': '5',
          '6': '6',
          '7': '7',
          '8': '8',
          '9': '9',
          '10': '10',
          '11': '11',
          '12': '12',
          '13': '13',
          '14': '14',
          '15': '15',
          '16': '16',
          '17': '17',
          '18': '18',
          '19': '19',
          '20': '20',
          '21': '21',
          '22': '22',
          '23': '23',
          '24': '24',
          '25': '25',
          '26': '26',
          '27': '27'

        });

      break;
      case '%ClassNumber':
        part = new InputSlotMorph(
          null, // text
          true, // numeric?
          {
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4
          });
        // part.setContents('3');
        break;
      case '%ClassStations':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          '1': 1,
          '2': 2,
          '3': 3,
          '4': 4,
          '5': 5,
          '6': 6,
          '7': 7,
          '8': 8,
          '9': 9,
          '10': 10,
          '11': 11,
          '12': 12,
          '13': 13,
          '14': 14,
          '15': 15,
          '16': 16,
          '17': 17,
          '18': 18,
          '19': 19,
          '20': 20,
          '21': 21
        });
        // part.setContents('3');
        break;
      case '%RemoteStations':
      part = new InputSlotMorph(
        null, // text
        false, // numeric?
        {
          'A': 'A',
          'B': 'B',
          'C': 'C',
          'D': 'D',
          'E': 'E',
          'F': 'F',
          'G': 'G',
          'H': 'H'
        });
        // part.setContents('3');
        break;






    default:
      part = this.originalLabelPart(spec);
  }
  return part;
};

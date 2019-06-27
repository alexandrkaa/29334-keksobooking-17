'use strict';

(function () {
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var MAP_TOP = 130;
  var MAP_BOTTOM = 630;
  var MAP_BLOCK = document.querySelector('.map');
  var MAP_PINS_BLOCK = MAP_BLOCK.querySelector('.map__pins');

  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getPinsData = function (dataQuantity) {
    var mock = [];
    var mapPinsBlockWidth = MAP_PINS_BLOCK.offsetWidth;

    for (var i = 0; i < parseInt(dataQuantity, 10); i++) {
      mock[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'type': OFFER_TYPE[getRandomValue(0, OFFER_TYPE.length - 1)]
        },
        'location': {
          'x': getRandomValue(0, mapPinsBlockWidth),
          'y': getRandomValue(MAP_TOP, MAP_BOTTOM)
        }
      };
    }
    return mock;
  };

  window.dataModule = {
    getPinsData: getPinsData
  };

})();

'use strict';

(function () {
  var MAP_BLOCK = document.querySelector('.map');
  var MAP_PINS_BLOCK = MAP_BLOCK.querySelector('.map__pins');
  // var MAIN_PIN = MAP_PINS_BLOCK.querySelector('.map__pin--main');
  var PIN_ELEMENT_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_WIDTH = 50; // defined in css
  var PIN_HEIGHT = 70; // defined in css
  var MAP_TOP = 130;
  // var MAP_BOTTOM = 630;

  var createMapPinElement = function (pinData) {
    var pinElement = PIN_ELEMENT_TEMPLATE.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    var leftCoord = (pinData.location.x + (PIN_WIDTH / 2));
    if (leftCoord > (MAP_PINS_BLOCK.offsetWidth - (PIN_WIDTH / 2))) {
      leftCoord = MAP_PINS_BLOCK.offsetWidth - (PIN_WIDTH / 2);
    } else
    if (leftCoord < PIN_WIDTH / 2) {
      leftCoord = PIN_WIDTH / 2;
    }
    var topCoord = pinData.location.y - PIN_HEIGHT;
    if (topCoord < MAP_TOP) {
      topCoord = MAP_TOP;
    }
    pinElementImg.src = pinData.author.avatar;
    pinElement.style.left = leftCoord + 'px';
    pinElement.style.top = topCoord + 'px';
    pinElementImg.alt = 'Заголовок объявления';
    return pinElement;
  };

  var appendPins = function (pinsData) {
    var pinsFragment = document.createDocumentFragment();
    for (var i = 0; i < pinsData.length; i++) {
      pinsFragment.appendChild(createMapPinElement(pinsData[i]));
    }
    MAP_PINS_BLOCK.appendChild(pinsFragment);
  };

  window.pinModule = {
    appendPins: appendPins
  };

})();

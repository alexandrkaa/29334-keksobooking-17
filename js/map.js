'use strict';

(function () {
  var MAP_BLOCK = document.querySelector('.map');
  var MAP_PINS_BLOCK = MAP_BLOCK.querySelector('.map__pins');
  var MAIN_PIN = MAP_PINS_BLOCK.querySelector('.map__pin--main');
  var MAIN_PIN_AFTER_OFFSET = 6; // defined in css

  var isMapFaded = function () {
    return MAP_BLOCK.classList.contains('map--faded');
  };

  var getMainPinSize = function () {
    var mainPinSize = {};
    if (isMapFaded()) {
      mainPinSize.width = MAIN_PIN.offsetWidth;
      mainPinSize.height = MAIN_PIN.offsetHeight;
    } else {
      mainPinSize.width = MAIN_PIN.offsetWidth;
      mainPinSize.height = MAIN_PIN.offsetHeight + parseInt(window.getComputedStyle(MAIN_PIN, '::after').height, 10) - MAIN_PIN_AFTER_OFFSET;
    }
    return mainPinSize;
  };

  var MAIN_PIN_SIZE = getMainPinSize();

  var getMainPinCoordinates = function () {
    var coordinates = {};
    coordinates.left = MAIN_PIN.offsetLeft + (MAIN_PIN_SIZE.width / 2);
    coordinates.top = MAIN_PIN.offsetTop + (MAIN_PIN_SIZE.height / 2);
    return coordinates;
  };

  var fadeMap = function () {
    if (!MAP_BLOCK.classList.contains('map--faded')) {
      MAP_BLOCK.classList.add('map--faded');
    }
  };

  var unFadeMap = function () {
    if (MAP_BLOCK.classList.contains('map--faded')) {
      MAP_BLOCK.classList.remove('map--faded');
    }
  };

  window.mapModule = {
    getMainPinCoordinates: getMainPinCoordinates,
    fadeMap: fadeMap,
    unFadeMap: unFadeMap
  };
})();

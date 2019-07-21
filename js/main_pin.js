'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPinsBlockWidth = mapPinsBlock.offsetWidth;
  var mapVerticalSize = {
    TOP: 130,
    BOTTOM: 630
  };
  var mainPinMouseUpHandler = null;
  var MAIN_PIN_TAIL_OFFSET = 6; // defined in css
  var MAIN_PIN_TAIL_SIZE = parseInt(window.getComputedStyle(mainPin, '::after').height, 10) - MAIN_PIN_TAIL_OFFSET;
  var addressChangeEvent = new Event('onAddressChange');
  var mainPinDefaultPosition = {
    LEFT: '570px',
    TOP: '375px'
  };
  var mainPinSize = {
    width: mainPin.offsetWidth,
    height: mainPin.offsetHeight + MAIN_PIN_TAIL_SIZE
  };
  var Coordinates = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var enablePage = function (action) {
    return function () {
      action();
      mainPin.removeEventListener('mouseup', mainPinMouseUpHandler);
    };
  };

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    var startCoordinates = new Coordinates(evt.clientX, evt.clientY);
    var onMainPinMove = function (moveEvt) {
      var shift = new Coordinates(startCoordinates.x - moveEvt.clientX, startCoordinates.y - moveEvt.clientY);
      startCoordinates = new Coordinates(moveEvt.clientX, moveEvt.clientY);
      var currentLeft = 0;
      if ((mainPin.offsetLeft - shift.x + mainPinSize.width) > mapPinsBlockWidth) {
        currentLeft = mapPinsBlockWidth - mainPinSize.width;
      } else
      if ((mainPin.offsetLeft - shift.x + mainPinSize.width) < mainPinSize.width) {
        currentLeft = 0;
      } else {
        currentLeft = (mainPin.offsetLeft - shift.x);
      }
      var currentVertical = 0;
      if ((mainPin.offsetTop - shift.y) < mapVerticalSize.TOP) {
        currentVertical = mapVerticalSize.TOP;
      } else
      if ((mainPin.offsetTop - shift.y) > mapVerticalSize.BOTTOM) {
        currentVertical = mapVerticalSize.BOTTOM;
      } else {
        currentVertical = mainPin.offsetTop - shift.y;
      }
      mainPin.style.top = currentVertical + 'px';
      mainPin.style.left = currentLeft + 'px';
      mainPin.dispatchEvent(addressChangeEvent);
    };
    var onMouseUpOnMainPin = function (upEvt) {
      upEvt.preventDefault();
      mainPin.dispatchEvent(addressChangeEvent);

      document.removeEventListener('mousemove', onMainPinMove);
      document.removeEventListener('mouseup', onMouseUpOnMainPin);
    };
    document.addEventListener('mousemove', onMainPinMove);
    document.addEventListener('mouseup', onMouseUpOnMainPin);
  };

  var resetMainPin = function () {
    mainPin.style.left = mainPinDefaultPosition.LEFT;
    mainPin.style.top = mainPinDefaultPosition.TOP;
    mainPin.dispatchEvent(addressChangeEvent);
  };

  var init = function (action) {
    mainPinMouseUpHandler = enablePage(action);
    mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
  };

  window.mainPin = {
    init: init,
    resetMainPin: resetMainPin
  };

})();

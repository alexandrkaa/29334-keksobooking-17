'use strict';

(function () {
  var mockDataQuantity = 8;
  var MAIN_PIN = document.querySelector('.map__pin--main');

  var activatePage = function () {
    window.mapModule.unFadeMap();
    window.formModule.enableForm();
    return true;
  };

  var disactivatePage = function () {
    window.mapModule.fadeMap();
    window.formModule.disableForm();
  };

  disactivatePage();
  window.pinModule.appendPins(window.dataModule.getPinsData(mockDataQuantity));
  window.formModule.setAddress(window.mapModule.getMainPinCoordinates());
  // MAIN_PIN.addEventListener('click', onMainPinClick);
  MAIN_PIN.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var isPageActive = false;

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMoveMainPin = function (moveEvt) {
      moveEvt.preventDefault();

      if (!isPageActive) {
        isPageActive = activatePage();
      }
      window.formModule.setAddress(window.mapModule.getMainPinCoordinates());

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      MAIN_PIN.style.top = (MAIN_PIN.offsetTop - shift.y) + 'px';
      MAIN_PIN.style.left = (MAIN_PIN.offsetLeft - shift.x) + 'px';
    };

    var onMouseUpOnMainPin = function (upEvt) {
      upEvt.preventDefault();

      if (!isPageActive) {
        isPageActive = activatePage();
      }

      window.formModule.setAddress(window.mapModule.getMainPinCoordinates());

      document.removeEventListener('mousemove', onMoveMainPin);
      document.removeEventListener('mouseup', onMouseUpOnMainPin);
    };

    document.addEventListener('mousemove', onMoveMainPin);
    document.addEventListener('mouseup', onMouseUpOnMainPin);
  });

})();

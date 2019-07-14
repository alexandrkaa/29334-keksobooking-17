'use strict';
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscPress = function (callback) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      callback();
    }
  };

  var isEnterPress = function (callback) {
    return function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        evt.preventDefault();
        callback();
      }
    };
  };

  window.utilsModule = {
    isEscPress: isEscPress,
    isEnterPress: isEnterPress
  };

})();

'use strict';
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var onEscPress = function (action, evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      if (action !== undefined && typeof action === 'function') {
        action();
      }
    }
  };

  var onEnterPress = function (action, evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      if (action !== undefined && typeof action === 'function') {
        action(evt);
      }
    }
  };

  window.utils = {
    onEscPress: onEscPress,
    onEnterPress: onEnterPress
  };

})();

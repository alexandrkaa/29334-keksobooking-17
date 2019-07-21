'use strict';
(function () {

  var ESC_KEYCODE = 27;

  var onEscPress = function (action, evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      if (action !== undefined && typeof action === 'function') {
        action();
      }
    }
  };

  window.utils = {
    onEscPress: onEscPress
  };

})();

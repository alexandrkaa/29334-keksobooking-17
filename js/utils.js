'use strict';
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  var debounce = function (action, param) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action.bind(null, param), DEBOUNCE_INTERVAL);
  };

  var onEscPress = function (action, evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      if (action !== undefined && typeof action === 'function') {
        action(evt);
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
    onEnterPress: onEnterPress,
    debounce: debounce
  };

})();

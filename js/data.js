'use strict';

(function () {
  var data = null;

  var set = function (newData) {
    data = newData;
  };

  var get = function () {
    return data;
  };

  window.data = {
    set: set,
    get: get
  };
})();

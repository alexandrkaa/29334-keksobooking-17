'use strict';

(function () {
  var data = null;

  var setData = function (newData) {
    data = newData;
  };

  var getData = function () {
    return data;
  };

  window.dataModule = {
    setData: setData,
    getData: getData
  };
})();

'use strict';

(function () {

  var SERVER_URL = 'https://js.dump.academy/keksobooking/data';
  var TRANSFER_DATA_TYPE = 'json';

  var disablePage = function () {
    window.map.deleteElems();
    window.mainPin.resetMainPin();
    window.form.disableForm();
    window.map.disableMap();
    window.filters.disable();
  };

  var start = function () {
    window.adv.init(window.map.insertElems);
    window.mainPin.init(function () {
      window.form.enableForm();
      window.server.ajax({
        url: SERVER_URL,
        // timeout: timeout || 5000,
        type: TRANSFER_DATA_TYPE,
        success: function (response) {
          window.filters.enable();
          window.map.enableMap();
          window.data.set(response);
          window.map.insertElems(window.data.get().slice(0, 5), window.adv.createPin);
        },
        sendError: window.handleMessages.showError
      });
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    disablePage();
    start();
  });

  window.entry = {
    disablePage: disablePage,
    start: start
  };
})();

'use strict';

(function () {

  var NETWORK_TIMEOUT = 5000;
  var SERVER_URL = 'https://js.dump.academy/keksobooking/data';
  var TRANSFER_DATA_TYPE = 'json';

  var disablePage = function () {
    window.map.deleteElems();
    window.mainPin.resetMainPin();
    window.form.disableForm();
    window.map.disableMap();
    window.filters.disable();
  };

  var enablePage = function () {
    window.form.enableForm();
    window.map.enableMap();
    window.filters.enable();
  };

  var start = function () {
    window.adv.init(window.map.insertElems);
    window.mainPin.init(function () {
      enablePage();
      window.server.ajax({
        url: SERVER_URL,
        type: TRANSFER_DATA_TYPE,
        timeout: NETWORK_TIMEOUT,
        success: function (response) {
          window.data.set(response);
          window.map.insertElems(window.data.get().slice(0, 5), window.adv.createPin);
        },
        sendError: window.handleMessages.showErrorMessage
      });
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    disablePage();
    start();
  });

  window.entry = {
    disablePage: disablePage,
    enablePage: enablePage,
    start: start
  };
})();

'use strict';

(function () {

  var NETWORK_TIMEOUT = 3000;
  var SERVER_URL = 'https://js.dump.academy/keksobooking/data';

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

  // var start = function () {
  //   window.adv.init(window.map.insertElems);
  //   window.mainPin.init(function () {
  //     enablePage();
  //     window.map.insertElems(window.data.get().slice(0, 5), window.adv.createPin);
  //   });
  // };

  var start = function () {
    window.adv.init(window.map.insertElems);
    window.mainPin.init(function () {
      enablePage();
      window.server.ajax({
        url: SERVER_URL,
        type: 'json',
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
    start();
  });

  // document.addEventListener('DOMContentLoaded', function () {
  //   disablePage();
  //   window.server.ajax({
  //     url: 'https://js.dump.academy/keksobooking/data',
  //     type: 'json',
  //     timeout: 3000,
  //     success: function (response) {
  //       window.data.set(response);
  //       start();
  //     },
  //     sendError: window.handleMessages.showErrorMessage
  //   });
  // });

  window.entry = {
    disablePage: disablePage,
    enablePage: enablePage,
    start: start
  };
})();

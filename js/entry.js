'use strict';

(function () {

  var disablePage = function () {
    window.map.deleteElems();
    window.mainPin.resetMainPin();
    window.formModule.disableForm();
    window.map.disableMap();
    window.filters.disable();
  };

  var enablePage = function () {
    window.formModule.enableForm();
    window.map.enableMap();
    window.filters.enable();
  };

  var start = function () {
    window.adv.init(window.map.insertElems);
    window.mainPin.init(function () {
      enablePage();
      window.map.insertElems(window.data.get().slice(0, 5), window.adv.createPin);
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    disablePage();
    window.server.ajax({
      url: 'https://js.dump.academy/keksobooking/data',
      type: 'json',
      timeout: 3000,
      success: function (response) {
        window.data.set(response);
        start();
      },
      sendError: window.handleMessagesModule.showErrorMessage
    });
  });

  window.entry = {
    disablePage: disablePage,
    enablePage: enablePage,
    start: start
  };
})();

'use strict';

(function () {

  var disablePage = function () {
    window.mapModule.deleteElems();
    window.mainPinModule.resetMainPin();
    window.formModule.disableForm();
    window.mapModule.disableMap();
    window.filtersModule.disableFilters();
  };

  var enablePage = function () {
    window.formModule.enableForm();
    window.mapModule.enableMap();
    window.filtersModule.enableFilters();
  };

  var start = function (time) {
    window.adv.init(window.mapModule.insertElems);
    window.mainPinModule.init(function () {
      enablePage();
      window.mapModule.insertElems(window.dataModule.getData().slice(0, 5), window.adv.createPin);
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    disablePage();
    window.server.ajax({
      url: 'https://js.dump.academy/keksobooking/data',
      type: 'json',
      timeout: 3000,
      success: function (response) {
        window.dataModule.setData(response);
        start();
      },
      sendError: window.handleMessagesModule.showErrorMessage
    });
  });

  window.entryModule = {
    disablePage: disablePage,
    enablePage: enablePage,
    start: start
  };
})();

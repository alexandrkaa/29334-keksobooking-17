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
  disablePage();

  var start = function (time) {
    window.serverModule.ajax({
      url: 'https://js.dump.academy/keksobooking/data',
      type: 'json',
      timeout: 3000,
      success: function (response) {
        window.dataModule.setData(response);
      },
      sendError: window.handleMessagesModule.showErrorMessage
    });

    window.advModule.init(window.mapModule.insertElems);
    document.addEventListener('DOMContentLoaded', function () {
      window.mainPinModule.init(function () {
        enablePage();
        window.mapModule.insertElems(window.dataModule.getData().slice(0, 5), window.advModule.createPin);
      });
    });
  };

  start();

  // window.serverModule.ajax({
  //   url: 'https://js.dump.academy/keksobooking/data',
  //   type: 'json',
  //   timeout: 3000,
  //   success: function (response) {
  //     window.dataModule.setData(response);
  //   },
  //   sendError: window.handleMessagesModule.showErrorMessage
  // });

  // window.advModule.init(window.mapModule.insertElems);
  // document.addEventListener('DOMContentLoaded', function () {
  //   window.mainPinModule.init(function () {
  //     enablePage();
  //     window.mapModule.insertElems(window.dataModule.getData().slice(0, 5), window.advModule.createPin);
  //   });
  // });

  window.entryModule = {
    disablePage: disablePage,
    enablePage: enablePage,
    start: start
  };
})();

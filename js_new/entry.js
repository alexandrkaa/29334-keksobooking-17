'use strict';

(function () {
  window.serverModule.ajax({
    url: 'https://js.dump.academy/keksobooking/data',
    type: 'json',
    success: function (response) {
      window.dataModule.setData(response);
    },
    sendError: function () {
      window.handleMessagesModule.onErrorMessage();
    }
  });

  window.advModule.init(window.mapModule.insertElems);
  document.addEventListener('DOMContentLoaded', function () {
    window.mainPinModule.init(function () {
      window.formModule.enableForm();
      window.mapModule.enableMap();
      // window.filters.enable();
      window.mapModule.insertElems(window.dataModule.getData(), window.advModule.createPin);
    });
  });
})();

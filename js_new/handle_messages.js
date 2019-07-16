'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainBlock = document.querySelector('main');
  var successMessageElement = null;
  var closeSuccessMessage = function () {
    successMessageElement.remove();
    document.removeEventListener('keydown', window.utilsModule.onEscPress);
    window.entryModule.disablePage();
  };
  // var ERROR_BUTTON = document.querySelector('error__button');
  var showSuccessMessage = function () {
    successMessageElement = successTemplate.cloneNode(true);
    document.addEventListener('keydown', window.utilsModule.onEscPress.bind(this, closeSuccessMessage));
    successMessageElement.addEventListener('click', function () {
      closeSuccessMessage();
    });
    mainBlock.appendChild(successMessageElement);
  };

  var showErrorMessage = function () {
    var errorMessageElement = errorTemplate.cloneNode(true);
    var reloadButton = errorMessageElement.querySelector('.error__button');
    reloadButton.addEventListener('click', function () {
      errorMessageElement.remove();
      window.serverModule.ajax({
        url: 'https://js.dump.academy/keksobooking/data',
        type: 'json',
        timeout: 3000,
        success: function (response) {
          window.dataModule.setData(response);
          window.mapModule.insertElems(window.dataModule.getData().slice(0, 5), window.advModule.createPin);
          // window.entryModule.start();
        },
        sendError: window.handleMessagesModule.showErrorMessage
      });
    });
    mainBlock.appendChild(errorMessageElement);
  };

  window.handleMessagesModule = {
    'showSuccessMessage': showSuccessMessage,
    'showErrorMessage': showErrorMessage
  };
})();

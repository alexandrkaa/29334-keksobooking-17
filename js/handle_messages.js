'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainBlock = document.querySelector('main');
  var successMessageElement = null;
  var closeSuccessMessage = function () {
    successMessageElement.remove();
    document.removeEventListener('keydown', window.utils.onEscPress);
    window.entry.disablePage();
  };

  var showSuccessMessage = function () {
    successMessageElement = successTemplate.cloneNode(true);
    document.addEventListener('keydown', window.utils.onEscPress.bind(this, closeSuccessMessage));
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
      window.server.ajax({
        url: 'https://js.dump.academy/keksobooking/data',
        type: 'json',
        timeout: 3000,
        success: function (response) {
          window.data.set(response);
          window.entry.start();
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

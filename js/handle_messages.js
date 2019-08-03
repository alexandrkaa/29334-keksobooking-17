'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainBlock = document.querySelector('main');
  var successMessageElement = null;
  var errorMessageElement = null;
  var closeSuccessMessage = function () {
    successMessageElement.remove();
    document.removeEventListener('keydown', window.utils.onEscPress);
    window.form.resetForm();
    window.entry.disablePage();
    window.entry.start();
  };

  var showSuccess = function () {
    successMessageElement = successTemplate.cloneNode(true);
    document.addEventListener('keydown', window.utils.onEscPress.bind(null, closeSuccessMessage));
    successMessageElement.addEventListener('click', function () {
      closeSuccessMessage();
    });
    mainBlock.appendChild(successMessageElement);
  };

  var onEscCloseErrorMessageOnGetRequest = function (evt) {
    return window.utils.onEscPress(closeErrorMessage.bind(null, 'GET'), evt);
  };

  var onEscCloseErrorMessageOnPostRequest = function (evt) {
    return window.utils.onEscPress(closeErrorMessage.bind(null, 'POST'), evt);
  };

  var closeErrorMessage = function (sendMethod) {
    errorMessageElement.remove();
    if (sendMethod === 'GET') {
      document.removeEventListener('keydown', onEscCloseErrorMessageOnGetRequest);
      window.entry.disablePage();
      window.entry.start();
    } else {
      document.removeEventListener('keydown', onEscCloseErrorMessageOnPostRequest);
    }
  };

  var showError = function (method) {
    var sendMethod = method || 'GET';
    errorMessageElement = null;
    errorMessageElement = errorTemplate.cloneNode(true);
    if (sendMethod === 'GET') {
      document.addEventListener('keydown', onEscCloseErrorMessageOnGetRequest);
    } else {
      document.addEventListener('keydown', onEscCloseErrorMessageOnPostRequest);
    }
    errorMessageElement.addEventListener('click', function () {
      closeErrorMessage(sendMethod);
    });
    mainBlock.appendChild(errorMessageElement);
  };

  window.handleMessages = {
    showSuccess: showSuccess,
    showError: showError
  };

})();

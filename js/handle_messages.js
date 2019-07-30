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

  var showSuccessMessage = function () {
    successMessageElement = successTemplate.cloneNode(true);
    document.addEventListener('keydown', window.utils.onEscPress.bind(null, closeSuccessMessage));
    successMessageElement.addEventListener('click', function () {
      closeSuccessMessage();
    });
    mainBlock.appendChild(successMessageElement);
  };

  // var onEscCloseSuccessMessage = function () {
  //   return window.utils.onEscPress.bind(null, closeSuccessMessage);
  // };

  // var onEscCloseErrorMessage = function (sendMethod, evt) {
  //   // return window.utils.onEscPress.bind(null, closeErrorMessage.bind(null, sendMethod));
  //   return window.utils.onEscPress(closeErrorMessage, evt);
  // };

  var onEscCloseErrorMessageOnGetRequest = function (evt) {
    return window.utils.onEscPress(closeErrorMessage.bind(null, 'GET'), evt);
  };

  var onEscCloseErrorMessageOnPostRequest = function (evt) {
    return window.utils.onEscPress(closeErrorMessage.bind(null, 'GET'), evt);
  };

  var closeErrorMessage = function (sendMethod) {
    console.log(sendMethod);
    // debugger;
    // window.errorMessageElement = errorMessageElement;
    errorMessageElement.remove();
    console.log(errorMessageElement);
    // errorMessageElement = null;
    // document.removeEventListener('keydown', window.utils.onEscPress);
    // debugger;
    // document.removeEventListener('keydown', onEscCloseErrorMessage);
    if (sendMethod === 'GET') {
      document.removeEventListener('keydown', onEscCloseErrorMessageOnGetRequest);
      window.entry.disablePage();
      window.entry.start();
    } else {
      document.removeEventListener('keydown', onEscCloseErrorMessageOnPostRequest);
    }
  };

  var showErrorMessage = function (method) {
    // console.log(arguments);
    // console.log(message);
    var sendMethod = method || 'GET';
    errorMessageElement = null;
    errorMessageElement = errorTemplate.cloneNode(true);
    // var reloadButton = errorMessageElement.querySelector('.error__button');

    // document.addEventListener('keydown', window.utils.onEscPress.bind(null, closeErrorMessage.bind(null, sendMethod)));
    // document.addEventListener('keydown', onEscCloseErrorMessage.bind(null, sendMethod));
    if (sendMethod === 'GET') {
      document.addEventListener('keydown', onEscCloseErrorMessageOnGetRequest);
    } else {
      document.addEventListener('keydown', onEscCloseErrorMessageOnPostRequest);
    }

    // reloadButton.addEventListener('click', function () {
    //   closeErrorMessage(sendMethod);
    // });
    errorMessageElement.addEventListener('click', function () {
      closeErrorMessage(sendMethod);
    });
    mainBlock.appendChild(errorMessageElement);
  };

  window.handleMessages = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();

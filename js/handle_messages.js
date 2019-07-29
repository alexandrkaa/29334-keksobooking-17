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

  // var onEscCloseErrorMessage = function () {
  //   return window.utils.onEscPress.bind(null, closeErrorMessage.bind(null, sendMethod));
  // };

  var closeErrorMessage = function (sendMethod) {
    console.log(sendMethod);
    // debugger;
    // window.errorMessageElement = errorMessageElement;
    try {
      errorMessageElement.remove();
    } catch(err_) {
      console.log(err_);
    }
    console.log(errorMessageElement);
    // errorMessageElement = null;
    document.removeEventListener('keydown', window.utils.onEscPress);
    if (sendMethod === 'GET') {
      window.entry.disablePage();
      window.entry.start();
    }
  };

  var showErrorMessage = function (message, method) {
    // console.log(message);
    var sendMethod = method || 'GET';
    errorMessageElement = null;
    errorMessageElement = errorTemplate.cloneNode(true);
    // var reloadButton = errorMessageElement.querySelector('.error__button');
    document.addEventListener('keydown', window.utils.onEscPress.bind(null, closeErrorMessage.bind(null, sendMethod)));
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

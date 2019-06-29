'use strict';

(function () {
  var SUCCESS_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
  var ERROR_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
  var MAIN_BLOCK = document.querySelector('main');
  // var ERROR_BUTTON = document.querySelector('error__button');
  var onSuccessMessage = function (message) {
    var successMessageElement = SUCCESS_TEMPLATE.cloneNode(true);
    MAIN_BLOCK.appendChild(successMessageElement);
  };

  var onErrorMessage = function () {
    var errorMessageElement = ERROR_TEMPLATE.cloneNode(true);
    MAIN_BLOCK.appendChild(errorMessageElement);
  };

  window.handleMessagesModule = {
    'onSuccessMessage': onSuccessMessage,
    'onErrorMessage': onErrorMessage
  };
})();

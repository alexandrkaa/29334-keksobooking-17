'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainBlock = document.querySelector('main');
  // var ERROR_BUTTON = document.querySelector('error__button');
  var showSuccessMessage = function () {
    var successMessageElement = successTemplate.cloneNode(true);
    successMessageElement.addEventListener('click', function () {
      window.entryModule.disablePage();
      successMessageElement.remove();
    });
    // TODO: добавить закрытие успешного окна по ESC. убирать listener. вынести onEscPress в utils? //он еще в adv.js
    mainBlock.appendChild(successMessageElement);
  };

  var showErrorMessage = function () {
    var errorMessageElement = errorTemplate.cloneNode(true);
    var reloadButton = errorMessageElement.querySelector('.error__button');
    reloadButton.addEventListener('click', function () {
      errorMessageElement.remove();
      window.entryModule.start();
    });
    mainBlock.appendChild(errorMessageElement);
  };

  window.handleMessagesModule = {
    'showSuccessMessage': showSuccessMessage,
    'showErrorMessage': showErrorMessage
  };
})();


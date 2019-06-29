'use strict';

(function () {

  var loadServerData = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        // 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      // 'Произошла ошибка соединения'
      onError();
    });

    xhr.addEventListener('timeout', function () {
      // 'Сервер не ответил за ' + xhr.timeout + 'мс'
      onError();
    });

    xhr.timeout = 3000;

    xhr.open('GET', url);
    xhr.send();
  };

  var getServerPinsData = function (onSuccess, onError) {
    var SERVER_URL = 'https://js.dump.academy/keksobooking/data';
    loadServerData(SERVER_URL, onSuccess, onError || window.handleMessagesModule.onErrorMessage);
  };

  window.serverDataModule = {
    'getServerPinsData': getServerPinsData
  };

})();

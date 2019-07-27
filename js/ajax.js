'use strict';

(function () {
  var AJAX_COMPLETED = 4; // ajax запрос выполнен
  var HTTP_OK = 200; // сервер ответил OK
  var NETWORK_TIMEOUT = 3000;

  function ajax(settings) {
    var ajaxSettings = {
      method: 'GET', // метод запроса
      url: '', // адрес запроса
      data: null, // передаваемые данные
      async: true, // синхронный или асинхронный запрос
      success: null, // колбэк, выполняется в случае успешно выполненого запроса
      sendError: null, // функция обработки ошибок
      type: '', // тип получаемых данных
      readyStateChange: null, // функция обработки ответа сервера
      headers: {}, // заголовки для сервера
      timeout: NETWORK_TIMEOUT
    };
    var options = Object.assign(ajaxSettings, settings);
    var xhr = new XMLHttpRequest();
    xhr.responseType = options.type;
    xhr.open(options.method, options.url, options.async);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    for (var key in options.headers) {
      if (options.headers.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, options.headers[key]);
      }

    }
    xhr.onreadystatechange = options.readyStateChange || function () {
      if (xhr.readyState === AJAX_COMPLETED && xhr.status === HTTP_OK) {
        options.success(xhr.response);
      }
      if (xhr.readyState === AJAX_COMPLETED && xhr.status !== HTTP_OK) {
        if (typeof options.sendError === 'function') {
          options.sendError(xhr.response, options.method);
        }
      }
    };
    xhr.onerror = function () {
      if (typeof options.sendError === 'function') {
        options.sendError('Ошибка соединения!', options.method);
      }
    };
    xhr.timeout = options.timeout;
    xhr.send(options.data);
  }
  window.server = {
    ajax: ajax
  };

})();

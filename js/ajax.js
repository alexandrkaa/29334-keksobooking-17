'use strict';

(function () {
  var AJAX_COMPLETED = 4; // ajax запрос выполнен
  var HTTP_OK = 200; // сервер ответил OK

  function ajax(settings) {
    // принимает в кач. параметра настройки
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
      timeout: 3000
    };
    // сформируем опции запроса на основе дефолтных настроек и переданных опций
    var options = Object.assign(ajaxSettings, settings);
    // создадим объект запроса
    var xhr = new XMLHttpRequest();
    xhr.responseType = options.type;
    xhr.open(options.method, options.url, options.async);
    // установим заголовок, сообщающий серверу, что это именно AJAX-запрос
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // установим остальные заголовки если есть
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
          options.sendError(xhr.response);
        }
      }
    };
    xhr.onerror = function () {
      if (typeof options.sendError === 'function') {
        options.sendError('Ошибка соединения!');
      }
    };
    xhr.timeout = options.timeout;
    xhr.send(options.data);
  }
  window.server = {
    ajax: ajax
  };

})();

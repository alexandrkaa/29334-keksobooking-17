'use strict';

(function () {
  var AjaxStates = {
    AJAX_COMPLETED: 4,
  };
  var AjaxStatuses = {
    UNSENT: 0,
    DONE: 200
  };
  var NETWORK_TIMEOUT = 5000;

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
      if (xhr.readyState === AjaxStates.AJAX_COMPLETED && xhr.status === AjaxStatuses.DONE) {
        options.success(xhr.response);
      }
      if (xhr.readyState === AjaxStates.AJAX_COMPLETED && xhr.status !== AjaxStatuses.DONE) {
        if (typeof options.sendError === 'function') {
          options.sendError(options.method);
        }
      }
    };
    xhr.timeout = options.timeout;
    xhr.send(options.data);
  }
  window.server = {
    ajax: ajax
  };

})();

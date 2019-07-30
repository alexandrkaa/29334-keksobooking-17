'use strict';

(function () {
  var AjaxStates = {
    AJAX_COMPLETED: 4,
  };
  var AjaxStatuses = {
    UNSENT: 0,
    DONE: 200
  };
  // var AJAX_COMPLETED = 4; // ajax запрос выполнен
  // var HTTP_OK = 200; // сервер ответил OK
  // var NETWORK_TIMEOUT = 5000;
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
    console.log(xhr.readyState, xhr.status, xhr.statusText);
    xhr.responseType = options.type;
    xhr.open(options.method, options.url, options.async);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    for (var key in options.headers) {
      if (options.headers.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, options.headers[key]);
      }
    }
    console.log(xhr.readyState, xhr.status, xhr.statusText);
    xhr.onreadystatechange = options.readyStateChange || function () {
      console.log(xhr.readyState, xhr.status, xhr.statusText);
      if (xhr.readyState === AjaxStates.AJAX_COMPLETED && xhr.status === AjaxStatuses.DONE) {
        options.success(xhr.response);
      }
      if (xhr.readyState === AjaxStates.AJAX_COMPLETED && xhr.status !== AjaxStatuses.DONE) {
        if (typeof options.sendError === 'function') {
          options.sendError(xhr.response, options.method);
        }
      }
    };

    // xhr.onerror = function () {
    //   if (typeof options.sendError === 'function') {
    //     console.log(xhr);
    //     options.sendError('Ошибка соединения!', options.method);
    //   }
    // };
    xhr.timeout = options.timeout;
    // debugger;
    xhr.send(options.data);
    // try {
    //   // xhr.send(options.data);
    // } catch (err_) {
    //   console.log(err_);
    // }
  }
  window.server = {
    ajax: ajax
  };

})();

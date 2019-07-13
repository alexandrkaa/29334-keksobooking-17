'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mapElems = [];

  var disableMap = function () {
    mapBlock.classList.add('map--faded');
  };

  var enableMap = function () {
    mapBlock.classList.remove('map--faded');
  };
  var insertElems = function (elemData, renderElem) {
    var node = null;
    // вставляем pin`ы
    if (Array.isArray(elemData)) {
      var fragment = document.createDocumentFragment();
      elemData.forEach(function (item) {
        node = renderElem(item);
        fragment.appendChild(node);
        mapElems.push(node);
      });
      mapBlock.appendChild(fragment);
    } else { // вставляем карточку объявления
      node = renderElem(elemData);
      mapBlock.lastElementChild.insertAdjacentElement('beforeBegin', node);
      mapElems.push(node);
      var index = mapElems.indexOf(node);
      if (index !== -1) {
        mapElems.splice(index, 1);
      }
      // предусмотреть, что когда открываем новую карточку,
      // старая из массива mapElems удаляется и добавляется новая
    }
  };

  var deleteElems = function () {
    mapElems.forEach(function (elem) {
      elem.remove();
    });
    mapElems = [];
  };

  window.mapModule = {
    insertElems: insertElems,
    deleteElems: deleteElems,
    disableMap: disableMap,
    enableMap: enableMap
  };
})();

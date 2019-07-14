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
    // дописать throw error если нет данных
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
      var index = mapElems.findIndex(function (elem) {
        if (elem.classList.contains('popup')) {
          return true;
        }
        return false;
      });
      if (index !== -1) {
        mapElems.splice(index, 1);
      }
      node = renderElem(elemData);
      mapBlock.lastElementChild.insertAdjacentElement('beforeBegin', node);
      mapElems.push(node);
    }
    // window.mapElems = mapElems;
    // console.log(mapElems);
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

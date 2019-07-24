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
    }
  };

  var deleteElems = function () {
    mapElems.forEach(function (elem) {
      elem.remove();
    });
    mapElems.splice(0, mapElems.length);
  };

  document.addEventListener('closeCard', function (evt) {
    var index = mapElems.findIndex(function () {
      return evt.target.classList.contains('popup');
    });
    if (index !== -1) {
      mapElems.splice((index - 1), 1);
    }
    evt.target.remove();
  });

  window.map = {
    insertElems: insertElems,
    deleteElems: deleteElems,
    disableMap: disableMap,
    enableMap: enableMap
  };
})();

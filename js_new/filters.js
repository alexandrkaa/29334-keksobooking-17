'use strict';

(function () {
  var MAX_ADV = 5;
  var currentData;
  var housingTypeField = document.querySelector('#housing-type');
  // var filtersForm = document.querySelector('.map__filters');
  // var filtersEnable = function (data) {
  //   var filters = Array.from(filtersForm.querySelectorAll('select, input'));
  //   filters.forEach(function(filter) {
  //     filter.addEventListener('change', function (evt) {
  //       filterData(data, evt.target);
  //     });
  //   });
  // };

  // // var filterData = function (data, filter) {
  // //   return data.map(function (it) {
  // //     // it.offer[тут ]
  // //   })
  // // };

  // window.filterModule = {
  //   filtersEnable: filtersEnable
  // };

  var filterServerDataLength = function (data) {
    if (data.length > 5) {
      currentData = data.slice(MAX_ADV - 1);
    } else {
      currentData = data;
    }
  };

  var getFiltred = function () {
    return currentData;
  };

  var onHousingTypeChange = function(evt) {
    var housingType = evt.target.value;
    currentData = data.map();
  };

  window.filterModule = {
    filterServerDataLength: filterServerDataLength
  };

})();


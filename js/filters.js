'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var changeFiltersDisableState = function (state) {
    var stateToSet = state || false;
    Array.from(filterForm.elements).forEach(function (filter) {
      filter.disabled = stateToSet;
    });
  };

  var enable = function () {
    changeFiltersDisableState(false);
  };

  var disable = function () {
    changeFiltersDisableState(true);
  };

  var housingFilterData = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };

  var housingPrice = {
    LOW_PRICE: 10000,
    HIHGH_PRICE: 50000
  };

  var housingFilter = function (offer, filterType) {
    var filterResult = true;
    if (filterType !== 'features') {
      if (housingFilterData[filterType] !== 'any') {
        if (filterType !== 'price') {
          filterResult = offer[filterType] === housingFilterData[filterType];
        } else {
          switch (housingFilterData[filterType]) {
            case 'low':
              filterResult = offer[filterType] < housingPrice.LOW_PRICE;
              break;
            case 'middle':
              filterResult = offer[filterType] >= housingPrice.LOW_PRICE && offer[filterType] <= housingPrice.HIHGH_PRICE;
              break;
            case 'high':
              filterResult = offer[filterType] > housingPrice.HIHGH_PRICE;
              break;
          }
        }
      }
    } else {
      for (var i = 0; i < housingFilterData.features.length; i++) {
        if (!offer.features.includes(housingFilterData.features[i])) {
          filterResult = false;
          break;
        }
      }
    }
    return filterResult;
  };

  var updateHousingFilterData = function (evt) {
    var value = isNaN(evt.target.value) ? evt.target.value : parseInt(evt.target.value, 10);
    switch (evt.target.name) {
      case 'housing-type':
        housingFilterData.type = value;
        break;
      case 'housing-price':
        housingFilterData.price = value;
        break;
      case 'housing-rooms':
        housingFilterData.rooms = value;
        break;
      case 'housing-guests':
        housingFilterData.guests = value;
        break;
      case 'features':
        if (housingFilterData.features.includes(value)) {
          housingFilterData.features.splice(housingFilterData.features.indexOf(value), 1);
        } else {
          housingFilterData.features.push(value);
        }
        break;
      default:
        housingFilterData = {
          type: 'any',
          price: 'any',
          rooms: 'any',
          guests: 'any',
          features: []
        };
        break;
    }
  };

  var onChangeFilter = function (evt) {
    var pins = window.data.get();
    updateHousingFilterData(evt);
    var filterKeys = Object.keys(housingFilterData);
    var filtredPins = pins.filter(function (pin) {
      var filtredStatus = true;
      for (var i = 0; i < filterKeys.length; i++) {
        filtredStatus = housingFilter(pin.offer, filterKeys[i]);
        if (!filtredStatus) {
          break;
        }
      }
      return filtredStatus;
    }).slice(0, 5);
    window.map.deleteElems();
    window.map.insertElems(filtredPins, window.adv.createPin);
  };

  filterForm.addEventListener('change', onChangeFilter);

  window.filters = {
    enable: enable,
    disable: disable,
    housingFilterData: housingFilterData
  };

})();

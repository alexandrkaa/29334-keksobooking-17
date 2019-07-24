'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterFeatures = filterForm.querySelectorAll('.map__checkbox');

  var HousingFilterData = {
    TYPE: 'any',
    PRICE: 'any',
    ROOMS: 'any',
    GUESTS: 'any',
    FEATURES: []
  };

  var changeFiltersDisableState = function (state) {
    var stateToSet = state || false;
    Array.from(filterForm.elements).forEach(function (filter) {
      filter.disabled = stateToSet;
    });
  };

  var changeFeatureState = function (evt) {
    var chkbox = evt.target;
    chkbox.checked = chkbox.checked === true ? false : true;
    changeFilter(evt);
  };

  var enebleEnterOnFeatures = function () {
    filterFeatures.forEach(function (feature) {
      feature.addEventListener('keydown', window.utils.onEnterPress.bind(null, changeFeatureState));
    });
  };

  var disableEnterOnFeatures = function () {
    filterFeatures.forEach(function (featureLabel) {
      featureLabel.removeEventListener('keydown', window.utils.onEnterPress);
    });
  };

  var enable = function () {
    changeFiltersDisableState(false);
    enebleEnterOnFeatures();
  };

  var disable = function () {
    disableEnterOnFeatures();
    changeFiltersDisableState(true);
  };

  var housingPrice = {
    LOW_PRICE: 10000,
    HIHGH_PRICE: 50000
  };

  var housingFilter = function (offer, filterType) {
    var filterResult = true;
    if (filterType !== 'features') {
      if (HousingFilterData[filterType.toUpperCase()] !== 'any') {
        if (filterType !== 'price') {
          filterResult = offer[filterType.toUpperCase()] === HousingFilterData[filterType.toUpperCase()];
        } else {
          switch (HousingFilterData[filterType.toUpperCase()]) {
            case 'low':
              filterResult = offer[filterType.toUpperCase()] < housingPrice.LOW_PRICE;
              break;
            case 'middle':
              filterResult = offer[filterType.toUpperCase()] >= housingPrice.LOW_PRICE && offer[filterType.toUpperCase()] <= housingPrice.HIHGH_PRICE;
              break;
            case 'high':
              filterResult = offer[filterType.toUpperCase()] > housingPrice.HIHGH_PRICE;
              break;
          }
        }
      }
    } else {
      for (var i = 0; i < HousingFilterData.FEATURES.length; i++) {
        if (!offer.features.includes(HousingFilterData.FEATURES[i])) {
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
        HousingFilterData.TYPE = value;
        break;
      case 'housing-price':
        HousingFilterData.PRICE = value;
        break;
      case 'housing-rooms':
        HousingFilterData.ROOMS = value;
        break;
      case 'housing-guests':
        HousingFilterData.GUESTS = value;
        break;
      case 'features':
        if (HousingFilterData.FEATURES.includes(value)) {
          HousingFilterData.FEATURES.splice(HousingFilterData.FEATURES.indexOf(value), 1);
        } else {
          HousingFilterData.FEATURES.push(value);
        }
        break;
      default:
        HousingFilterData = {
          TYPE: 'any',
          PRICE: 'any',
          ROOMS: 'any',
          GUESTS: 'any',
          FEATURES: []
        };
        break;
    }
  };

  var changeFilter = function (evt) {
    updateHousingFilterData(evt);
    var pins = window.data.get();
    var filterKeys = Object.keys(HousingFilterData);
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

  var onChangeFilter = function (evt) {
    window.utils.debounce(changeFilter, evt);
  };

  filterForm.addEventListener('change', onChangeFilter);

  window.filters = {
    enable: enable,
    disable: disable,
    HousingFilterData: HousingFilterData
  };

})();

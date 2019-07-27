'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterFeatures = filterForm.querySelectorAll('.map__checkbox');

  var HousingFilterData = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };

  var HousingPrice = {
    LOW_PRICE: 10000,
    HIHGH_PRICE: 50000
  };

  var resetFeatures = function () {
    Array.from(filterFeatures).forEach(function (feature) {
      feature.checked = false;
    });
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
    onChangeFilter(evt);
  };

  var onEnterPress = function (evt) {
    return window.utils.onEnterPress(changeFeatureState, evt);
  };

  var enebleEnterOnFeatures = function () {
    filterFeatures.forEach(function (feature) {
      feature.addEventListener('keydown', onEnterPress);
    });
  };

  var disableEnterOnFeatures = function () {
    filterFeatures.forEach(function (featureLabel) {
      featureLabel.removeEventListener('keydown', onEnterPress);
    });
  };

  var enable = function () {
    changeFiltersDisableState(false);
    enebleEnterOnFeatures();
  };

  var disable = function () {
    disableEnterOnFeatures();
    changeFiltersDisableState(true);
    resetFeatures();
  };

  var housingFilter = function (offer, filterType) {
    var filterResult = true;
    if (filterType !== 'features') {
      if (HousingFilterData[filterType] !== 'any') {
        if (filterType !== 'price') {
          filterResult = offer[filterType] === HousingFilterData[filterType];
        } else {
          switch (HousingFilterData[filterType]) {
            case 'low':
              filterResult = offer[filterType] < HousingPrice.LOW_PRICE;
              break;
            case 'middle':
              filterResult = offer[filterType] >= HousingPrice.LOW_PRICE && offer[filterType] <= HousingPrice.HIHGH_PRICE;
              break;
            case 'high':
              filterResult = offer[filterType] > HousingPrice.HIHGH_PRICE;
              break;
          }
        }
      }
    } else {
      for (var i = 0; i < HousingFilterData.features.length; i++) {
        if (!offer.features.includes(HousingFilterData.features[i])) {
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
        HousingFilterData.type = value;
        break;
      case 'housing-price':
        HousingFilterData.price = value;
        break;
      case 'housing-rooms':
        HousingFilterData.rooms = value;
        break;
      case 'housing-guests':
        HousingFilterData.guests = value;
        break;
      case 'features':
        if (HousingFilterData.features.includes(value)) {
          HousingFilterData.features.splice(HousingFilterData.features.indexOf(value), 1);
        } else {
          HousingFilterData.features.push(value);
        }
        break;
      default:
        HousingFilterData = {
          type: 'any',
          price: 'any',
          rooms: 'any',
          guests: 'any',
          features: []
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

'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formFields = Array.from(form.querySelectorAll('input, select'));
  var priceField = form.querySelector('#price');
  var typeField = form.querySelector('#type');
  var timeInField = form.querySelector('#timein');
  var timeOutfield = form.querySelector('#timeout');
  var addressField = form.querySelector('#address');
  var roomsQuantityField = form.querySelector('#room_number');
  var capacityField = form.querySelector('#capacity');
  var formFieldsets = Array.from(form.querySelectorAll('fieldset'));
  var HOUSING_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var roomsForGuestsMap = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0'],
  };
  var mainPin = document.querySelector('.map__pin--main');
  var onAddressChange = function (evt) {
    // console.log(evt.target.offsetTop, evt.target.offsetLeft);
    addressField.value = evt.target.offsetTop + ', ' + evt.target.offsetLeft;
  };

  var onTimeInChange = function () {
    timeOutfield.value = timeInField.value;
  };

  var onTimeOutchange = function () {
    timeInField.value = timeOutfield.value;
  };

  var onTypeChange = function () {
    var minPrice = HOUSING_PRICES[typeField.querySelector('option:checked').value];
    priceField.min = minPrice;
    priceField.placeholder = minPrice;
  };

  var disableForm = function () {
    formFieldsets.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
    form.classList.add('ad-form--disabled');
    timeInField.removeEventListener('change', onTimeInChange);
    timeOutfield.removeEventListener('change', onTimeOutchange);
    typeField.removeEventListener('change', onTypeChange);
    mainPin.removeEventListener('onAddressChange', onAddressChange);
    form.removeEventListener('submit', onFormSubmit);
    roomsQuantityField.removeEventListener('change', clearRoomsForGuestsValidity);
    capacityField.removeEventListener('change', clearRoomsForGuestsValidity);
  };

  var enableForm = function () {
    formFieldsets.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    form.classList.remove('ad-form--disabled');
    timeInField.addEventListener('change', onTimeInChange);
    timeOutfield.addEventListener('change', onTimeOutchange);
    typeField.addEventListener('change', onTypeChange);
    mainPin.addEventListener('onAddressChange', onAddressChange);
    form.addEventListener('submit', onFormSubmit);
    roomsQuantityField.addEventListener('change', clearRoomsForGuestsValidity);
    capacityField.addEventListener('change', clearRoomsForGuestsValidity);
  };

  var clearRoomsForGuestsValidity = function () {
    roomsQuantityField.setCustomValidity('');
    capacityField.setCustomValidity('');
  };

  var validateRoomsForGuests = function () {
    // debugger;
    var valid = roomsForGuestsMap[roomsQuantityField.value].includes(capacityField.value);
    return valid;
  };

  var changeFieldError = function (field, isError) {
    if (isError) {
      field.style = 'box-shadow: 0 0 2px 2px #ff6547;';
    } else {
      field.style = '';
    }
  };

  var validateForm = function () {
    var isFormValid = true;
    if (!validateRoomsForGuests()) {
      roomsQuantityField.setCustomValidity('Количество гостей не подходит под комнаты');
      capacityField.setCustomValidity('Количество гостей не подходит под комнаты');
    }
    //  else {
    //   roomsQuantityField.setCustomValidity('');
    //   capacityField.setCustomValidity('');
    // }
    formFields.forEach(function (field) {
      // console.log(field.validity.valid);
      if (!field.validity.valid) {
        isFormValid = false;
      }
      changeFieldError(field, !field.validity.valid);
    });
    return isFormValid;
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var isFormValidated = validateForm();
    if (isFormValidated) {

    }
  };

  window.formModule = {
    disableForm: disableForm,
    enableForm: enableForm
  };
})();

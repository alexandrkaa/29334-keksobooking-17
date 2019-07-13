'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var priceField = form.querySelector('#price');
  var typeField = form.querySelector('#type');
  var timeInField = form.querySelector('#timein');
  var timeOutfield = form.querySelector('#timeout');
  var addressField = form.querySelector('#address');
  var formFieldsets = Array.from(form.querySelectorAll('fieldset'));
  var HOUSING_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var mainPin = document.querySelector('.map__pin--main');
  var onAddressChange = function (evt) {
    console.log(evt.target.offsetTop, evt.target.offsetLeft);
    // addressField.value = evt.
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
    mainPin.removeEventListener('onAddressChange', onAddressChange)
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
  };

  window.formModule = {
    disableForm: disableForm,
    enableForm: enableForm
  };
})();

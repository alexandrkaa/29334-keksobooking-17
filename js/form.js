'use strict';

(function () {
  var MAIN_FORM = document.querySelector('.ad-form');
  var PRICE_FIELD = document.querySelector('#price');
  var TYPE_FIELD = document.querySelector('#type');
  var ADDRESS_TYPE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var FORM_INPUTS = MAIN_FORM.querySelectorAll('input');
  var TIME_IN_FIELD = MAIN_FORM.querySelector('#timein');
  var TIME_OUT_FIELD = MAIN_FORM.querySelector('#timeout');
  var ADDRESS_FIELD = document.querySelector('#address');
  var FORM_FIELDSETS = document.querySelectorAll('form fieldset');

  var makeFormTransparent = function () {
    if (MAIN_FORM.classList.contains('ad-form--disabled')) {
      MAIN_FORM.classList.remove('ad-form--disabled');
    }
  };

  var makeFormUntransparent = function () {
    if (MAIN_FORM.classList.contains('ad-form--disabled')) {
      MAIN_FORM.classList.add('ad-form--disabled');
    }
  };

  var disableFormFieldsets = function () {
    for (var i = 0; i < FORM_FIELDSETS.length; i++) {
      FORM_FIELDSETS[i].disabled = true;
    }
  };

  var enebaleFormFieldsets = function () {
    for (var i = 0; i < FORM_FIELDSETS.length; i++) {
      FORM_FIELDSETS[i].disabled = false;
    }
  };

  var disableForm = function () {
    makeFormTransparent();
    disableFormFieldsets();
  };

  var enableForm = function () {
    makeFormUntransparent();
    enebaleFormFieldsets();
  };

  // set min price and placeholder
  var onTypeChange = function () {
    var minPrice = ADDRESS_TYPE[TYPE_FIELD.querySelector('option:checked').value];
    PRICE_FIELD.min = minPrice;
    PRICE_FIELD.placeholder = minPrice;
  };

  var onFormSubmit = function (evt) {
    var isFormValid = true;
    for (var i = 0; i < FORM_INPUTS.length; i++) {
      if (!FORM_INPUTS[i].validity.valid) {
        isFormValid = false;
        FORM_INPUTS[i].style = 'box-shadow: 0 0 2px 2px #ff6547;';
      } else {
        FORM_INPUTS[i].style = '';
      }
    }
    if (!isFormValid) {
      evt.preventDefault();
    }
  };

  var onTimeInChange = function () {
    TIME_OUT_FIELD.value = TIME_IN_FIELD.value;
  };

  var onTimeOutchange = function () {
    TIME_IN_FIELD.value = TIME_OUT_FIELD.value;
  };

  TIME_IN_FIELD.addEventListener('change', onTimeInChange);
  TIME_OUT_FIELD.addEventListener('change', onTimeOutchange);
  MAIN_FORM.addEventListener('submit', onFormSubmit);
  TYPE_FIELD.addEventListener('change', onTypeChange);

  var setAddress = function (coordinates) {
    ADDRESS_FIELD.value = coordinates.left + ', ' + coordinates.top;
  };

  window.formModule = {
    enableForm: enableForm,
    disableForm: disableForm,
    setAddress: setAddress
  };
})();

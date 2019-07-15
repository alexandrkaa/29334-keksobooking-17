'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var formFields = Array.from(form.querySelectorAll('input, select'));
  var priceField = form.querySelector('#price');
  var typeField = form.querySelector('#type');
  var timeInField = form.querySelector('#timein');
  var timeOutField = form.querySelector('#timeout');
  var addressField = form.querySelector('#address');
  var roomsQuantityField = form.querySelector('#room_number');
  var capacityField = form.querySelector('#capacity');
  var avatarField = form.querySelector('#avatar');
  var housingImageField = form.querySelector('#images');
  var formFieldsets = Array.from(form.querySelectorAll('fieldset'));
  var avatarPreview = form.querySelector('.ad-form-header__preview img');
  var housingImagePreviewBlock = form.querySelector('.ad-form__photo');
  var housingImagePreview = null;
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

  var createHousingPreview = function () {
    if (housingImagePreview === null) {
      housingImagePreview = document.createElement('img');
      housingImagePreview.alt = 'Фотографии жилья';
      housingImagePreview.width = 70;
      housingImagePreview.height = 70;
      housingImagePreviewBlock.appendChild(housingImagePreview);
    }
    return housingImagePreview;
  };

  var deleteHousingPreview = function () {
    housingImagePreview.remove();
  };

  var onAddressChange = function (evt) {
    addressField.value = evt.target.offsetTop + ', ' + evt.target.offsetLeft;
  };

  var onTimeInChange = function () {
    timeOutField.value = timeInField.value;
  };

  var onTimeOutchange = function () {
    timeInField.value = timeOutField.value;
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
    timeOutField.removeEventListener('change', onTimeOutchange);
    typeField.removeEventListener('change', onTypeChange);
    mainPin.removeEventListener('onAddressChange', onAddressChange);
    form.removeEventListener('submit', onFormSubmit);
    roomsQuantityField.removeEventListener('change', clearRoomsForGuestsValidity);
    capacityField.removeEventListener('change', clearRoomsForGuestsValidity);
    avatarField.removeEventListener('change', window.previewLoaderModule.onFileChoose);
    if (housingImagePreview !== null) {
      deleteHousingPreview();
    }
  };

  var enableForm = function () {
    formFieldsets.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    form.classList.remove('ad-form--disabled');
    timeInField.addEventListener('change', onTimeInChange);
    timeOutField.addEventListener('change', onTimeOutchange);
    typeField.addEventListener('change', onTypeChange);
    mainPin.addEventListener('onAddressChange', onAddressChange);
    form.addEventListener('submit', onFormSubmit);
    roomsQuantityField.addEventListener('change', clearRoomsForGuestsValidity);
    capacityField.addEventListener('change', clearRoomsForGuestsValidity);
    avatarField.addEventListener('change', window.previewLoaderModule.onFileChoose.bind(null, avatarPreview, avatarField));
    housingImageField.addEventListener('change', window.previewLoaderModule.onFileChoose.bind(null, createHousingPreview, housingImageField));
  };

  var clearRoomsForGuestsValidity = function () {
    roomsQuantityField.setCustomValidity('');
    capacityField.setCustomValidity('');
  };

  var validateRoomsForGuests = function () {
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
    formFields.forEach(function (field) {
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
      var formData = new FormData(form);
      var ajaxSetting = {
        method: 'POST',
        url: 'https://js.dump.academy/keksobooking',
        data: formData,
        async: true,
        success: window.handleMessagesModule.showSuccessMessage,
        sendError: window.handleMessagesModule.showErrorMessage,
      };
      window.serverModule.ajax(ajaxSetting);
    }
  };

  window.formModule = {
    disableForm: disableForm,
    enableForm: enableForm
  };
})();

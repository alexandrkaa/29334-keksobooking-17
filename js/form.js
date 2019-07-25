'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var formFields = Array.from(form.querySelectorAll('input, select'));
  var formFieldsets = Array.from(form.querySelectorAll('fieldset'));
  var avatarPreview = form.querySelector('.ad-form-header__preview img');
  var housingImagePreviewBlock = form.querySelector('.ad-form__photo');
  var formFeatures = Array.from(form.querySelectorAll('.feature__checkbox'));
  var housingImagePreview = null;
  var HousingPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var DEFAULT_AVATAR_IMG = 'img/muffin-grey.svg';
  var roomsForGuestsMap = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0'],
  };

  var changeFormFeatureState = function (evt) {
    var chkbox = evt.target;
    chkbox.checked = chkbox.checked === true ? false : true;
  };

  var enebleEnterOnFormFeatures = function () {
    formFeatures.forEach(function (feature) {
      feature.addEventListener('keydown', window.utils.onEnterPress.bind(null, changeFormFeatureState));
    });
  };

  var disableEnterOnFormFeatures = function () {
    formFeatures.forEach(function (featureLabel) {
      featureLabel.removeEventListener('keydown', window.utils.onEnterPress);
    });
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
    form.address.value = evt.target.offsetTop + ', ' + evt.target.offsetLeft;
    // console.log(form.address.value, evt.target.offsetTop + ', ' + evt.target.offsetLeft);
  };

  var onTimeInChange = function () {
    form.timeout.value = form.timein.value;
  };

  var onTimeOutchange = function () {
    form.timein.value = form.timeout.value;
  };

  var onTypeChange = function () {
    var minPrice = HousingPrices[form.type.value.toUpperCase()];
    form.price.min = minPrice;
    form.price.placeholder = minPrice;
  };

  var disableForm = function () {
    form.reset();
    window.mainPin.resetMainPin();
    formFieldsets.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
    form.classList.add('ad-form--disabled');
    form.timein.removeEventListener('change', onTimeInChange);
    form.timeout.removeEventListener('change', onTimeOutchange);
    form.type.removeEventListener('change', onTypeChange);
    mainPin.removeEventListener('onAddressChange', onAddressChange);
    form.removeEventListener('submit', onFormSubmit);
    form.removeEventListener('reset', onFormReset);
    form.rooms.removeEventListener('change', clearRoomsForGuestsValidity);
    form.capacity.removeEventListener('change', clearRoomsForGuestsValidity);
    form.avatar.removeEventListener('change', window.previewLoader.onFileChoose);
    if (housingImagePreview !== null) {
      deleteHousingPreview();
    }
    avatarPreview.src = DEFAULT_AVATAR_IMG;
    onTypeChange();
    disableEnterOnFormFeatures();
  };

  var enableForm = function () {
    formFieldsets.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    form.classList.remove('ad-form--disabled');
    form.timein.addEventListener('change', onTimeInChange);
    form.timeout.addEventListener('change', onTimeOutchange);
    form.type.addEventListener('change', onTypeChange);
    mainPin.addEventListener('onAddressChange', onAddressChange);
    form.addEventListener('submit', onFormSubmit);
    form.addEventListener('reset', onFormReset);
    form.rooms.addEventListener('change', clearRoomsForGuestsValidity);
    form.capacity.addEventListener('change', clearRoomsForGuestsValidity);
    form.avatar.addEventListener('change', window.previewLoader.onFileChoose.bind(null, avatarPreview, form.avatar));
    form.images.addEventListener('change', window.previewLoader.onFileChoose.bind(null, createHousingPreview, form.images));
    onTypeChange();
    enebleEnterOnFormFeatures();
  };

  var clearRoomsForGuestsValidity = function () {
    form.rooms.setCustomValidity('');
    form.capacity.setCustomValidity('');
  };

  var validateRoomsForGuests = function () {
    var valid = roomsForGuestsMap[form.rooms.value].includes(form.capacity.value);
    return valid;
  };

  var changeFieldError = function (field, isError) {
    field.style = (isError ? 'box-shadow: 0 0 2px 2px #ff6547;' : '');
  };

  var validateForm = function () {
    var isFormValid = true;
    if (!validateRoomsForGuests()) {
      form.rooms.setCustomValidity('Количество гостей не подходит под комнаты');
      form.capacity.setCustomValidity('Количество гостей не подходит под комнаты');
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
        success: window.handleMessages.showSuccessMessage,
        sendError: window.handleMessages.showErrorMessage,
      };
      window.server.ajax(ajaxSetting);
    }
  };

  var onFormReset = function (evt) {
    evt.preventDefault();
    window.entry.disablePage();
    window.entry.start();
    // window.mainPin.resetMainPin();
  };

  window.form = {
    disableForm: disableForm,
    enableForm: enableForm
  };
})();

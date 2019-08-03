'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';
  var NETWORK_TIMEOUT = 10000;

  var form = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var formFields = Array.from(form.querySelectorAll('input, select, textarea'));
  var formFieldsets = Array.from(form.querySelectorAll('fieldset'));
  var avatarPreview = form.querySelector('.ad-form-header__preview img');
  var housingImagePreviewBlock = form.querySelector('.ad-form__photo-container');
  var formFeatures = Array.from(form.querySelectorAll('.feature__checkbox'));
  var imagesBlock = form.querySelector('.ad-form__upload');
  var housingImagePreview = null;
  var allImages = [];
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
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
      feature.addEventListener('keydown', onEnterPress);
    });
  };

  var onEnterPress = function (evt) {
    return window.utils.onEnterPress(changeFormFeatureState, evt);
  };

  var disableEnterOnFormFeatures = function () {
    formFeatures.forEach(function (feature) {
      feature.removeEventListener('keydown', onEnterPress);
    });
  };

  var createHousingPreview = function (file) {
    // if (housingImagePreview === null) {
    housingImagePreview = document.createElement('img');
    housingImagePreview.alt = 'Фотографии жилья';
    housingImagePreview.width = 70;
    housingImagePreview.height = 70;
    housingImagePreview.src = file;
    var housingImageContainer = document.createElement('div');
    housingImageContainer.classList.add('ad-form__photo');
    housingImageContainer.appendChild(housingImagePreview);
    // housingImagePreviewBlock.appendChild(housingImagePreview);
    // }
    return housingImageContainer;
  };

  var deleteHousingPreview = function () {
    housingImagePreview.remove();
    housingImagePreview = null;
  };

  var onAddressChange = function (evt) {
    form.address.value = evt.target.offsetTop + ', ' + evt.target.offsetLeft;
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

  var resetCurrentImages = function () {
    var images = document.querySelectorAll('.ad-form__photo');
    images.forEach(function (image) {
      image.remove();
    });
  };

  var resetImagesBlock = function () {
    resetCurrentImages();
    var imgPlaceHolder = document.createElement('div');
    imgPlaceHolder.classList.add('ad-form__photo');
    imagesBlock.appendChild(imgPlaceHolder);
  };

  var checkMimeType = function (file) {
    var mime = file.type.slice(file.type.indexOf('/') + 1)
    return FILE_TYPES.includes(mime);
  };

  var onFileChoose = function (files) {
    var filtredFiles = Array.prototype.filter.call(files, function (file) {
      return checkMimeType(file);
    }).map(function (file) {
      return URL.createObjectURL(file);
    });
    return filtredFiles;
  };

  var onImagesChoose = function (event) {
    event.preventDefault();
    // housingImagePreviewBlock.innerHTML = '';
    resetCurrentImages();
    // сделать отдельно фильтр типа
    allImages = allImages.concat(Array.from(form.images.files));
    var resources = onFileChoose(allImages);


    // !!! Добавить по reset возвращение пустого контейнера

    resources.forEach(function (resource) {
      // var img = document.createElement('img');
      // img.alt = '';
      // img.src = resource;
      // img.width = 70;
      // img.height = 70;
      // var imgContainer = document.createElement('div');
      // imgContainer.classList.add('ad-form__photo');
      // imgContainer.appendChild(img);
      housingImagePreviewBlock.appendChild(createHousingPreview(resource));
    });
  };

  var onAvatarChoose = function (evt) {
    return window.previewLoader.onFileChoose(avatarPreview, evt);
  };

  var disableForm = function () {
    formFieldsets.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
    formFeatures.forEach(function (it) {
      it.checked = false;
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
    form.avatar.removeEventListener('change', onAvatarChoose);
    form.images.removeEventListener('change', onImagesChoose);
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
    form.avatar.addEventListener('change', onAvatarChoose);
    form.images.addEventListener('change', onImagesChoose);
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
      formData.delete('images');
      var ajaxSetting = {
        method: 'POST',
        url: SERVER_URL,
        data: formData,
        async: true,
        success: window.handleMessages.showSuccess,
        sendError: window.handleMessages.showError,
        timeout: NETWORK_TIMEOUT
      };
      window.server.ajax(ajaxSetting);
    }
  };

  var resetForm = function () {
    formFields.forEach(function (it) {
      switch (it.type) {
        case 'text':
        case 'number':
        case 'file':
        case 'textarea':
          it.value = '';
          break;
        case 'checkbox':
          it.checked = false;
          break;
        case 'select-one':
          it.value = it.querySelector('option[selected]').value;
          break;
        default:
          it.value = '';
          break;
      }
      it.style = '';
    });
    resetImagesBlock();
  };

  var onFormReset = function (evt) {
    evt.preventDefault();
    resetForm();
    window.entry.disablePage();
    window.entry.start();
  };

  var returnImg = function () {
    return allImages;
  };

  window.form = {
    disableForm: disableForm,
    enableForm: enableForm,
    resetForm: resetForm,
    returnImg: returnImg
  };
})();

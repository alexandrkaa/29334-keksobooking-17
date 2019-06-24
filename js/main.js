'use strict';
var mockDataQuantity = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var MAP_BLOCK = document.querySelector('.map');
var MAP_PINS_BLOCK = MAP_BLOCK.querySelector('.map__pins');
var MAIN_PIN = MAP_PINS_BLOCK.querySelector('.map__pin--main');
var PIN_ELEMENT_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WIDTH = 50; // defined in css
var PIN_HEIGHT = 70; // defined in css
var MAP_TOP = 130;
var MAP_BOTTOM = 630;
var FORM_FIELDSETS = document.querySelectorAll('form fieldset');
var MAIN_FORM = document.querySelector('.ad-form');
var ADDRESS_FIELD = document.querySelector('#address');
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

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generetaMock = function (dataQuantity) {
  var mock = [];
  var mapPinsBlockWidth = MAP_PINS_BLOCK.offsetWidth;

  for (var i = 0; i < parseInt(dataQuantity, 10); i++) {
    mock[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'type': OFFER_TYPE[getRandomValue(0, OFFER_TYPE.length - 1)]
      },
      'location': {
        'x': getRandomValue(0, mapPinsBlockWidth),
        'y': getRandomValue(MAP_TOP, MAP_BOTTOM)
      }
    };
  }
  return mock;
};

var fadeMap = function () {
  if (!MAP_BLOCK.classList.contains('map--faded')) {
    MAP_BLOCK.classList.add('map--faded');
  }
};

var unFadeMap = function () {
  if (MAP_BLOCK.classList.contains('map--faded')) {
    MAP_BLOCK.classList.remove('map--faded');
  }
};

var isMapFaded = function () {
  return MAP_BLOCK.classList.contains('map--faded');
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

var enableForm = function () {
  if (MAIN_FORM.classList.contains('ad-form--disabled')) {
    MAIN_FORM.classList.remove('ad-form--disabled');
  }
};

var disableForm = function () {
  if (MAIN_FORM.classList.contains('ad-form--disabled')) {
    MAIN_FORM.classList.add('ad-form--disabled');
  }
};

var activatePage = function () {
  unFadeMap();
  enableForm();
  enebaleFormFieldsets();
  return true;
};

var disactivatePage = function () {
  fadeMap();
  disableForm();
  disableFormFieldsets();
};

var createMapPinElement = function (pinData) {
  var pinElement = PIN_ELEMENT_TEMPLATE.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');
  var leftCoord = (pinData.location.x + (PIN_WIDTH / 2));
  if (leftCoord > (MAP_PINS_BLOCK.offsetWidth - (PIN_WIDTH / 2))) {
    leftCoord = MAP_PINS_BLOCK.offsetWidth - (PIN_WIDTH / 2);
  } else
  if (leftCoord < PIN_WIDTH / 2) {
    leftCoord = PIN_WIDTH / 2;
  }
  var topCoord = pinData.location.y - PIN_HEIGHT;
  if (topCoord < MAP_TOP) {
    topCoord = MAP_TOP;
  }
  pinElementImg.src = pinData.author.avatar;
  pinElement.style.left = leftCoord + 'px';
  pinElement.style.top = topCoord + 'px';
  pinElementImg.alt = 'Заголовок объявления';
  return pinElement;
};

var appendPins = function (pinsData) {
  var pinsFragment = document.createDocumentFragment();
  for (var i = 0; i < pinsData.length; i++) {
    pinsFragment.appendChild(createMapPinElement(pinsData[i]));
  }
  MAP_PINS_BLOCK.appendChild(pinsFragment);
};

// var onMainPinClick = function () {
//   activatePage();
//   setAddress(getMainPinCoordinates());
// };

var getMainPinSize = function () {
  var mainPinSize = {};
  if (isMapFaded()) {
    mainPinSize.width = MAIN_PIN.offsetWidth;
    mainPinSize.height = MAIN_PIN.offsetHeight;
  } else {
    mainPinSize.width = MAIN_PIN.offsetWidth;
    mainPinSize.height = MAIN_PIN.offsetHeight + parseInt(window.getComputedStyle(MAIN_PIN, '::after').height, 10);
  }
  return mainPinSize;
};

var MAIN_PIN_SIZE = getMainPinSize();

var getMainPinCoordinates = function () {
  var coordinates = {};
  coordinates.left = MAIN_PIN.offsetLeft + (MAIN_PIN_SIZE.width / 2);
  coordinates.top = MAIN_PIN.offsetTop + (MAIN_PIN_SIZE.height / 2);
  return coordinates;
};

var setAddress = function (coordinates) {
  ADDRESS_FIELD.value = coordinates.left + ', ' + coordinates.top;
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
disactivatePage();
appendPins(generetaMock(mockDataQuantity));
setAddress(getMainPinCoordinates());
// MAIN_PIN.addEventListener('click', onMainPinClick);
MAIN_PIN.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var isPageActive = false;

  var startCoordinates = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMoveMainPin = function (moveEvt) {
    moveEvt.preventDefault();

    if (!isPageActive) {
      isPageActive = activatePage();
    }
    setAddress(getMainPinCoordinates());

    var shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    };

    startCoordinates = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    MAIN_PIN.style.top = (MAIN_PIN.offsetTop - shift.y) + 'px';
    MAIN_PIN.style.left = (MAIN_PIN.offsetLeft - shift.x) + 'px';
  };

  var onMouseUpOnMainPin = function (upEvt) {
    upEvt.preventDefault();

    if (!isPageActive) {
      isPageActive = activatePage();
    }

    setAddress(getMainPinCoordinates());

    document.removeEventListener('mousemove', onMoveMainPin);
    document.removeEventListener('mouseup', onMouseUpOnMainPin);
  };

  document.addEventListener('mousemove', onMoveMainPin);
  document.addEventListener('mouseup', onMouseUpOnMainPin);
});

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

var onMainPinClick = function () {
  activatePage();
  setAddress(getMainPinCoordinates());
};

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

var getMainPinCoordinates = function () {
  var coordinates = {};
  var mainPinSize = getMainPinSize();
  coordinates.left = MAIN_PIN.offsetLeft + (mainPinSize.width / 2);
  coordinates.top = MAIN_PIN.offsetTop + (mainPinSize.height / 2);
  return coordinates;
};

var setAddress = function (coordinates) {
  ADDRESS_FIELD.value = coordinates.left + ', ' + coordinates.top;
};

disactivatePage();
appendPins(generetaMock(mockDataQuantity));
setAddress(getMainPinCoordinates());
MAIN_PIN.addEventListener('click', onMainPinClick);

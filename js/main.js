'use strict';
var mockDataQuantity = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var MAPS_PINS_BLOCK = document.querySelector('.map__pins');
var MAP_FADE_BLOCK = document.querySelector('.map');
var PIN_ELEMENT_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generetaMock = function (dataQuantity) {
  var mock = [];
  var mapPinsBlockWidth = MAPS_PINS_BLOCK.offsetWidth;

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
        'y': getRandomValue(130, 630)
      }
    };
  }
  return mock;
};

var switchMapFade = function () {
  if (MAP_FADE_BLOCK.classList.contains('map--faded')) {
    MAP_FADE_BLOCK.classList.remove('map--faded');
  } else {
    MAP_FADE_BLOCK.classList.add('map--faded');
  }
};

var createMapPinElement = function (pinData) {
  var pinElement = PIN_ELEMENT_TEMPLATE.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');
  pinElementImg.src = pinData.author.avatar;
  pinElement.style.left = pinData.location.x + 'px';
  pinElement.style.top = pinData.location.y + 'px';
  pinElementImg.alt = 'Заголовок объявления';
  return pinElement;
};

var appendPins = function (pinsData) {
  var pinsFragment = document.createDocumentFragment();
  var pinsBlock = document.querySelector('.map__pins');
  for (var i = 0; i < pinsData.length; i++) {
    pinsFragment.appendChild(createMapPinElement(pinsData[i]));
  }
  pinsBlock.appendChild(pinsFragment);
};

switchMapFade();
appendPins(generetaMock(mockDataQuantity));

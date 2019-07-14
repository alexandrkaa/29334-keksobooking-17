'use strict';

(function () {
  var PIN_WIDTH = 50; // defined in css
  var PIN_HEIGHT = 70; // defined in css
  var ESC_KEYCODE = 27;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var HOUSING_TYPES = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var currentCard = null;
  var currentPin = null;
  var insertCardFunc = null;

  var init = function (insertCardMethod) {
    insertCardFunc = insertCardMethod;
  };

  var createPin = function (data) {
    var template = pinTemplate.cloneNode(true);
    template.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
    template.style.top = data.location.y - PIN_HEIGHT + 'px';
    var avatar = template.querySelector('img');
    avatar.src = data.author.avatar;
    avatar.alt = 'Аватар пользователя';

    template.addEventListener('click', function () {
      closeCard();
      insertCardFunc(data, createCard);

      if (currentPin) {
        currentPin.classList.remove('pin--active');
      }
      currentPin = template;
      currentPin.classList.add('pin--active');

    });
    return template;
  };

  var createCardFeature = function (feature) {
    var featureElem = document.createElement('li');
    featureElem.classList.add('popup__feature');
    featureElem.classList.add('popup__feature--' + feature);
    return featureElem;
  };

  var createCardPhoto = function (photo) {
    var photoElem = document.createElement('img');
    photoElem.src = photo;
    photoElem.alt = 'Фотография жилья';
    photoElem.width = 40;
    photoElem.height = 45;
    return photoElem;
  };

  var closeCard = function () {
    if (currentCard) {
      document.removeEventListener('keydown', onEscPress);
      currentCard.remove();
      currentCard = null;
    }
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      closeCard();
    }
  };

  var createCard = function (data) {
    document.addEventListener('keydown', onEscPress);
    var offer = data.offer;
    var template = cardTemplate.cloneNode(true);
    var cardAvatar = template.querySelector('.popup__avatar');
    cardAvatar.src = data.author.avatar;
    var cardTitle = template.querySelector('.popup__title');
    cardTitle.textContent = offer.title;
    var cardAddress = template.querySelector('.popup__text--address');
    cardAddress.textContent = offer.address;
    var cardPrice = template.querySelector('.popup__text--price');
    cardPrice.textContent = offer.price;
    var housingType = template.querySelector('.popup__type');
    housingType.textContent = HOUSING_TYPES[offer.type];
    var cardCapacity = template.querySelector('.popup__text--capacity');
    cardCapacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    var cardTime = template.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    var featuresFragment = document.createDocumentFragment();
    var featuresBlock = template.querySelector('.popup__features');
    featuresBlock.innerHTML = '';
    offer.features.forEach(function (feature) {
      featuresFragment.appendChild(createCardFeature(feature));
    });
    featuresBlock.appendChild(featuresFragment);
    var cardDescription = template.querySelector('.popup__description');
    cardDescription.textContent = offer.description;
    var photosBlock = template.querySelector('.popup__photos');
    photosBlock.innerHTML = '';
    var photosFragment = document.createDocumentFragment();
    offer.photos.forEach(function (photo) {
      photosFragment.appendChild(createCardPhoto(photo));
    });
    photosBlock.appendChild(photosFragment);
    currentCard = template;
    var cardCloseButton = template.querySelector('.popup__close');
    cardCloseButton.addEventListener('click', function () {
      closeCard();
    });
    return template;
  };

  window.advModule = {
    createPin: createPin,
    createCard: createCard,
    closeCard: closeCard,
    init: init
  };

})();

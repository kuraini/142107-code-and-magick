'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var WIZARD_AMOUNT = 4;
var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_SURNAMES = [
  'да Марья',
  'Верон', 'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var getRandomFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var makeWizards = function (count) {
  var wizards = [];

  for (var i = 0; i < count; i++) {
    wizards[i] = {
      name: getRandomFromArray(WIZARD_NAMES) + ' ' + getRandomFromArray(WIZARD_SURNAMES),
      coatColor: getRandomFromArray(COAT_COLORS),
      eyesColor: getRandomFromArray(EYES_COLORS)
    };
  }

  return wizards;
};

var wizards = makeWizards(WIZARD_AMOUNT);

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var makeFragment = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  return fragment;
};

similarListElement.appendChild(makeFragment());
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userIcon = userDialogOpen.querySelector('.setup-open-icon');
var userNameInput = userDialog.querySelector('.setup-user-name');
var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
var wizardCoatInput = userDialog.querySelector('input[name="coat-color"]');
var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesInput = userDialog.querySelector('input[name="eyes-color"]');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var wizardFireballInput = userDialog.querySelector('input[name="fireball-color"]');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

userDialogOpen.addEventListener('click', openPopup);

userIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('click', closePopup);
userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardCoat.addEventListener('click', function () {
  wizardCoat.setAttribute('style', 'fill: ' + getRandomFromArray(COAT_COLORS));
  wizardCoatInput.value = wizardCoat.style.fill;
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.setAttribute('style', 'fill: ' + getRandomFromArray(EYES_COLORS));
  wizardEyesInput.value = wizardEyes.style.fill;
});

wizardFireball.addEventListener('click', function () {
  wizardFireballInput.value = getRandomFromArray(FIREBALL_COLORS);
  wizardFireball.setAttribute('style', 'background: ' + wizardFireballInput.value);
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно сотоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Введите имя');
  } else {
    userNameInput.setCustomValidity('');
  }
});

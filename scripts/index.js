enableValidation({
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  inputErrorClass: 'pop-up__input_type_error',
});


const cardsContainer = document.querySelector('#location-cards');
const template = document.querySelector('#location-card-template');
const name = document.querySelector('.profile__name').textContent;
const prof = document.querySelector('.profile__prof').textContent;
const nameOutput = document.querySelector('#output-name');
const profOutput = document.querySelector('#output-prof');
const inputAddName = document.querySelector('#input-add-name');
const linkInput = document.querySelector('#input-add-url');
const popupFullImageDescribe = document.querySelector('#pop-up-describe');



function createCardElement(data) {
  const clone = document.importNode(template.content, true);
  const cardElement = clone.querySelector('.location-card');
  const deleteButton = clone.querySelector('.location-card__delete-button');
  const image = clone.querySelector('.location-card__image');
  const name = clone.querySelector('.location-card__name');
  const likeButton = clone.querySelector('.location-card__like');

  image.src = data.link;
  image.alt = data.name;
  name.textContent = data.name;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', activeLike);

  image.addEventListener('click', () => {
    const src = image.getAttribute('src');
    const alt = image.getAttribute('alt');
    popupImageAddres.setAttribute('src', src);
    popupImageAddres.setAttribute('alt', alt);
    const cardName = name.textContent;
    popupFullImageDescribe.textContent = cardName;
    popupFullImage.classList.add('pop-up_image-background');
    openPopup(popupFullImage);
  });

  return cardElement;
};


function renderCard(data, conteiner) {
  conteiner.prepend(createCardElement(data));
};

for (const card of initialCards) {
  renderCard(card, cardsContainer)
}

function deleteCard(event) {
  const locationCard = event.currentTarget.closest('.location-card');
  locationCard.remove();
}

function activeLike(event) {
  const likeButton = event.currentTarget;
  likeButton.classList.toggle('location-card__like_active');
};

function openPopup(popup) {

  popup.classList.add('pop-up_opened');
  popup.addEventListener('click', handlePopupOverlayClick);
  document.addEventListener('keydown', closeByEscape);

}

function handlePopupOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

function closePopup(popup) {

  popup.classList.remove('pop-up_opened');
  popup.removeEventListener('click', handlePopupOverlayClick);
  document.removeEventListener('keydown', closeByEscape);

}

function openPropfilePopup() {

  inputNameFormProfile.value = nameOutput.textContent;
  inputProfessionFormProfile.value = profOutput.textContent;
  openPopup(popupProfile)

}


const popupProfile = document.querySelector('#pop-up-profile');
const inputNameFormProfile = popupProfile.querySelector('#input-name')
const inputProfessionFormProfile = popupProfile.querySelector('#input-job')
const buttonOpenPopupProfile = document.querySelector('#button-open-pop-up-profile');
const buttonClosePopupProfile = document.querySelector('#button-close-pop-up-profile');

const popupAddNewCard = document.querySelector('#pop-up-add-new-card');
const buttonOpenPopupAddNewCard = document.querySelector('#button-open-pop-up-add-new-card');
const buttonCloseAddPopupAddNewCard = document.querySelector('#button-close-pop-up-add-new-card');

const popupFullImage = document.querySelector('#pop-up-full-image');
const popupImageAddres = document.querySelector('#pop-up-image-addres');
const buttonOpenFullImage = document.querySelector('#button-open-pop-up-full-image');
const buttonCloseFullImage = document.querySelector('#button-close-pop-up-full-image');

buttonOpenPopupProfile.addEventListener('click', () => {
  openPopup(popupProfile);
  openPropfilePopup();
});
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));

buttonOpenPopupAddNewCard.addEventListener('click', () => openPopup(popupAddNewCard));
buttonCloseAddPopupAddNewCard.addEventListener('click', () => closePopup(popupAddNewCard));

buttonCloseFullImage.addEventListener('click', () => closePopup(popupFullImage));



function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.pop-up_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

const popupProfileFormElement = document.querySelector('#body-form');
const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-job');

function popupProfileFormSubmit(event) {

  event.preventDefault();

  nameOutput.textContent = nameInput.value;
  profOutput.textContent = jobInput.value;

  closePopup(popupProfile);
}

popupProfileFormElement.addEventListener('submit', popupProfileFormSubmit);

const addCardForm = document.querySelector('#add-card-form');

addCardForm.addEventListener('input', () => {
  const name = inputAddName.value;
  const link = linkInput.value;

  const submitButton = popupAddNewCard.querySelector('.pop-up__button');

  if (!name || !link) {
    submitButton.classList.add('pop-up__button_disabled');
    submitButton.setAttribute('disabled', 'true');
  } else {
    submitButton.classList.remove('pop-up__button_disabled');
    if (addCardForm.checkValidity()) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'true');
    }
  }
});

function popupAddCardFormSubmit(event) {
  event.preventDefault();

  if (!addCardForm.checkValidity()) {
    return;
  }

  const name = inputAddName.value;
  const link = linkInput.value;

  const cardData = { name, link };
  const cardElement = createCardElement(cardData);

  cardsContainer.insertBefore(cardElement, cardsContainer.firstElementChild);

  closePopup(popupAddNewCard);
  addCardForm.reset();
}

addCardForm.addEventListener('submit', popupAddCardFormSubmit);

const locationCardName = document.querySelector('#location-card-name');
const buttonOpenPopupFullImage = document.querySelector('#button-open-pop-up-full-image');
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*------------------------------------------------------------*/
/*                          Elements                          */
/*------------------------------------------------------------*/
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector("#profile_add-button");
const addCardModal = document.querySelector("#add-card-modal");
const closeAddCardModalButton = document.querySelector(
  "#add_card__close-button"
);
const addCardForm = document.querySelector("#add-card-form");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#modal-form");
const cardListEl = document.querySelector(".cards__list");

const closeProfileEditModalButton = document.querySelector(
  "#profile_modal__close-button"
);

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const newPlaceTitleInput = document.querySelector("#New-place-title-input");
const imagelinkInput = document.querySelector("#Image-link-input");

// Modal elements
const imageModal = document.querySelector(".modal_type_image");
const imageModalCloseButton = imageModal.querySelector(".modal__close");
const modalImage = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");
/*------------------------------------------------------------*/
/*                          Functions                         */
/*------------------------------------------------------------*/
function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  // Like button functionality
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_filledIn_active");
  });

  // Delete button functionality
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openImageModal(cardImageEl.src, cardImageEl.alt);
  });

  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function openImageModal(imageSrc, imageAlt) {
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;
  modalCaption.textContent = imageAlt;
  openPopup(imageModal);
}

function closeImageModal() {
  closePopup(imageModal);
  modalImage.src = "";
  modalCaption.textContent = "";
}
/*------------------------------------------------------------*/
/*                    Event Handlers                          */
/*------------------------------------------------------------*/
function handleProfileEditSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileSubTitle.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardModalSubmit(e) {
  e.preventDefault();

  const name = newPlaceTitleInput.value;
  const link = imagelinkInput.value;

  renderCard({ name, link }, cardListEl);

  e.target.reset();

  closePopup(addCardModal);
}

/*------------------------------------------------------------*/
/*                    Event Listeners                         */
/*------------------------------------------------------------*/
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileSubTitle.textContent;
  openPopup(profileEditModal);
});

closeProfileEditModalButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));

closeAddCardModalButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

addCardForm.addEventListener("submit", handleAddCardModalSubmit);

imageModalCloseButton.addEventListener("click", closeImageModal);

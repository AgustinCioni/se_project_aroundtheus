function showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
  
  function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }
  
  function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      let errorMessage = inputElement.validationMessage;
      if (inputElement.validity.valueMissing) {
        errorMessage = "Please fill out this field.";
      } else if (inputElement.validity.tooShort) {
        errorMessage = `Please lengthen this text to ${inputElement.minLength} characters or more. You are currently using ${inputElement.value.length} character${inputElement.value.length !== 1 ? 's' : ''}.`;
      } else if (inputElement.validity.typeMismatch && inputElement.type === 'url') {
        errorMessage = "Please enter a web address.";
      }
      showInputError(formElement, inputElement, errorMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  }
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  }
  
  function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  }
  
  function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
  
      setEventListeners(formElement, config);
    });
  }
  
  // Enable validation for the forms
  enableValidation({
    formSelector: '.modal__form',
    inputSelector: '.modal__input',
    submitButtonSelector: '.modal__button',
    inactiveButtonClass: 'modal__button_disabled',
    inputErrorClass: 'modal__input_type_error',
    errorClass: 'modal__error_visible'
  });
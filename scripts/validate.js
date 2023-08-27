function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);

  function showInputError(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.add('pop-up__input_error');
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(settings.errorClass);
  }

  function hideInputError(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove('pop-up__input_error');
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
  }

  function checkInputValidity(form, input) {
    if (!input.validity.valid) {
      showInputError(form, input);
    } else {
      hideInputError(form, input);
    }
  }

  function toggleButtonState(form, button) {
    button.disabled = !form.checkValidity();
    if (button.disabled) {
      button.classList.add(settings.inactiveButtonClass);
    } else {
      button.classList.remove(settings.inactiveButtonClass);
    }
  }

  function handleInput(input) {
    const form = input.closest(settings.formSelector);
    checkInputValidity(form, input);
    toggleButtonState(form, form.querySelector(settings.submitButtonSelector));
  }

  function setEventListeners(form) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        handleInput(input);
      });
    });

    form.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    toggleButtonState(form, form.querySelector(settings.submitButtonSelector));
  }

  forms.forEach(form => {
    setEventListeners(form);
  });
}
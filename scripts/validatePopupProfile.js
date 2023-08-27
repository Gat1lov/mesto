const popupProfileForm = document.getElementById("body-form");
const popupProfileInputName = document.getElementById("input-name");
const popupProfileInputJob = document.getElementById("input-job");
const popupProfileButton = document.getElementById("input-button");

popupProfileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const popupProfileNameValue = popupProfileInputName.value.trim();
    const popupProfileJobValue = popupProfileInputJob.value.trim();

    const popupProfileNameError = document.querySelector("#input-name-error");
    const popupProfileJobError = document.querySelector("#input-job-error");

    popupProfileNameError.textContent = "";
    popupProfileJobError.textContent = "";

    const popupProfileFormValidation = true;

    const popupProfileNameValid = popupProfileLengthValidation(popupProfileNameValue, 2, 40);
    const popupProfileJobValid = popupProfileLengthValidation(popupProfileJobValue, 2, 200);

    if (popupProfileNameValid) {
        popupProfileInputError(popupProfileInputName, popupProfileNameError, "");
    } else {
        popupProfileInputError(popupProfileInputName, popupProfileNameError, "Имя должно быть от 2 до 40 символов");
    }

    if (popupProfileJobValid) {
        popupProfileInputError(popupProfileInputJob, popupProfileJobError, "");
    } else {
        popupProfileInputError(popupProfileInputJob, popupProfileJobError, "Род деятельности должен быть от 2 до 200 символов");
    }

    popupProfileButton.disabled = !(popupProfileNameValid && popupProfileJobValid);
});

popupProfileButton.disabled = true;

popupProfileInputName.addEventListener("input", popupProfileFormValidation);
popupProfileInputJob.addEventListener("input", popupProfileFormValidation);

function popupProfileLengthValidation(value, minLength, maxLength) {
    return value.length >= minLength && value.length <= maxLength;
}

function popupProfileInputError(popupProfileInputElement, popupProfileErrorElement, popupProfileErrorMessage) {
    if (popupProfileErrorMessage) {
        popupProfileInputElement.classList.add("pop-up__input_error");
        popupProfileErrorElement.textContent = popupProfileErrorMessage;
    } else {
        popupProfileInputElement.classList.remove("pop-up__input_error");
        popupProfileErrorElement.textContent = "";
    }
}

function popupProfileFormValidation() {
    const popupProfileNameValue = popupProfileInputName.value.trim();
    const popupProfileJobValue = popupProfileInputJob.value.trim();

    const popupProfileNameValid = popupProfileLengthValidation(popupProfileNameValue, 2, 40);
    const popupProfileJobValid = popupProfileLengthValidation(popupProfileJobValue, 2, 200);

    popupProfileButton.disabled = !(popupProfileNameValid && popupProfileJobValid);

    if (popupProfileNameValid) {
        popupProfileInputError(popupProfileInputName, document.querySelector("#input-name-error"), "");
    } else {
        popupProfileInputError(popupProfileInputName, document.querySelector("#input-name-error"), "Имя должно быть от 2 до 40 символов");
    }

    if (popupProfileJobValid) {
        popupProfileInputError(popupProfileInputJob, document.querySelector("#input-job-error"), "");
    } else {
        popupProfileInputError(popupProfileInputJob, document.querySelector("#input-job-error"), "Род деятельности должен быть от 2 до 200 символов");
    }
}
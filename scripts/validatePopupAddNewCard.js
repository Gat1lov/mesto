const popupAddNewCardForm = document.querySelector("#add-card-form");
const popupAddNewCardInputName = document.querySelector("#input-add-name");
const popupAddNewCardInputUrl = document.querySelector("#input-add-url");
const popupAddNewCardButton = document.querySelector("#input-add-button");

popupAddNewCardForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const popupAddNewCardNameValue = popupAddNewCardInputName.value.trim();
    const popupAddNewCardUrlValue = popupAddNewCardInputUrl.value.trim();

    const popupAddNewCardNameError = document.querySelector("#input-add-name-error");
    const popupAddNewCardUrlError = document.querySelector("#input-add-url-error");

    popupAddNewCardNameError.textContent = "";
    popupAddNewCardUrlError.textContent = "";

    let popupAddNewCardFormValidation = true;

    if (popupAddNewCardNameValue.length < 2 || popupAddNewCardNameValue.length > 30) {
        popupAddNewCardNameError.textContent = "Название должно быть от 2 до 30 символов";
        popupAddNewCardFormValidation = false;
        popupAddNewCardInputName.classList.add("pop-up__input_error");
    } else {
        popupAddNewCardInputName.classList.remove("pop-up__input_error");
    }

    if (!popupAddNewCardUrlValidation(popupAddNewCardUrlValue)) {
        popupAddNewCardUrlError.textContent = "Введите корректный URL";
        popupAddNewCardFormValidation = false;
        popupAddNewCardInputUrl.classList.add("pop-up__input_error");
    } else {
        popupAddNewCardInputUrl.classList.remove("pop-up__input_error");
    }

    popupAddNewCardButton.disabled = !popupAddNewCardFormValidation;
});

popupAddNewCardButton.disabled = true;

popupAddNewCardInputName.addEventListener("input", popupAddNewCardFormValidation);
popupAddNewCardInputUrl.addEventListener("input", popupAddNewCardFormValidation);

function popupAddNewCardFormValidation() {
    const popupAddNewCardNameValue = popupAddNewCardInputName.value.trim();
    const popupAddNewCardUrlValue = popupAddNewCardInputUrl.value.trim();

    const popupAddNewCardValidName = popupAddNewCardNameValue.length >= 2 && popupAddNewCardNameValue.length <= 30;
    const popupAddNewCardValidUrl = popupAddNewCardUrlValidation(popupAddNewCardUrlValue);

    popupAddNewCardFormValidation = popupAddNewCardValidName && popupAddNewCardValidUrl;
    popupAddNewCardButton.disabled = !popupAddNewCardFormValidation;

    const popupAddNewCardNameError = document.querySelector("#input-add-name-error");
    const popupAddNewCardUrlError = document.querySelector("#input-add-url-error");

    if (!popupAddNewCardValidName) {
        popupAddNewCardInputName.classList.add("pop-up__input_error");
        popupAddNewCardNameError.textContent = "Название должно быть от 2 до 30 символов";
    } else {
        popupAddNewCardInputName.classList.remove("pop-up__input_error");
        popupAddNewCardNameError.textContent = "";
    }

    if (!popupAddNewCardValidUrl) {
        popupAddNewCardInputUrl.classList.add("pop-up__input_error");
        popupAddNewCardUrlError.textContent = "Введите корректный URL";
    } else {
        popupAddNewCardInputUrl.classList.remove("pop-up__input_error");
        popupAddNewCardUrlError.textContent = "";
    }
}

function popupAddNewCardUrlValidation(url) {
    try {
        const popupAddCardUrl = new URL(url);
        return popupAddCardUrl.protocol === "http:" || popupAddCardUrl.protocol === "https:";
    } catch (_) {
        return false;
    }
}

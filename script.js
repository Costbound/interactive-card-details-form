const form = document.querySelector(".modal__form");
const completeContainer = document.querySelector(".modal__complete-container");
// Input
const nameInput = document.querySelector(".form__name-input");
const cardInput = document.querySelector(".form__card-number-input");
const monthInput = document.querySelector("input[name=card-month]");
const yearInput = document.querySelector("input[name=card-year]");
const cvcInput = document.querySelector(".form__cvc-input");
const submitBtn = document.querySelector(".form__submit-btn");
const completeBtn = document.querySelector(".complete__btn");
// Output
const cardOutput = document.querySelector(".card-front__card-number");
const nameOutput = document.querySelector(".name-date-container__name");
const dateOutput = document.querySelector(".name-date-container__date");
const cvcOutput = document.querySelector(".card-back__cvc");
const nameLable = document.querySelector(".form__name-label");
const cardLable = document.querySelector(".form__card-number-label");
const dateLable = document.querySelector(".form__date-lable");
const cvcLable = document.querySelector(".form__cvc-lable");
// -----------------------------------------------------------------------
const nameInvalidMessage = document.createElement("span");
nameInvalidMessage.classList.add("invalid-message");
const cardInvalidMessage = document.createElement("span");
cardInvalidMessage.classList.add("invalid-message");
const dateInvalidMessage = document.createElement("span");
dateInvalidMessage.classList.add("invalid-message");



form.addEventListener("submit", evt => {
    evt.preventDefault();
    formValidation();
});
completeBtn.addEventListener("click", () => {
    form.classList.remove("not-active");
    completeContainer.classList.add("not-active");
})

const cardInputValidation = (evt) => {
    if (cardInput.value.length === 4 || cardInput.value.length === 9 || cardInput.value.length === 14) {
        cardInput.value += " "; 
    } else if (!cardInput.value.includes(" ")) {
        cardInput.setAttribute("maxlength", "16");
    } else {
        cardInput.setAttribute("maxlength", "19");
    }
    return !(evt.keyCode < 48 || evt.keyCode > 57) || ((evt.keyCode === 32 || evt.keyCode === 45) && (cardInput.value.length === 4 || cardInput.value.length === 9 || cardInput.value.length === 14));
}
function formValidation() {
    nameValidation();
    cardValidation()
    if (nameValidation() && cardValidation()) {
        form.classList.add("not-active");
        completeContainer.classList.remove("not-active");
    }
}
function nameValidation() {
    if (nameInput.value.length === 0) {
        nameInput.classList.add("not-valid");
        nameInvalidMessage.textContent = "This field can't be blank";
        nameLable.appendChild(nameInvalidMessage);
        return false;
    } else if (!nameInput.value.match(/[a-zA-Z'?]+\s[a-zA-z'?]+/i)) {
        nameInput.classList.add("not-valid");
        nameInvalidMessage.textContent = "Enter correct name (e.g. Name Surname)";
        nameLable.appendChild(nameInvalidMessage);
        return false;
    } else {
        nameInput.classList.remove("not-valid");
        nameInvalidMessage.remove();
        return true;
    }
}
function cardValidation() {
    const match = cardInput.value.match(/\d/g).length || [];
    if (cardInput.value.length === 0) {
        cardInput.classList.add("not-valid");
        cardInvalidMessage.textContent = "This field can't be blank";
        cardLable.append(cardInvalidMessage);
        return false;
    } else if (match < 16) {
        cardInput.classList.add("not-valid");
        cardInvalidMessage.textContent = "Enter correct card number (e.g. 0000 0000 0000 0000)";
        cardLable.append(cardInvalidMessage);
        return false;
    } else {
        cardInput.classList.remove("not-valid");
        cardInvalidMessage.remove();
        return true;
    }
}
function dateValidation(input) {
    const match = input.value.match(/\d\d/).length || [];
    if (match < 2) {
        input
    }
}

let date = new Date();
const form = document.querySelector(".modal__form");
const formContainer = document.querySelector(".modal__form-content-container")
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
const monthOutput = document.querySelector(".name-date-container__month");
const yearOutput = document.querySelector(".name-date-container__year");
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
dateInvalidMessage.style.width = "180px";
const cvcInvalidMessage = document.createElement("span");
cvcInvalidMessage.classList.add("invalid-message");

// User accaunt////////////////////
const user = {
    username: "username",
    password: "password",
    email: "example@email.com",
    cards: []
}
// ///////////////////////////////
form.addEventListener("submit", evt => {
    evt.preventDefault();
    formValidation();
});
completeBtn.addEventListener("click", () => {
    form.classList.remove("not-active");
    completeContainer.classList.add("not-active");
    nameOutput.textContent = "Jane Appleseed";
    cardOutput.textContent = "0000 0000 0000 0000";
    monthOutput.textContent = "00/";
    yearOutput.textContent = "00";
    cvcOutput.textContent = "000";
    form.reset();
});
nameInput.addEventListener("input", () => { nameOutput.textContent = nameInput.value });
cardInput.addEventListener("input", () => { cardOutput.textContent = cardInput.value });
monthInput.addEventListener("input", () => { monthOutput.textContent = monthInput.value + "/" });
yearInput.addEventListener("input", () => { yearOutput.textContent = yearInput.value });
cvcInput.addEventListener("input", () => { cvcOutput.textContent = cvcInput.value });

const cardInputValidation = (evt) => {
    cardInput.value.length === 4 || cardInput.value.length === 9 || cardInput.value.length === 14 ? cardInput.value += " " :
        !cardInput.value.includes(" ") ? cardInput.setAttribute("maxlength", "16") :
            cardInput.setAttribute("maxlength", "19");
    return (evt.keyCode > 47 && evt.keyCode < 58) || ((evt.keyCode === 32 || evt.keyCode === 45) && (cardInput.value.length === 4 || cardInput.value.length === 9 || cardInput.value.length === 14));
}
const numberInputValidation = (evt) => {
    return evt.keyCode > 47 && evt.keyCode < 58;
}
const noNumberInputValidation = (evt) => {
    return !(evt.keyCode > 47 && evt.keyCode < 58);
}


const formValidation = () => {
    nameValidation();
    cardValidation();
    dateValidation(monthInput);
    dateValidation(yearInput);
    cvcValidation();
    if (nameValidation() && cardValidation() && dateValidation(monthInput) && dateValidation(yearInput) && cvcValidation()) {
        form.classList.add("not-active");
        completeContainer.classList.remove("not-active");
        user.cards.push(new Card());
    }
}
const nameValidation = () => {
    return nameInput.value.length === 0 ? inputEmpty(nameInput, nameLable, nameInvalidMessage) :
        !nameInput.value.match(/^[a-z'?]+\s[a-z'?]+$/i) ? inputInvalid(nameInput, nameLable, nameInvalidMessage, "Enter correct name (e.g. Name Surname)") :
            inputValid(nameInput, nameLable, nameInvalidMessage);
}
const cardValidation = () => {
    const match = cardInput.value.match(/\d/g) || [];
    return cardInput.value.length === 0 ? inputEmpty(cardInput, cardLable, cardInvalidMessage) :
        match.length < 16 ? inputInvalid(cardInput, cardLable, cardInvalidMessage, "Enter correct card number (e.g. 0000 0000 0000 0000)") :
            inputValid(cardInput, cardLable, cardInvalidMessage);
}
const dateValidation = (dateInput) => {
    const match = dateInput.value.match(/\d/g) || [];
    const year = Number(20 + yearInput.value);
    return dateInput.value.length === 0 ? inputEmpty(dateInput, dateLable, dateInvalidMessage) :
        match.length < 2 ? inputInvalid(dateInput, dateLable, dateInvalidMessage, "Enter correct date (e.g. 05 27)") :
            Number(monthInput.value) > 12 ? inputInvalid(dateInput, dateLable, dateInvalidMessage, "Month can't be more than 12") :
                year < date.getFullYear() || (year <= date.getFullYear() && Number(monthInput.value) < (date.getMonth() + 2)) ?
                    inputInvalid(dateInput, dateLable, dateInvalidMessage, "Your card is expired") :
                    inputValid(dateInput, dateLable, dateInvalidMessage);
}
const cvcValidation = () => {
    const match = cvcInput.value.match(/\d/g) || [];
    return cvcInput.value.length === 0 ? inputEmpty(cvcInput, cvcLable, cvcInvalidMessage) :
        match.length < 3 ? inputInvalid(cvcInput, cvcLable, cvcInvalidMessage, "Enter correct cvc number (e.g. 123)") :
            inputValid(cvcInput, cvcLable, cvcInvalidMessage);
}

const inputEmpty = (input, lable, message) => {
    input.classList.add("not-valid");
    message.textContent = "This field can't be blank";
    lable.append(message);
    lable.style.maxHeight = "100px";
}
const inputInvalid = (input, lable, message, text) => {
    input.classList.add("not-valid");
    message.textContent = text;
    lable.append(message);
    lable.style.maxHeight = "100px";
}
const inputValid = (input, lable, message) => {
    input.classList.remove("not-valid");
    message.remove();
    lable.style.maxHeight = "";
    return true;
}

class Card {
    constructor() {
        this.firstName = nameInput.value.split(" ").shift().toString().toLowerCase();
        this.surname = nameInput.value.split(" ").pop().toString().toLowerCase();
        this.cardNumber = cardInput.value.match(/\d/g).join("");
        this.expDate = monthInput.value + yearInput.value;
        this.cvc = cvcInput.value;
    }
}
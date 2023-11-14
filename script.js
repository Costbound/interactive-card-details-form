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

const numbersValidation = (evt) => {
    return
}

form.addEventListener("input", (evt) => {
    console.log(evt);
    console.log(evt.data);
})
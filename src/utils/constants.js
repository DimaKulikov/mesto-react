import avatar from "../images/avatar.png";

const validatorOptions = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_active'
}

const defaultUser = {
  name: "Имя",
  about: "Описание",
  avatar: avatar,
  _id: null,
  cohort: null,
};
export {defaultUser, validatorOptions};

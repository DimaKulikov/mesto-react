import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const { isEditProfilePopupOpen, closeAllPopups } = props;

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={isEditProfilePopupOpen}
      closeHandler={closeAllPopups}
    >
      <input
        className="form__input"
        id="profile-name-input"
        type="text"
        name="name"
        placeholder="Имя или заголовок"
        required
        autoComplete="off"
        minLength="2"
        maxLength="40"
      />
      <span className="form__error profile-name-input-error"></span>
      <input
        className="form__input"
        id="profile-subtitle-input"
        type="text"
        name="about"
        placeholder="Описание"
        required
        autoComplete="off"
        minLength="2"
        maxLength="200"
      />
      <span className="form__error profile-subtitle-input-error"></span>
      <button className="form__submit" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

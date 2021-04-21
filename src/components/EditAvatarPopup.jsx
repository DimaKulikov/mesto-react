import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose } = props;

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      isOpen={isOpen}
      closeHandler={onClose}
    >
      <input
        className="form__input"
        type="url"
        id="avatar-link-input"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        autoComplete="off"
      />
      <span className="form__error avatar-link-input-error"></span>
      <button className="form__submit form__submit_disabled" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

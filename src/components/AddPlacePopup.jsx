import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose } = props;

  return (
    <PopupWithForm
      name="place-add"
      title="Новое место"
      isOpen={isOpen}
      closeHandler={onClose}
    >
      <input
        className="form__input"
        type="text"
        id="place-name-input"
        name="name"
        placeholder="Название"
        required
        autoComplete="off"
        minLength="2"
        maxLength="30"
      />
      <span className="form__error place-name-input-error"></span>
      <input
        className="form__input"
        type="url"
        id="place-image-input"
        name="link"
        placeholder="Ссылка на картинку"
        required
        autoComplete="off"
      />
      <span className="form__error place-image-input-error"></span>
      <button className="form__submit form__submit_disabled" type="submit">
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

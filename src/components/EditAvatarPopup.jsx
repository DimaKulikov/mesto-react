import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const avatarLinkInputRef = useRef()

  function handleSubmit (e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarLinkInputRef.current.value }, avatarLinkInputRef.current);
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      isOpen={isOpen}
      closeHandler={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarLinkInputRef}
        className="form__input"
        type="url"
        id="avatar-link-input"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        autoComplete="off"
      />
      <span className="form__error avatar-link-input-error"></span>
      <button className="form__submit" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

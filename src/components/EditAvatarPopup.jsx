import { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const [isSubmitting, setIsSubmitting] = useState(false)

  const avatarLinkInputRef = useRef()

  function handleSubmit(e) {
    setIsSubmitting(true)
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarLinkInputRef.current.value })
      .finally(() => {
        onClose()
        avatarLinkInputRef.current.value = ''        
        setIsSubmitting(false)
      })
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
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

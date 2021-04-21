import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const currentUser = useContext(CurrentUserContext)
  
  const [name, setName] = useState(currentUser.name)
  const [description, setDescription] = useState(currentUser.about)
  

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description
    })
  }

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser])

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      closeHandler={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
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
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
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

import React from 'react'
import { useState } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;

  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(e) {
    setIsSubmitting(true)
    e.preventDefault()
    onAddPlace({ name, link })
      .finally(() => {
        onClose();
        setIsSubmitting(false)
        setName('')
        setLink('')
      })
  }

  return (
    <PopupWithForm
      name="place-add"
      title="Новое место"
      onSubmit={handleSubmit}
      {...{isOpen, onClose}}
    >
      <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
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
        value={link}
        onChange={(e)=>setLink(e.target.value)}
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
        {isSubmitting ? 'Сохранение...' : 'Создать' }
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

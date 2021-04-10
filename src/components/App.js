import React, { useState } from 'react'

import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState()

  function handleCardClick(cardData) {
    setSelectedCard(cardData)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm name='profile-edit' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} closeHandler={closeAllPopups}>
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
        <button
          className="form__submit"
          type="submit">
          Сохранить
            </button>
      </PopupWithForm>
      <PopupWithForm name='place-add' title='Новое место' isOpen={isAddPlacePopupOpen} closeHandler={closeAllPopups}>
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
        <button
          className="form__submit form__submit_disabled"
          type="submit">
          Создать
            </button>
      </PopupWithForm>

      {/* <PopupWithForm name='place-remove' title='Вы уверены?'>
        <button
          className="form__submit"
          type="submit">
          Да
            </button>
      </PopupWithForm> */}

      <PopupWithForm name='avatar-edit' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} closeHandler={closeAllPopups}>
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
        <button
          className="form__submit form__submit_disabled"
          type="submit">
          Сохранить
            </button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} closeHandler={closeAllPopups} />
      <template id="spinner">
        <div className="spinner"><i></i></div>
      </template>
    </div>
  );
}

export default App;

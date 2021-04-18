import React, { useState } from 'react'

import Header from './Header'
import Main from './Main'
import Footer from "./Footer";
import ImagePopup from './ImagePopup'
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";

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

      <EditProfilePopup
        isEditAvatarPopupOpen={isEditProfilePopupOpen}
        closeAllPopups={closeAllPopups}
      />
      <AddPlacePopup
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        closeAllPopups={closeAllPopups}
      />

      {/* <PopupWithForm name='place-remove' title='Вы уверены?'>
        <button
          className="form__submit"
          type="submit">
          Да
            </button>
      </PopupWithForm> */}

      <EditAvatarPopup
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        closeAllPopups={closeAllPopups}
      />
      <ImagePopup card={selectedCard} closeHandler={closeAllPopups} />
    </div>
  );
}

export default App;

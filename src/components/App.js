import React, { useEffect, useState } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";

import api from "../utils/Api";

import CurrentUserContext from "../contexts/CurrentUserContext";
import {defaultUser} from "../utils/constants";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState();
  const [currentUser, setCurrentUser] = useState(defaultUser);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser(newUserData) {
    return api.updateUserInfo(newUserData)
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
      })
      .catch(err => console.log('Ошибка при обновлении информации о пользователе: ', err))
  }

  function handleUpdateAvatar(newUserData) {
    return api.updateAvatar(newUserData)
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
      })
      .catch(err => console.log('Ошибка при обновлении аватара: ', err))      
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    return api.changeCardLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      });
  }

  function handleCardDelete(card) {
    return api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleAddPlaceSubmit(newCardData) {
    return api.addCard(newCardData)
      .then(addedCard => setCards([addedCard, ...cards]))
      .catch(err => console.error('Ошибка при добавлении карточки: ', err))
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsArray]) => {
        setCurrentUser(userData);
        setCards(cardsArray)
      })
      .catch(console.log)
    }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          {...{cards}}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} closeHandler={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

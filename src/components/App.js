import { useEffect, useState } from "react";

import {Header} from "./Header";
import Main from "./Main";
import {Footer} from "./Footer";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";

import api from "../utils/api";

import CurrentUserContext from "../contexts/CurrentUserContext";
import {defaultUser} from "../utils/constants";
import PlaceRemoveConfirmPopup from "./PlaceRemoveConfirmPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPlaceRemoveConfirmPopupOpen, setIsPlaceRemoveConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState();
  const [deletedCard, setDeletedCard] = useState()
  const [currentUser, setCurrentUser] = useState(defaultUser);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPlaceRemoveConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
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
      .catch(err => console.error('Ошибка при обновлении информации о пользователе: ', err))
  }

  function handleUpdateAvatar(newUserData) {
    return api.updateAvatar(newUserData)
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
      })
      .catch(err => console.error('Ошибка при обновлении аватара: ', err))      
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    return api.changeCardLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      });
  }


  function handleCardDelete(card) {
    setIsPlaceRemoveConfirmPopupOpen(true)
    setDeletedCard(card)
  }

  function handleCardDeleteComfifrmed(card) {
    return api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setIsImagePopupOpen(true)
  }

  function handleAddPlaceSubmit(newCardData) {
    return api.addCard(newCardData)
      .then(addedCard => setCards([addedCard, ...cards]))
      .catch(err => console.error('Ошибка при добавлении карточки: ', err))
  }
  /**
   * Effects
   */
  // fetch api data on mount
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsArray]) => {
        setCurrentUser(userData);
        setCards(cardsArray)
      })
      .catch(console.error)
    }, []);

  // change images with arrowkeys in image popup  
  useEffect(()=>{
    function handleCardSwitch(e) {
      if (isImagePopupOpen) {
        const currentCardIndex = cards.indexOf(selectedCard)
        if (e.key === 'ArrowLeft' && currentCardIndex > 0) setSelectedCard(cards[currentCardIndex - 1])
        if (e.key === 'ArrowRight' && currentCardIndex < cards.length - 1) setSelectedCard(cards[currentCardIndex + 1])
      }
    }      
    document.addEventListener('keydown', handleCardSwitch)
    return () => {document.removeEventListener('keydown', handleCardSwitch)}
  },[isImagePopupOpen, cards, selectedCard])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
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
        </div>
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
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />

        <PlaceRemoveConfirmPopup
          isOpen={isPlaceRemoveConfirmPopupOpen}
          onClose={closeAllPopups}
          onDeleteConfirm={handleCardDeleteComfifrmed}
          deletedCard={deletedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

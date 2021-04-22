import { useState, useContext, useEffect} from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"
import Card from './Card'
import api from './Api'



function Main(props) {
  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete } = props

  const currentUser = useContext(CurrentUserContext)
  // const [cards, setCards] = useState([])


  // useEffect(() => {
  //   api.getInitialCards().then(res => {
  //     setCards(res)
  //   }).catch(err => console.error('Ошибка получения карточек: ', err))
  // }, [])

  // function handleCardLike(card) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   const isLiked = card.likes.some((i) => i._id === currentUser._id);

  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   return api.changeCardLikeStatus(card._id, isLiked)
  //     .then((newCard) => {
  //       setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
  //     });
  // }

  // function handleCardDelete(card) {
  //   return api.deleteCard(card._id).then(() => {
  //     setCards((state) => state.filter((c) => c._id !== card._id));
  //   });
  // }
  
  return (
    <main className="page__section">
      <section className="profile">
        <button
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          className="profile__avatar"></button>
        <div className="profile__text-container">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-btn"
              type="button"
              aria-label="редактировать профиль">
            </button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-btn"
          type="button"
          aria-label="Добавить">
        </button>
      </section>
      <section className="cards">
        <div className="cards__spinner"></div>
        <ul className="cards__list">

          {cards.map((cardData => {
            return (
              <Card
                key={cardData._id}
                cardData={cardData}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          }))}



        </ul>
      </section>
    </main>
  )
}

export default Main
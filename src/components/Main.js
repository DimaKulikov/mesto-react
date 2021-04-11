import { useState, useEffect } from "react"
import api from "../utils/Api"
import Card from './Card'

function Main(props) {
  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props

  const [userName, setUserName] = useState('Имя')
  const [userDesctiption, setUserDescription] = useState('Описание')
  const [userAvatar, setUserAvatar] = useState('../../../images/avatar.png')

  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()]).then(res => {
      const [cardsArray, userData] = res;
      setUserAvatar(userData.avatar)
      setUserDescription(userData.about)
      setUserName(userData.name)
      setCards(cardsArray)
    }).catch(err => console.error('Ошибка получения карточек и данных пользователя: ', err))
  }, [])

  return (
    <main className="page__section">
      <section className="profile">
        <button
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${userAvatar})` }}
          className="profile__avatar"></button>
        <div className="profile__text-container">
          <div className="profile__name-container">
            <h1 className="profile__name">{userName}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-btn"
              type="button"
              aria-label="редактировать профиль">
            </button>
          </div>
          <p className="profile__subtitle">{userDesctiption}</p>
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
              <Card cardData={cardData} onCardClick={onCardClick} key={cardData._id} />
            )
          }))}



        </ul>
      </section>
    </main>
  )
}

export default Main
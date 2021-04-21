import { useState, useContext, useEffect} from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"
import Card from './Card'
import api from './Api'

function Main(props) {
  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props

  const [cards, setCards] = useState([])

  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    api.getInitialCards().then(res => {
      setCards(res)
    }).catch(err => console.error('Ошибка получения карточек: ', err))
  }, [])
  
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
              <Card cardData={cardData} onCardClick={onCardClick} key={cardData._id} />
            )
          }))}



        </ul>
      </section>
    </main>
  )
}

export default Main
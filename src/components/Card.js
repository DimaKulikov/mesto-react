function Card(props) {
  const { cardData, onCardClick } = props

  function handleClick() {
    onCardClick(cardData)
  }

  return (
    <li className="card">
      <button className="card__remove-btn"></button>
      <img
        className="card__pic"
        src={cardData.link}
        alt={cardData.name}
        onClick={handleClick}
      />
      <div className="card__caption">
        <h2 className="card__title">{cardData.name}</h2>
        <div className="card__like-container">
          <button
            className="card__like-btn"
            type="button"
            aria-label="лайк">
          </button>
          <span className="card__like-count">{cardData.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card
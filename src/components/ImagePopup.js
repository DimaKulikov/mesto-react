function ImagePopup(props) {
  const { card, closeHandler } = props

  return (
    <div className={`popup popup_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          onClick={closeHandler}
          className="popup__close-btn"
          type="button"
          aria-label="закрыть">
        </button>
        <img
          className="popup__image"
          // 
          src={card?.link}
          alt={card?.name}
        />
        <p className="popup__subtitle">{card?.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup
import { useEffect } from 'react';

function ImagePopup(props) {
  const { card, closeHandler } = props
  
  useEffect(() => {
    function closeOnEsc(evt) {
      if (evt.key === 'Escape') {
        closeHandler()
      }
    }

    if (card) {
      document.addEventListener('keydown', closeOnEsc)
    }
    return () => {
      document.removeEventListener('keydown', closeOnEsc)
    }
  }, [card, closeHandler])

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
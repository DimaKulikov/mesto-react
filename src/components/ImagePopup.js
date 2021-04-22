import { useEffect, useState } from 'react';
import PopupSpinner from './PopupSpinner';

function ImagePopup(props) {
  const { card, closeHandler } = props

  const [isImageLoading, setIsImageLoading] = useState(true)
  
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

  useEffect(() => {
    setIsImageLoading(true)
  },[card])

  const imageClass = `popup__image ${isImageLoading ? 'popup__image_hidden' : ''}`

  return (
    <div className={`popup popup_image ${card ? "popup_opened" : ""}`}>
      {card && (
        <div className="popup__container">
          <button
            onClick={closeHandler}
            className="popup__close-btn"
            type="button"
            aria-label="закрыть"
          ></button>
          {isImageLoading && <PopupSpinner />}
          <img className={imageClass} src={card.link} alt={card.name} onLoad={() =>{ setIsImageLoading(false); console.log('loaded')}} />
          
          <p className="popup__subtitle">{card.name}</p>
        </div>
      )}
    </div>
  );
}

export default ImagePopup
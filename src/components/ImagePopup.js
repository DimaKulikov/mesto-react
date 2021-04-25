import { useEffect, useState } from 'react';
import {PopupSpinner} from './PopupSpinner';
import Popup from './Popup'

function ImagePopup(props) {
  const { card, onClose, isOpen } = props

  const [isImageLoading, setIsImageLoading] = useState(true)
  
  useEffect(() => {
    setIsImageLoading(true)
  },[card])

  const imageClassName = `popup__image ${isImageLoading ? 'popup__image_hidden' : ''}`

  return (
    <Popup name="image" {...{isOpen, onClose}}>
      {isImageLoading && <PopupSpinner />}
      <img className={imageClassName} src={card?.link} alt={card?.name} onLoad={() => { setIsImageLoading(false) }} />

      <p className="popup__subtitle">{card?.name}</p>
    </Popup>
  );
}

export default ImagePopup
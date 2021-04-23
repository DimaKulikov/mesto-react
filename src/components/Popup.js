import { useEffect } from 'react'

function Popup(props) {

  const { onClose, isOpen, name } = props
  
  useEffect(() => {
    function closeOnEsc(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeOnEsc);
    }
    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, [isOpen, onClose]);

  function handleClose(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn'))
    onClose()    
  }
  
  const popupClassName = `popup popup_${name} ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={popupClassName} onClick={handleClose}>
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="закрыть"
        ></button>
        {props.children}
      </div>
    </div>
  )
}

export default Popup
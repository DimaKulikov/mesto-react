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

  
  const popupClassName = `popup popup_${name} ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <button
          onClick={onClose}
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
import { useEffect } from 'react'

function Popup(props) {

  const { closeHandler, isOpen, name } = props
  
  useEffect(() => {
    function closeOnEsc(evt) {
      if (evt.key === "Escape") {
        closeHandler();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closeOnEsc);
    }
    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, [isOpen, closeHandler]);

  
  const popupClassName = `popup popup_${name} ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <button
          onClick={closeHandler}
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
import { useEffect, useRef } from "react"
import { validatorOptions } from "../utils/constants";
import FormValidator from "../utils/FormValidator";

function PopupWithForm(props) {
  const { name, title, isOpen, closeHandler, onSubmit } = props;

  const popupClassName = `popup popup_${name} ${isOpen ? "popup_opened" : ""}`;

  useEffect(() => {
    const validator = new FormValidator(validatorOptions, formElement.current)
    validator.enableValidation()
  },[])

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

  const formElement = useRef()

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <button
          onClick={closeHandler}
          className="popup__close-btn"
          type="button"
          aria-label="закрыть"
        ></button>
        <form onSubmit={onSubmit} className="form" name={name} noValidate ref={formElement}>
          <h2 className="form__title">{title}</h2>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm
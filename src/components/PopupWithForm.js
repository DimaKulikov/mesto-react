import { useEffect, useRef } from "react"
import { validatorOptions } from "../utils/constants";
import FormValidator from "../utils/FormValidator";
import Popup from "./Popup";

function PopupWithForm(props) {
  const { name, title, isOpen, onClose, onSubmit } = props;

  useEffect(() => {
    const validator = new FormValidator(validatorOptions, formElement.current)
    validator.enableValidation()
  },[])

  const formElement = useRef()

  return (
    <Popup {...{name, isOpen, onClose}}>
      <form onSubmit={onSubmit} className="form" name={name} noValidate ref={formElement}>
        <h2 className="form__title">{title}</h2>
        {props.children}
      </form>
    </Popup>
  );
}

export default PopupWithForm
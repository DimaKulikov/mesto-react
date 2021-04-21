import React from "react"


function PopupWithForm(props) {
  const { name, title, isOpen, closeHandler } = props;

  React.useEffect(() => {
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

  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={closeHandler}
          className="popup__close-btn"
          type="button"
          aria-label="закрыть"
        ></button>
        <form className="form" name={name} noValidate>
          <h2 className="form__title">{title}</h2>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm
import React from 'react';

import Popup from './Popup';

function PopupWithForm(props) {
  const { name, title, isOpen, onClose, onSubmit } = props;

  return (
    <Popup {...{ name, isOpen, onClose }}>
      <form
        {...{ name, onSubmit }}
        className='form'
        noValidate
      >
        <h2 className='form__title'>{title}</h2>
        {props.children}
      </form>
    </Popup>
  );
}

export default PopupWithForm;

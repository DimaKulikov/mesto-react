import { useState } from 'react'

import PopupWithForm from "./PopupWithForm";

function PlaceRemoveConfirmPopup(props) {
  const { isOpen, onClose, onDeleteConfirm, deletedCard } = props;

  
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    onDeleteConfirm(deletedCard)
      .catch(console.error)
      .finally(() => {
        onClose();
        setIsSubmitting(false)
      })
  }

  return (
    <PopupWithForm
      name='place-remove'
      title='Вы уверены?'
      onSubmit={handleSubmit}
      {...{ isOpen, onClose }}
    >
      
      <button className="form__submit" type="submit">
        {isSubmitting ? 'Удаление...' : 'Да'}
      </button>
    </PopupWithForm>
  );
}

export default PlaceRemoveConfirmPopup;

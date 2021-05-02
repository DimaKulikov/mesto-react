import React from 'react';
import { useRef, useState } from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const avatarLinkInputRef = useRef();

  function handleSubmit(e) {
    setIsSubmitting(true);
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarLinkInputRef.current.value })
      .then(() => {
        onClose();
        avatarLinkInputRef.current.value = '';
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <PopupWithForm
      name='avatar-edit'
      title='Обновить аватар'
      onSubmit={handleSubmit}
      {...{ isOpen, onClose }}
    >
      <input
        ref={avatarLinkInputRef}
        className='form__input'
        type='url'
        id='avatar-link-input'
        name='avatar'
        placeholder='Ссылка на аватар'
        required
        autoComplete='off'
      />
      <span className='form__error avatar-link-input-error'></span>
      <button className='form__submit form__submit_disabled' type='submit'>
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

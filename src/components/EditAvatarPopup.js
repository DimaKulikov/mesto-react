import React from 'react';
import { useRef, useState } from 'react';
import {useFormAndValidation} from '../hooks/useFormAndValidation'

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const avatarLinkInputRef = useRef();

  const { handleChange, errors, isValid, setIsValid } = useFormAndValidation(false)

  function handleSubmit(e) {
    setIsSubmitting(true);
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarLinkInputRef.current.value })
      .then(() => {
        onClose();
        avatarLinkInputRef.current.value = '';
        setIsValid(false)
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
        onChange={(e)=> handleChange(e)}
      />
      <span className={`form__error ${errors.avatar ? 'form__error_active' : ''}`}>{errors.avatar}</span>
      <button className={`form__submit ${isValid ? '' : 'form__submit_disabled'}`} disabled={!isValid} type='submit'>
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

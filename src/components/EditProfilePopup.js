import React from 'react';
import { useContext, useEffect, useState } from 'react';
import {useFormAndValidation} from '../hooks/useFormAndValidation'
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleChange, errors, isValid, resetForm, setIsValid } = useFormAndValidation()

  function handleSubmit(e) {
    setIsSubmitting(true);
    e.preventDefault();
    onUpdateUser({
      name,
      about: about,
    })
      .then(onClose)
      .finally(() => {        
        setIsSubmitting(false);
      });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  useEffect(()=> {
    resetForm()
    setIsValid(true)
  }, [isOpen])

  return (
    <PopupWithForm
      name='profile-edit'
      title='Редактировать профиль'
      onSubmit={handleSubmit}
      {...{ isOpen, onClose }}
    >
      <input
        value={name}
        onChange={(e) => {setName(e.target.value); handleChange(e)}}
        className='form__input'
        id='profile-name-input'
        type='text'
        name='name'
        placeholder='Имя или заголовок'
        required
        autoComplete='off'
        minLength='2'
        maxLength='40'
      />
      <span className={`form__error ${errors.name ? 'form__error_active' : ''}`}>{errors.name}</span>
      <input
        value={about}
        onChange={(e) => {setAbout(e.target.value); handleChange(e)}}
        className='form__input'
        id='profile-subtitle-input'
        type='text'
        name='about'
        placeholder='Описание'
        required
        autoComplete='off'
        minLength='2'
        maxLength='200'
      />
      <span className={`form__error ${errors.about ? 'form__error_active' : ''}`}>{errors.about}</span>
      <button className={`form__submit ${isValid ? '' : 'form__submit_disabled'}`} disabled={!isValid} type='submit'>
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

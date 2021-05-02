import React from 'react';
import { useState, useEffect } from 'react';
import {useFormAndValidation} from '../hooks/useFormAndValidation'

import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleChange, errors, isValid, resetForm, setIsValid } = useFormAndValidation(false)

  function handleSubmit(e) {
    setIsSubmitting(true);
    e.preventDefault();
    onAddPlace({ name, link })
      .then(() => {
        onClose();
        setName('');
        setLink('');
        setIsValid(false)
      })      
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <PopupWithForm
      name='place-add'
      title='Новое место'
      onSubmit={handleSubmit}
      {...{ isOpen, onClose }}
    >
      <input
        value={name}
        onChange={(e) => {setName(e.target.value); handleChange(e)}}
        className='form__input'
        type='text'
        id='place-name-input'
        name='name'
        placeholder='Название'
        required
        autoComplete='off'
        minLength='2'
        maxLength='30'
      />
      <span className={`form__error ${errors.name ? 'form__error_active' : ''}`}>{errors.name}</span>
      <input
        value={link}
        onChange={(e) => {setLink(e.target.value); handleChange(e)}}
        className='form__input'
        type='url'
        id='place-image-input'
        name='link'
        placeholder='Ссылка на картинку'
        required
        autoComplete='off'
      />
      <span className={`form__error ${errors.link ? 'form__error_active' : ''}`}>{errors.link}</span>
      <button className={`form__submit ${isValid ? '' : 'form__submit_disabled'}`} disabled={!isValid} type='submit'>
        {isSubmitting ? 'Сохранение...' : 'Создать'}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

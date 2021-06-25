import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('email@123.com');
  const [password, setPassword] = useState('');

  function submitHandler(e) {
    e.preventDefault();
    onRegister(email, password)
  }

  return (
    <div className='page__section'>
      <form onSubmit={submitHandler} className="form form_login">
        <p className="form__title form__title_login">Регистрация</p>
        <input placeholder='Email' type='email' value={email} onChange={e=>setEmail(e.target.value)}  className='form__input form__input_login'/>
        <input placeholder='Пароль' type='password' value={password} onChange={e=>setPassword(e.target.value)} className='form__input form__input_login'/>
        <button type='submit' className='form__submit form__submit_login'>Зарегистрироваться</button>
        <Link to='/login' className='form__textbutton'>
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  )
}

export default Register
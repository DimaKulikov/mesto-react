import logo from './images/logo.svg'
function App() {
  return (
    <div className="page">
      <header className="header page__header">
        <img
          className="logo"
          src={logo}
          alt="логотип Место"
        />
      </header>
      <main className="page__section">
        <section className="profile">
          <button className="profile__avatar"></button>
          <div className="profile__text-container">
            <div className="profile__name-container">
              <h1 className="profile__name">Имя</h1>
              <button
                className="profile__edit-btn"
                type="button"
                aria-label="редактировать профиль">
              </button>
            </div>
            <p className="profile__subtitle">Описание</p>
          </div>
          <button
            className="profile__add-btn"
            type="button"
            aria-label="Добавить">

          </button>
        </section>
        <section className="cards">
          <div className="cards__spinner"></div>
          <ul className="cards__list"></ul>
        </section>
      </main>
      <footer className="footer page__section">
        <p className="footer__copyright">&copy; 2021 Mesto Russia</p>
      </footer>
      <div className="popup popup_profile-edit">
        <div className="popup__container">
          <button
            className="popup__close-btn"
            type="button"
            aria-label="закрыть">
          </button>
          <form
            className="form"
            name="profileEditForm"
            novalidate
          >
            <h2 className="form__title">Редактировать профиль</h2>
            <input
              className="form__input"
              id="profile-name-input"
              type="text"
              name="name"
              placeholder="Имя или заголовок"
              required
              autocomplete="off"
              minlength="2"
              maxlength="40"
            />
            <span className="form__error profile-name-input-error"></span>
            <input
              className="form__input"
              id="profile-subtitle-input"
              type="text"
              name="about"
              placeholder="Описание"
              required
              autocomplete="off"
              minlength="2"
              maxlength="200"
            />
            <span className="form__error profile-subtitle-input-error"></span>
            <button
              className="form__submit"
              type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>
      <div className="popup popup_place-add">
        <div className="popup__container">
          <button
            className="popup__close-btn"
            type="button"
            aria-label="закрыть">
          </button>
          <form
            className="form"
            name="placeAddForm"
            novalidate>
            <h2 className="form__title">Новое место</h2>
            <input
              className="form__input"
              type="text"
              id="place-name-input"
              name="name"
              placeholder="Название"
              required
              autocomplete="off"
              minlength="2"
              maxlength="30"
            />
            <span className="form__error place-name-input-error"></span>
            <input
              className="form__input"
              type="url"
              id="place-image-input"
              name="link"
              placeholder="Ссылка на картинку"
              required
              autocomplete="off"
            />
            <span className="form__error place-image-input-error"></span>
            <button
              className="form__submit form__submit_disabled"
              type="submit">
              Создать
            </button>
          </form>
        </div>
      </div>
      <div className="popup popup_place-remove">
        <div className="popup__container">
          <button
            className="popup__close-btn"
            type="button"
            aria-label="закрыть">
          </button>
          <form className="form">
            <h2 className="form__title">Вы уверены?</h2>
            <button
              className="form__submit"
              type="submit">
              Да
            </button>
          </form>
        </div>
      </div>
      <div className="popup popup_avatar-edit">
        <div className="popup__container">
          <button
            className="popup__close-btn"
            type="button"
            aria-label="закрыть">
          </button>
          <form
            className="form"
            name="avatarEditForm"
            novalidate
          >
            <h2 className="form__title">Обновить аватар</h2>
            <input
              className="form__input"
              type="url"
              id="avatar-link-input"
              name="avatar"
              placeholder="Ссылка на аватар"
              required
              autocomplete="off"
            />
            <span className="form__error avatar-link-input-error"></span>
            <button
              className="form__submit form__submit_disabled"
              type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>
      <div className="popup popup_image">
        <div className="popup__container">
          <button
            className="popup__close-btn"
            type="button"
            aria-label="закрыть">
          </button>
          <img
            className="popup__image"
            src="<%=require('./images/src-placeholder.gif')%>"
            alt="альт текст"
          />
          <p className="popup__subtitle"></p>
        </div>
      </div>
      <template id="card-template">
        <li className="card">
          <button className="card__remove-btn"></button>
          <img
            className="card__pic"
            src="./images/src-placeholder.gif"
            alt="альт текст"
          />
          <div className="card__caption">
            <h2 className="card__title"></h2>
            <div className="card__like-container">
              <button
                className="card__like-btn"
                type="button"
                aria-label="лайк">
              </button>
              <span className="card__like-count"></span>
            </div>
          </div>
        </li>
      </template>
      <template id="spinner">
        <div className="spinner"><i></i></div>
      </template>
    </div>
  );
}

export default App;

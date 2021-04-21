import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const { cardData, onCardClick, onCardLike } = props;

  const currentUser = useContext(CurrentUserContext);
  
  const isOwn = currentUser._id === cardData.owner._id
  const isLiked = cardData.likes.some(i => i._id === currentUser._id);
  const likeBtnClassName = `card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`

  function handleClick() {
    onCardClick(cardData);
  }

  function handleLikeClick() {
    onCardLike(cardData);
  }

  return (
    <li className="card">
      {isOwn && <button className="card__remove-btn"></button>}
      <img
        className="card__pic"
        src={cardData.link}
        alt={cardData.name}
        onClick={handleClick}
      />
      <div className="card__caption">
        <h2 className="card__title">{cardData.name}</h2>
        <div className="card__like-container">
          <button
            onClick={handleLikeClick}
            className={likeBtnClassName}
            type="button"
            aria-label="лайк"
          ></button>
          <span className="card__like-count">{cardData.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;

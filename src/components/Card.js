import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const [likeProcessing, setLikeProcessing] = useState(false)

  const isOwn = currentUser._id === cardData.owner._id;
  const isLiked = cardData.likes.some((i) => i._id === currentUser._id);
  const likeBtnClassName = `card__like-btn 
    ${isLiked ? "card__like-btn_active" : ""}
    ${likeProcessing ? "card__like-btn_disabled" : ""}
  }`;

  function handleClick() {
    onCardClick(cardData);
  }

  function handleLikeClick() {
    setLikeProcessing(true)
    onCardLike(cardData).then((res) => {
      setLikeProcessing(false)
      console.log(res)
    });
  }

  function handleDeleteClick() {
    onCardDelete(cardData);
  }

  return (
    <li className="card">
      {isOwn && (
        (
          <button
            className="card__remove-btn"
            onClick={handleDeleteClick}        
        ></button>
      )
      )}
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
            onClick={likeProcessing ? null : handleLikeClick}
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

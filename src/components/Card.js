import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardLikeSpinner from "./CardLikeSpinner";
import CardRemoveSpinner from "./CardRemoveSpinner";

function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const [likeProcessing, setLikeProcessing] = useState(false)
  const [deleteProcessing, setDeleteProcessing] = useState(false)

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
    onCardLike(cardData)
      .catch(console.log)
      .finally(() => {
        setLikeProcessing(false)
      });
  }

  function handleDeleteClick() {
    setDeleteProcessing(true)
    onCardDelete(cardData)
      .catch(console.log)
      .finally(() => {
        setDeleteProcessing(false)
      });
  }

  const cardClassName = `card ${deleteProcessing ? 'card_faded' : ''}`
  return (
    <li className={cardClassName}>
      {isOwn && (
        deleteProcessing
        ? <CardRemoveSpinner />
        : <button
            className="card__remove-btn"
            onClick={handleDeleteClick}
          ></button>)
      }
      <img
        className="card__pic"
        src={cardData.link}
        alt={cardData.name}
        onClick={handleClick}
      />
      <div className="card__caption">
        <h2 className="card__title">{cardData.name}</h2>
        <div className="card__like-container">
          {
            likeProcessing
            ? <CardLikeSpinner/>
            : <button
              onClick={handleLikeClick}
              className={likeBtnClassName}
              type="button"
              aria-label="лайк"
            ></button>
          }
          
          
          <span className="card__like-count">{cardData.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;

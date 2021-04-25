import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import {CardLikeSpinner} from "./CardLikeSpinner";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // const [likeProcessing, setLikeProcessing] = useState(false)

  const isOwn = currentUser._id === card.owner._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const likeBtnClassName = `card__like-btn 
    ${isLiked ? "card__like-btn_active" : ""}
    ${/*likeProcessing ? "card__like-btn_disabled" : */""}
  }`;

  function handleImageClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    // setLikeProcessing(true)
    onCardLike(card)
      .catch(console.error)
      .finally(() => {
        // setLikeProcessing(false)
      });
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className='card'>
      {isOwn && (
        <button
          className="card__remove-btn"
          onClick={handleDeleteClick}
        ></button>)
      }
      <img
        className="card__pic"
        src={card.link}
        alt={card.name}
        onClick={handleImageClick}
      />
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          {
            // likeProcessing ? <CardLikeSpinner/> : 
            <button
              onClick={handleLikeClick}
              className={likeBtnClassName}
              type="button"
              aria-label="лайк"
            ></button>
          }
          
          
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;

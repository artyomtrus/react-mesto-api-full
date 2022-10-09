import React from "react";
import trash from "../images/Trash.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "element__del_active" : "element__del"
  }`;

  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `${
    isLiked ? "element__like_active" : "element__like"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }

  return (
    <li className="element">
      <div
        style={{ backgroundImage: `url(${props.card.link})` }}
        className="element__image"
        onClick={handleClick}
      ></div>
      <img
        src={trash}
        alt="Удалить"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="element__footer">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-area">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="лайк"
            onClick={handleLikeClick}
          />
          <span className="element__like-number">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card;

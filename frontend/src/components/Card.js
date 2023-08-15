import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(card) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  function handleClick() {
    card.onCardClick(card);
  }

  function handleLikeClick() {
    card.onCardLike(card);
  }

  function handleDeleteClick() {
    card.onDeleteCard(card);
  }

  return (
    <li className="card">
      <article className="card__figure">
        <img
          className="card__photo"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <div className="card__caption">
          <h2 className="card__text">{card.name}</h2>
          <div className="card__likes-container">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}
            />
            <span className="card__count">{card.likes.length}</span>
          </div>
        </div>
        {isOwn && (
          <button
            className="card__trash"
            type="button"
            onClick={handleDeleteClick}
          />
        )}
      </article>
    </li>
  );
}

export default Card;

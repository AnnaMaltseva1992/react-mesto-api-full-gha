import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const name = currentUser.name;
  const description = currentUser.about;
  const avatar = currentUser.avatar;

  return (
    <main>
      <section className="profile">
        <button
          onClick={props.onEditAvatar}
          className="profile__avatar-button"
          type="button"
        ></button>
        <img className="profile__avatar" src={avatar} alt="Аватар" />
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{name}</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__edit-button"
              type="button"
            ></button>
          </div>
          <p className="profile__subtitle">{description}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          type="button"
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {props.cards.map((card) => (
            <Card
              card={card}
              _id={card._id}
              owner={card.owner}
              key={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onDeleteCard={props.onDeleteCard}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

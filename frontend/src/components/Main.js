import React from "react";

import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          <button
            className="profile__button-avatar"
            type="button"
            onClick={props.onEditAvatar}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button opacity"
            type="button"
            aria-label="редактирование профиля"
            onClick={props.onEditProfile}
          />
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button opacity"
          type="button"
          aria-label="добавление контента"
          onClick={props.onAddPlace}
        />
      </section>

      <section>
        <ul className="elements">
          {props.cards.map((item) => (
            <Card
              card={item}
              key={item._id}
              onCardClick={props.onCardClick}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

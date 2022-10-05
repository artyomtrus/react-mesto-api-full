import React from "react";
import LoginTrue from "../images/LoginUnionTrue.svg";
import LoginFalse from "../images/LoginUnionFalse.svg";

function InfoTooltip(props) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div
      onClick={handleOverlayClick}
      className={`popup ${props.isOpen && "popup_is-active"}`}
    >
      <div className="popup__container">
        <button
          className={`popup__close opacity`}
          type="button"
          aria-label="закрыть"
          onClick={props.onClose}
        />
        <img
          src={props.isRegOk ? LoginTrue : LoginFalse}
          alt={`${props.isRegOk ? `Успешно зарегистрирован` : `Что-то не так`}`}
          className="popup__union"
        />
        <h3 className="popup__title-reg">{props.regPopupText}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;

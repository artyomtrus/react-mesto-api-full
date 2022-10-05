import React from "react";

function PopupWithForm(props) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  }
  return (
    <div
      onClick={handleOverlayClick}
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_is-active"
      }`}
    >
      <div className="popup__container">
        <button
          className={`popup__close popup__close_type_${props.name} opacity`}
          type="button"
          aria-label="закрыть"
          onClick={props.onClose}
        />
        <h3 className="popup__title">{props.title}</h3>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={`${props.name}Form`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className={`popup__button popup__button_type_${props.name}`}
            type="submit"
            aria-label={`${props.buttonText}`}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

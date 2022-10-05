function ImagePopup(props) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  }
  return (
    <div
      onClick={handleOverlayClick}
      className={`popup popup_type_image ${
        props.card ? "popup_is-active" : ""
      }`}
    >
      <div className="popup__container-image">
        <button
          className="popup__close popup__close_type_image opacity"
          type="button"
          aria-label="закрыть"
          onClick={props.onClose}
        />
        <img
          src={props.card?.link}
          alt={`Изображение ${props.card?.name}`}
          className="popup__image"
        />
        <h2 className="popup__title-image">{props.card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;

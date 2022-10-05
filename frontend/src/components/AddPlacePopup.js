import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [useName, setUseName] = React.useState("");
  const [useLink, setUseLink] = React.useState("");

  function handleChangeName(e) {
    setUseName(e.target.value);
  }

  function handleChangeLink(e) {
    setUseLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name: useName,
      link: useLink,
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setUseName("");
      setUseLink("");
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText={props.isLoading ? "Сохранение..." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="add-name-input"
        type="text"
        name="popupAddName"
        className="popup__name popup__name_type_add popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={useName || ""}
        onChange={handleChangeName}
        required
      />
      <span className="popup__error add-name-input-error"></span>
      <input
        id="url-input"
        type="url"
        name="popupAddLink"
        className="popup__link popup__link_type_add popup__input"
        placeholder="Ссылка на картинку"
        value={useLink || ""}
        onChange={handleChangeLink}
        required
      />
      <span className=" popup__error url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

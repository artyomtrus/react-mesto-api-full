import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        type="text"
        name="name"
        className="popup__name popup__input popup__name_type_edit"
        placeholder="Имя"
        value={name || ""}
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
        required
      />
      <span className="popup__error name-input-error"></span>
      <input
        id="profession-input"
        type="text"
        name="about"
        className="popup__profession popup__input popup__profession_type_edit"
        placeholder="О себе"
        value={description || ""}
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription}
        required
      />
      <span className="popup__error profession-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

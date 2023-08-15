import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

  function handlePlaceChange(evt) {
    setPlace(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      place,
      link,
    });
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__form-section">
        <input
          className="popup__field popup__field_input_place"
          type="text"
          name="place"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={place}
          onChange={handlePlaceChange}
        />
        <span className="popup__input-error"></span>
      </section>
      <section className="popup__form-section">
        <input
          className="popup__field popup__field_input_link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleLinkChange}
          value={link}
        />
        <span className="popup__input-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

import React from "react";
import PopupWithForm from "./PopupWithForm.js";


function EditAvatarPopup(props) {
  const avatarRef = React.useRef(null);

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="new-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
        <section className="popup__form-section">
          <input
            className="popup__field popup__field_input_link"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
            ref={avatarRef}
          />
          <span className="popup__input-error"></span>
        </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

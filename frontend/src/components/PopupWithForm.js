import React from "react";

function PopupWithForm(props) {
  const popupSelector = `popup popup_type_${props.name}`;

  return (
    <section
      className={props.isOpen ? popupSelector + " popup_opened" : popupSelector}
    >
      <div className="popup__container">
        <h2 className="popup__heading">{props.title}</h2>
        <form
          className="popup__form popup__form_type_edit"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__submit-button" type="submit">
            {props.buttonText}
          </button>
        </form>
        <button
          onClick={props.onClose}
          className="popup__close"
          type="button"
          name="close"
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;

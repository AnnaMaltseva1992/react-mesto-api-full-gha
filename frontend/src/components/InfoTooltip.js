import checkMark from "../images/check_mark.png";
import failIcon from "../images/fail_icon.png";
import React from "react";

function InfoToolTip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        {props.isSuccess ? (
          <>
            <img
              src={checkMark}
              alt="Регистрация прошла успешно."
              className="popup__tooltip-image"
            />
            <p className="popup__tooltip-text">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <img
              src={failIcon}
              alt="Ошибка регистрации."
              className="popup__tooltip-image"
            /> 
            <p className="popup__tooltip-text">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;

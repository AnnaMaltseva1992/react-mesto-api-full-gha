import React from "react";

function ImagePopup({card, onClose}) {
    return(
        <section className={`popup popup_type_image ${card?"popup_opened":""}`} > 
          <article className="popup__figure">
          <img
            className="popup__image"
            src={card ? card.link : ''} 
            alt={card ? card.name : ''}
          />
            <p className="popup__caption">{card ? card.name : ''}</p>
            <button
              className="popup__close"
              type="button"
              name="close"
              onClick={onClose}
            ></button>
          </article>
        </section>
    );
}

export default ImagePopup;

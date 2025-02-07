import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./InfoModalStyle.module.css";

function InfoModal({ ingredient, onClose }) {
    if (!ingredient) return null; // Если ингредиент не выбран, не рендерим модалку

    return ReactDOM.createPortal(
        <div className={style.bgBlure}>
            <div className={`${style.container} p-10 pb-15`}>
                <div className={`${style.closePopup}`}>
                    <h2 className="text text_type_main-large">Детали ингредиента</h2>
                    <CloseIcon type="primary" onClick={onClose} />
                </div>
                <div>
                    <img src={ingredient.image_large} alt={ingredient.name}  />
                    <p className="text text_type_main-medium pb-2 pt-15">{ingredient.name}</p>
                    <div className={`${style.infoIngr}  text text_type_main-default text_color_inactive pt-4 pb-8`}>
                        <div>
                            <p>Калории, ккал</p>
                            <p className="text text_type_digits-default">{ingredient.calories}</p>
                        </div>
                        <div>
                            <p>Белки, г</p>
                            <p className="text text_type_digits-default">{ingredient.proteins}</p>
                        </div>
                        <div>
                            <p>Жиры, г</p>
                            <p className="text text_type_digits-default">{ingredient.fat}</p>
                        </div>
                        <div>
                            <p>Углеводы, г</p>
                            <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default React.memo(InfoModal);
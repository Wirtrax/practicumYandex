import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./OrderDetailsStyle.module.css";
import done from "./done.png";

function OrderDetails({ onClose }) {
    return ReactDOM.createPortal(
        <div className={style.bgBlure}>
            <div className={`${style.container} p-30`}>
                <div className={`pr-10 pt-15 ${style.closePopup}`}>
                    <CloseIcon type="primary" onClick={onClose} />
                </div>
                <div>
                    <p className="text text_type_digits-large pb-8">034536</p>
                    <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
                    <img src={done} alt="done" />
                    <p className="text text_type_main-default pb-2 pt-15">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default React.memo(OrderDetails);

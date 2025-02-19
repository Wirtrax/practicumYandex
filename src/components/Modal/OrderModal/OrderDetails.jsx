import React from "react";

import style from "./OrderDetailsStyle.module.css";
import done from "./done.png";

function OrderDetails() {
    return (
            <div className={`${style.container} p-30`}>
                <p className="text text_type_digits-large pb-8">034536</p>
                <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
                <img src={done} alt="done" />
                <p className="text text_type_main-default pb-2 pt-15">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
    );
}

export default OrderDetails;


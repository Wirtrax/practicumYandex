import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../Modal/OrderModal/OrderDetails.jsx";
import InfoModal from "../Modal/InfoModal/InfoModal.jsx";
import style from "./BurgerConstructor.module.css";

function BurgerConstructor() {
    const URL = "https://norma.nomoreparties.space/api/ingredients";

    const [ingredients, setIngredients] = useState([]);
    const [bun, setBun] = useState(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    useEffect(() => {
        fetch(URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status === 404 ? "Меню не найдено" : "Что-то пошло не так :(");
                }
                return response.json();
            })
            .then((data) => {
                const buns = data.data.filter((item) => item.name.includes("Краторная булка N-200i"));
                if (buns.length > 0) {
                    setBun(buns[0]);
                }
                setIngredients(data.data);
            })
            .catch((error) => console.log("Error fetching ingredients:", error.message));
    }, []);

    const totalPrice = useMemo(() => ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0), [ingredients]);

    const openOrderModal = useCallback(() => {
        setIsOrderModalOpen(true);
    }, []);

    const closeOrderModal = useCallback(() => {
        setIsOrderModalOpen(false);
    }, []);

    const handleIngredientClick = useCallback((ingredient) => {
        setSelectedIngredient(ingredient);
    }, []);

    const closeInfoModal = useCallback(() => {
        setSelectedIngredient(null);
    }, []);

    return (
        <>
            <section className={`${style.container} pt-25 pl-4 pr-4`}>
                {bun ? (
                    <div className="pb-4 pr-4">
                        <ConstructorElement
                        type="top" 
                        isLocked={true}
                        text={bun.name + " (верх)"} 
                        price={bun.price} 
                        thumbnail={bun.image} />
                    </div>
                ) : (
                    <p>Загрузка данных...</p>
                )}
                <div className={style.scrollBar}>
                    {ingredients.map((ingredient) => (
                        <div className={`${style.dndItem} pb-4`} key={ingredient._id} onClick={() => handleIngredientClick(ingredient)}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image} />
                        </div>
                    ))}
                </div>
                <div className="pr-4">
                    {bun ? (
                        <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + " (низ)"}
                        price={bun.price} thumbnail={bun.image} />
                    ) : (
                        <p>Загрузка данных...</p>
                    )}
                </div>
                <div className="pt-10">
                    <span className="text text_type_digits-medium pr-10">
                        {totalPrice} <CurrencyIcon type="primary" />
                    </span>
                    <Button htmlType="button" type="primary" size="large" onClick={openOrderModal}>
                        Оформить заказ
                    </Button>
                </div>
            </section>


            {isOrderModalOpen && <OrderDetails onClose={closeOrderModal} />}

            {selectedIngredient && <InfoModal ingredient={selectedIngredient} onClose={closeInfoModal} />}
        </>
    );
}

export default React.memo(BurgerConstructor);

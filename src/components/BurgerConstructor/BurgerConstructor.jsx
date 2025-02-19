import React, { useMemo } from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./BurgerConstructor.module.css";

function BurgerConstructor({ bun, ingredients, onOrderClick }) {
    const totalPrice = useMemo(() => ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0), [ingredients]);

    return (
        <section className={`${style.container} pt-25 pl-4 pr-4`}>
            {bun && (
                <div className="pb-4 pr-4">
                    <ConstructorElement type="top"
                        isLocked text={`${bun.name}
                      (верх)`} price={bun.price}
                        thumbnail={bun.image} />
                </div>
            )}

            <div className={style.scrollBar}>
                {ingredients
                    .filter((ingredient) => ingredient.type !== "bun")
                    .map((ingredient) => (
                        <div className={`${style.dndItem} pb-4`} key={ingredient._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image} />
                        </div>
                    ))}
            </div>

            {bun && (
                <div className="pr-4">
                    <ConstructorElement type="bottom"
                        isLocked text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image} />
                </div>
            )}

            <div className="pt-10">
                <span className="text text_type_digits-medium pr-10">
                    {totalPrice} <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={onOrderClick}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default React.memo(BurgerConstructor);

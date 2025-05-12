import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './OneOrder.module.css';
import { Ingredient } from '../../../types/ingredient';

interface OnceIngProps {
    ingredient: Ingredient | undefined;
    count: number;
}

const OnceIng: FC<OnceIngProps> = ({ ingredient, count }) => {
    if (!ingredient) {
        return (
            <div className={style.ingridientGroup}>
                <div className={style.ingridient}>
                    <span className="text text_type_main-default">Ингредиент не найден</span>
                </div>
            </div>
        );
    }

    return (
        <div className={style.ingridientGroup}>
            <div className={style.ingridient}>
                <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className={style.ingredientImage}
                />
                <span className="text text_type_main-default">{ingredient.name}</span>
            </div>
            <span className="text text_type_digits-default">
                {count} x {ingredient.price} <CurrencyIcon type="primary" />
            </span>
        </div>
    );
};

export default OnceIng;
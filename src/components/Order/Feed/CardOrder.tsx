import { FC } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './OrderFeedStyle.module.css';
import Food from './Food';
import { Order } from '../../../types/order';
import { Ingredient } from '../../../types/ingredient';

interface CardOrderProps {
    order: Order;
    ingredientsMap: Record<string, Ingredient>;
    onClick?: (order: Order) => void;
}

const CardOrder: FC<CardOrderProps> = ({ order, ingredientsMap, onClick }) => {
    if (!order || !ingredientsMap) return null;

    const { number, createdAt, name, status, ingredients = [] } = order;

    const price = ingredients.reduce((sum, id) => {
        return sum + (ingredientsMap[id]?.price || 0);
    }, 0);

    const displayIngredients: string[] = [];
    const uniqueIds = new Set<string>();

    ingredients.forEach(id => {
        if (!uniqueIds.has(id) && displayIngredients.length < 6) {
            uniqueIds.add(id);
            displayIngredients.push(id);
        }
    });

    const remaining = Math.max(0, ingredients.length - displayIngredients.length);

    return (
        <div
            className={style.cardContainer}
            onClick={() => onClick?.(order)}
            style={{ cursor: 'pointer' }}
        >
            <div className={style.serviceInformationAtO}>
                <span className="text text_type_digits-default">#{number}</span>
                <span className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(createdAt)} />
                </span>
            </div>
            <h3 className="text text_type_main-medium">{name}</h3>
            {status && (
                <p className="text text_type_main-default" style={{ color: status === 'done' ? '#00CCCC' : 'white' }}>
                    {status === 'done' ? 'Выполнен' : 'В работе'}
                </p>
            )}
            <div className={style.ItemAPrice}>
                <div className={style.imgIngridientInFeedGroupWBun}>
                    <div className={style.imgIngridientInFeedBun}>
                        {displayIngredients[0] && (
                            <Food
                                imgUrl={ingredientsMap[displayIngredients[0]]?.image || ''}
                            />
                        )}
                    </div>
                    <div className={style.imgIngridientInFeedGroup}>
                        {displayIngredients.slice(1).map((id, index) => {
                            const isLast = index === displayIngredients.length - 2;
                            return (
                                <Food
                                    key={id}
                                    imgUrl={ingredientsMap[id]?.image || ''}
                                    plus={isLast && remaining > 0 ? remaining : undefined}
                                />
                            );
                        })}
                    </div>
                </div>
                <p className="text text_type_digits-default">
                    {price} <CurrencyIcon type="primary" />
                </p>
            </div>
        </div>
    );
};

export default CardOrder;
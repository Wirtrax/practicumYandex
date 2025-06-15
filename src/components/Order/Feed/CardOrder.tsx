import { FC, useEffect, useState } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './OrderFeedStyle.module.css';
import Food from './Food';
import { Order } from '../../../types/order';
import { Ingredient } from '../../../types/ingredient';

interface CardOrderProps {
    order: Order;
    ingredientsMap: Record<string, Ingredient>;
    onClick?: (order: Order) => void;
    alwaysShowStatus?: boolean;
}

const CardOrder: FC<CardOrderProps> = ({ order, ingredientsMap, onClick, alwaysShowStatus }) => {
    const [showStatus, setShowStatus] = useState(false)
    const [maxIngredients, setMaxIngredients] = useState(6)
    useEffect(() => {
        const handleResize = () => {
            const windowInnerWidth = document.documentElement.clientWidth
            setShowStatus(windowInnerWidth <= 750)
            setMaxIngredients(windowInnerWidth <= 750 ? 3 : 6)
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    if (!order || !ingredientsMap) return null;

    const { status, number, createdAt, name, ingredients = [] } = order;

    const price = ingredients.reduce((sum, id) => {
        return sum + (ingredientsMap[id]?.price || 0);
    }, 0);

    const displayIngredients: string[] = [];
    const uniqueIds = new Set<string>();

    ingredients.forEach(id => {
        if (!uniqueIds.has(id) && displayIngredients.length < maxIngredients) {
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
            {(alwaysShowStatus || showStatus) && status && (
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
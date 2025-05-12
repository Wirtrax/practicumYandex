import { FC } from 'react';
import style from './OrderFeedStyle.module.css';
import { Order } from '../../../types/order';

interface OrdersInformationProps {
    orders: Order[];
    total: number;
    totalToday: number;
}

const OrdersInformation: FC<OrdersInformationProps> = ({ orders, total, totalToday }) => {
    const completedOrders = orders.filter(order => order.status === 'done');
    const inProgressOrders = orders.filter(order => order.status !== 'done');

    const lastCompleted = completedOrders.slice(0, 20).map(order => order.number);
    const lastInProgress = inProgressOrders.slice(0, 20).map(order => order.number);

    return (
        <div className={style.ordersInformationContainer}>
            <div className={style.orderNumberContainer}>
                <div className={style.completed}>
                    <h3 className="text text_type_main-medium">Готовы:</h3>
                    <div>
                        {lastCompleted.map((number, index) => (
                            <p key={index} className="text text_type_digits-default">{number}</p>
                        ))}
                    </div>
                </div>
                <div className={style.inProcess}>
                    <h3 className="text text_type_main-medium">В работе:</h3>
                    <div>
                        {lastInProgress.map((number, index) => (
                            <p key={index} className="text text_type_digits-default">{number}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <h4 className="text text_type_main-medium">Выполнено за все время:</h4>
                <p className="text text_type_digits-large">{total}</p>
            </div>
            <div>
                <h4 className="text text_type_main-medium">Выполнено за сегодня:</h4>
                <p className="text text_type_digits-large">{totalToday}</p>
            </div>
        </div>
    );
};

export default OrdersInformation;
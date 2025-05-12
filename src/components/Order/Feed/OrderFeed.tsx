import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardOrder from './CardOrder';
import style from './OrderFeedStyle.module.css';
import OrdersInformation from './OrdersInformation';
import { connectFeed } from '../../../services/actions/orderFeedActions';
import Loader from '../../Loader/Loader';
import { Order } from '../../../types/order';
import {RootState} from '../../../types/store'

const OrderFeed: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        orders = [],
        total = 0,
        totalToday = 0,
        ingredientsMap = {},
        wsConnected
    } = useSelector((state: RootState) => state.ws);

    useEffect(() => {
        dispatch(connectFeed());
        return () => {
          
        };
    }, [dispatch]);

    const handleOrderClick = (order: Order) => {
        navigate(`/feed/${order.number}`, {
            state: {
                modal: true,
                background: {
                    pathname: location.pathname,
                    search: location.search,
                    hash: location.hash
                },
                orderData: order
            }
        });
    };

    if (!wsConnected) {
        return <Loader />;
    }

    return (
        <section className={style.container}>
            <h1 className="text text_type_main-large pb-4">Лента заказов</h1>
            <div className={style.feed}>
                <div>
                    <div className={style.orderFeed}>
                        {orders.map(order => (
                            <CardOrder
                                key={order._id || order.number}
                                order={order}
                                ingredientsMap={ingredientsMap}
                                onClick={handleOrderClick}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <OrdersInformation
                        orders={orders}
                        total={total}
                        totalToday={totalToday}
                    />
                </div>
            </div>
        </section>
    );
};

export default OrderFeed;
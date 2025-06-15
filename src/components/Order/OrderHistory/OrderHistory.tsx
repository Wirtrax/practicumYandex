import { FC, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from '../../Profile/SideBar';
import CardOrder from '../Feed/CardOrder';
import style from "./OrderHistory.module.css";
import { connectUserOrders } from '../../../services/actions/userOrdersActions';
import Loader from '../../Loader/Loader';
import { Order } from '../../../types/order';
import { RootState } from '../../../types/store';
import { Ingredient } from '../../../types/ingredient';
import { useAppDispatch, useAppSelector } from '../../../types/hooks';

const OrderHistory: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { orders = [], wsConnected } = useAppSelector((state: RootState) => state.userOrders);
    const ingredients = useAppSelector((state: RootState) => state.ingredients.ingredients);

    const ingredientsMap = useMemo(() => {
        return ingredients.reduce((acc: Record<string, Ingredient>, item) => {
            acc[item._id] = item;
            return acc;
        }, {});
    }, [ingredients]);

    const sortedOrders = useMemo(() => {
        return [...orders].sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [orders]);

    useEffect(() => {
        dispatch(connectUserOrders());
        return () => {
        };
    }, [dispatch]);

    const handleOrderClick = useMemo(() => (order: Order) => {
        navigate(`/profile/orders/${order.number}`, {
            state: {
                modal: true,
                background: location,
                orderData: order
            }
        });
    }, [navigate, location]);

    if (!wsConnected) {
        return <Loader />;
    }

    return (
        <div className={style.orderHistoryContainer}>
            <SideBar info='В этом разделе вы можете просмотреть свою историю заказов' />
            <div className={style.historyFeed}>
                {sortedOrders.map(order => (
                    <CardOrder
                        key={order._id}
                        order={order}
                        alwaysShowStatus={true}
                        ingredientsMap={ingredientsMap}
                        onClick={handleOrderClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
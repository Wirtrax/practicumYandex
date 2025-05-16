import { FC, useEffect } from 'react';
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
    const ingredientsMap = useAppSelector((state: RootState) =>
        state.ingredients.ingredients.reduce((acc: Record<string, Ingredient>, item) => {
            acc[item._id] = item;
            return acc;
        }, {}));

    const sortedOrders = [...orders].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    useEffect(() => {
        dispatch(connectUserOrders());
        return () => {
        };
    }, [dispatch]);

    const handleOrderClick = (order: Order) => {
        navigate(`/profile/orders/${order.number}`, {
            state: {
                modal: true,
                background: location,
                orderData: order
            }
        });
    };

    if (!wsConnected) {
        return <Loader />;
    }

    return (
        <div className={style.orderHistoryContainer}>
            <SideBar />
            <div className={style.historyFeed}>
                {sortedOrders.map(order => (
                    <CardOrder
                        key={order._id}
                        order={order}
                        ingredientsMap={ingredientsMap}
                        onClick={handleOrderClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
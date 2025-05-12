import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCurrentOrder } from '../../../services/actions/orderDetailsActions';
import OneOrder from './OneOrder';

const OrderDetailsPage: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearCurrentOrder());
        };
    }, [dispatch]);

    return (
        <div>
            <OneOrder />
        </div>
    );
};

export default OrderDetailsPage;
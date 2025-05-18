import { FC, useEffect } from 'react';
import { clearCurrentOrder } from '../../../services/actions/orderDetailsActions';
import OneOrder from './OneOrder';
import { useAppDispatch } from '../../../types/hooks';

const OrderDetailsPage: FC = () => {
    const dispatch = useAppDispatch();

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
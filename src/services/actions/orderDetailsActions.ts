import { getOrder } from '../api';
import { Order } from '../../types/order';
import { AppThunk } from '../../types/store';

export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
export const CLEAR_CURRENT_ORDER = 'CLEAR_CURRENT_ORDER';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const getOrderDetails = (orderId: number): AppThunk => async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });
    try {
        const res = await getOrder(orderId);
        if (res.success && res.orders.length > 0) {
            dispatch({
                type: GET_ORDER_SUCCESS,
                payload: res.orders[0]
            });
        } else {
            dispatch({
                type: GET_ORDER_FAILED,
                payload: 'Заказ не найден'
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ORDER_FAILED,
            payload: error instanceof Error ? error.message : 'Неизвестная ошибка'
        });
    }
};

export const setCurrentOrder = (order: Order) => ({
    type: SET_CURRENT_ORDER,
    payload: order
});

export const clearCurrentOrder = () => ({
    type: CLEAR_CURRENT_ORDER
});
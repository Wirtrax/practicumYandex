import { createOrder } from '../api';
import {
    CreateOrderRequestAction,
    CreateOrderSuccessAction,
    CreateOrderFailureAction
} from '../../types/actions';
import { getCookie } from '../utils/cookies'

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

export const createOrderAction = (ingredients: string[]) => async (dispatch: (action:
    CreateOrderRequestAction |
    CreateOrderSuccessAction |
    CreateOrderFailureAction
) => void) => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
        throw new Error('Необходимо авторизоваться');
    }
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const data = await createOrder(ingredients, accessToken);
        if (!data.success || !data.order?.number) {
            throw new Error('Не удалось создать заказ');
        }
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order.number });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error instanceof Error ? error.message : 'Unknown error'
        });
        throw error;
    }
};
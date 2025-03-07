import { createOrder } from '../api';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

export const createOrderAction = (ingredients) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const data = await createOrder(ingredients);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order.number });
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    }
};
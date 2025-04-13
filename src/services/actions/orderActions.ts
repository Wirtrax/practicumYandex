import { createOrder } from '../api';
import { 
    CreateOrderRequestAction,
    CreateOrderSuccessAction,
    CreateOrderFailureAction
} from '../../types/actions';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

export const createOrderAction = (ingredients: string[]) => async (dispatch: (action: 
    CreateOrderRequestAction | 
    CreateOrderSuccessAction | 
    CreateOrderFailureAction
) => void) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const data = await createOrder(ingredients);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order.number });
    } catch (error) {
        dispatch({ 
            type: CREATE_ORDER_FAILURE, 
            payload: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
};
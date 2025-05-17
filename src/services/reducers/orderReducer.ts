import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
} from '../actions/orderActions';
import { OrderState } from '../../types/store';
import {
    CreateOrderRequestAction,
    CreateOrderSuccessAction,
    CreateOrderFailureAction
} from '../../types/actions';

export const initialState: OrderState = {
    orderNumber: null,
    loading: false,
    error: null,
};

const orderReducer = (state = initialState, action:
    CreateOrderRequestAction |
    CreateOrderSuccessAction |
    CreateOrderFailureAction
): OrderState => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { ...state, loading: true };
        case CREATE_ORDER_SUCCESS:
            return { ...state, loading: false, orderNumber: action.payload };
        case CREATE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default orderReducer;
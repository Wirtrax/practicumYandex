import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    SET_CURRENT_ORDER,
    CLEAR_CURRENT_ORDER
} from '../actions/orderDetailsActions';
import { Order } from '../../types/order';
import { OrderDetailsState } from '../../types/store';

export const initialState: OrderDetailsState = {
    currentOrder: null,
    isLoading: false,
    error: null
};

export const orderDetailsReducer = (state = initialState, action: {
    type: string;
    payload?: Order | string;
}): OrderDetailsState => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                currentOrder: action.payload as Order,
                isLoading: false,
                error: null
            };
        case GET_ORDER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload as string
            };
        case SET_CURRENT_ORDER:
            return {
                ...state,
                currentOrder: action.payload as Order
            };
        case CLEAR_CURRENT_ORDER:
            return {
                ...state,
                currentOrder: null,
                isLoading: false,
                error: null
            };
        default:
            return state;
    }
};
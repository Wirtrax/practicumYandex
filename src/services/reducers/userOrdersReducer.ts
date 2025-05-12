import {
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_GET_USER_ORDERS
} from '../actions/userOrdersActions';
import { Order } from '../../types/order';
import { WSUserOrdersState } from '../../types/store';

const initialState: WSUserOrdersState = {
    wsConnected: false,
    orders: [],
    error: null
};

export const userOrdersReducer = (state = initialState, action: {
    type: string;
    payload?: { orders?: Order[] } | string;
}): WSUserOrdersState => {
    switch (action.type) {
        case WS_USER_ORDERS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: null,
                wsConnected: true
            };
        case WS_USER_ORDERS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload as string,
                wsConnected: false
            };
        case WS_USER_ORDERS_CONNECTION_CLOSED:
            return {
                ...state,
                error: null,
                wsConnected: false
            };
        case WS_GET_USER_ORDERS:
            return {
                ...state,
                error: null,
                orders: (action.payload as { orders?: Order[] })?.orders || []
            };
        default:
            return state;
    }
};
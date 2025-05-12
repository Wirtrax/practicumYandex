import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/wsActions';
import { Order } from '../../types/order';
import { Ingredient } from '../../types/ingredient';
import { WSState } from '../../types/store';

const initialState: WSState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    ingredientsMap: {},
    error: null
};

export const wsReducer = (
    state = initialState,
    action: {
        type: string;
        payload?: {
            orders?: Order[];
            total?: number;
            totalToday?: number;
            ingredientsMap?: Record<string, Ingredient>;
        } | string;
    }
): WSState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: null,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload as string,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: null,
                wsConnected: false
            };

        case WS_GET_MESSAGE:
            const payload = action.payload as {
                orders: Order[];
                total: number;
                totalToday: number;
                ingredientsMap: Record<string, Ingredient>;
            };
            return {
                ...state,
                error: null,
                orders: payload.orders,
                total: payload.total,
                totalToday: payload.totalToday,
                ingredientsMap: payload.ingredientsMap
            };

        default:
            return state;
    }
};
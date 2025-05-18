import { userOrdersReducer } from './userOrdersReducer';
import { initialState } from './userOrdersReducer';
import {
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_GET_USER_ORDERS
} from '../actions/userOrdersActions';
import { Order } from '../../types/order';

describe('userOrders reducer', () => {

    const orders:Order[] = [{
        _id: '1',
        number: 1,
        ingredients: ['60d3b41abdacab0026a733c6'],
        status: 'done',
        name: 'Order 1',
        createdAt: '2021-06-23T14:43:22.587Z',
        updatedAt: '2021-06-23T14:43:22.587Z'
    }, {
        _id: '2',
        number: 2,
        ingredients: ['60d3b41abdacab0026a733c7'],
        status: 'pending',
        name: 'Order 2',
        createdAt: '2021-06-23T15:43:22.587Z',
        updatedAt: '2021-06-23T15:43:22.587Z'
    }];

    it('should return the initial state', () => {
        expect(userOrdersReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState);
    });

    it('should handle WS_USER_ORDERS_CONNECTION_SUCCESS', () => {
        expect(userOrdersReducer(initialState, {
            type: WS_USER_ORDERS_CONNECTION_SUCCESS,
        })).toEqual({
            ...initialState,
            wsConnected: true,
        });
    });

    it('should handle WS_USER_ORDERS_CONNECTION_ERROR', () => {
        const error = 'Connection error';
        expect(userOrdersReducer(initialState, {
            type: WS_USER_ORDERS_CONNECTION_ERROR,
            payload: error,
        })).toEqual({
            ...initialState,
            error,
            wsConnected: false,
        });
    });

    it('should handle WS_USER_ORDERS_CONNECTION_CLOSED', () => {
        expect(userOrdersReducer(initialState, {
            type: WS_USER_ORDERS_CONNECTION_CLOSED,
        })).toEqual({
            ...initialState,
            wsConnected: false,
        });
    });

    it('should handle WS_GET_USER_ORDERS', () => {
        expect(userOrdersReducer(initialState, {
            type: WS_GET_USER_ORDERS,
            payload: { orders },
        })).toEqual({
            ...initialState,
            orders,
        });
    });
});
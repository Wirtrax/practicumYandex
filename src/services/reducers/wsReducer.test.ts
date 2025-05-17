import { wsReducer } from './wsReducer';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_DISCONNECT
} from '../actions/wsActions';

describe('ws reducer', () => {
    const initialState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
        ingredientsMap: {},
        error: null
    };

    const message = {
        orders: [{
            _id: '1',
            number: 1,
            ingredients: ['60d3b41abdacab0026a733c6'],
            status: 'done' as const,
            name: 'Order 1',
            createdAt: '2021-06-23T14:43:22.587Z',
            updatedAt: '2021-06-23T14:43:22.587Z'
        }],
        total: 100,
        totalToday: 10,
        ingredientsMap: {
            '60d3b41abdacab0026a733c6': {
                _id: '60d3b41abdacab0026a733c6',
                name: 'Ingredient',
                type: 'main' as const,
                proteins: 10,
                fat: 5,
                carbohydrates: 15,
                calories: 100,
                price: 50,
                image: '',
                image_mobile: '',
                image_large: '',
                __v: 0
            }
        }
    };

    it('should return the initial state', () => {
        expect(wsReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState);
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer(initialState, {
            type: WS_CONNECTION_SUCCESS,
        })).toEqual({
            ...initialState,
            wsConnected: true,
        });
    });

    it('should handle WS_CONNECTION_ERROR', () => {
        const error = 'Connection error';
        expect(wsReducer(initialState, {
            type: WS_CONNECTION_ERROR,
            payload: error,
        })).toEqual({
            ...initialState,
            error,
            wsConnected: false,
        });
    });

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(wsReducer(initialState, {
            type: WS_CONNECTION_CLOSED,
        })).toEqual({
            ...initialState,
            wsConnected: false,
        });
    });

    it('should handle WS_DISCONNECT', () => {
        expect(wsReducer(initialState, {
            type: WS_DISCONNECT,
        })).toEqual({
            ...initialState,
            wsConnected: false,
        });
    });

    it('should handle WS_GET_MESSAGE', () => {
        expect(wsReducer(initialState, {
            type: WS_GET_MESSAGE,
            payload: message,
        })).toEqual({
            ...initialState,
            orders: message.orders,
            total: message.total,
            totalToday: message.totalToday,
            ingredientsMap: message.ingredientsMap,
        });
    });
});
import { orderDetailsReducer } from './orderDetailsReducer';
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    SET_CURRENT_ORDER,
    CLEAR_CURRENT_ORDER
} from '../actions/orderDetailsActions';

describe('orderDetails reducer', () => {
    const initialState = {
        currentOrder: null,
        isLoading: false,
        error: null
    };

    type OrderStatus = 'done' | 'created' | 'pending';

    const order = {
        _id: '1',
        number: 123,
        ingredients: ['60d3b41abdacab0026a733c6'],
        status: 'done' as OrderStatus,
        name: 'Order Name',
        createdAt: '2021-06-23T14:43:22.587Z',
        updatedAt: '2021-06-23T14:43:22.587Z'
    };


    it('should return the initial state', () => {
        expect(orderDetailsReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState);
    });

    it('should handle GET_ORDER_REQUEST', () => {
        expect(orderDetailsReducer(initialState, {
            type: GET_ORDER_REQUEST,
        })).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it('should handle GET_ORDER_SUCCESS', () => {
        expect(orderDetailsReducer(initialState, {
            type: GET_ORDER_SUCCESS,
            payload: order,
        })).toEqual({
            currentOrder: order,
            isLoading: false,
            error: null,
        });
    });

    it('should handle GET_ORDER_FAILED', () => {
        const error = 'Failed to get order';
        expect(orderDetailsReducer(initialState, {
            type: GET_ORDER_FAILED,
            payload: error,
        })).toEqual({
            ...initialState,
            isLoading: false,
            error,
        });
    });

    it('should handle SET_CURRENT_ORDER', () => {
        expect(orderDetailsReducer(initialState, {
            type: SET_CURRENT_ORDER,
            payload: order,
        })).toEqual({
            ...initialState,
            currentOrder: order,
        });
    });

    it('should handle CLEAR_CURRENT_ORDER', () => {
        const state = { ...initialState, currentOrder: order };
        expect(orderDetailsReducer(state, {
            type: CLEAR_CURRENT_ORDER,
        })).toEqual(initialState);
    });
});
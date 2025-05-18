import orderReducer from './orderReducer';
import { initialState } from './orderReducer';
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
} from '../actions/orderActions';

describe('order reducer', () => {

    it('should return the initial state', () => {
        expect(orderReducer(undefined, { type: 'UNKNOWN_ACTION' } as any )).toEqual(initialState);
    });

    it('should handle CREATE_ORDER_REQUEST', () => {
        expect(orderReducer(initialState, {
            type: CREATE_ORDER_REQUEST,
        })).toEqual({
            ...initialState,
            loading: true,
        });
    });

    it('should handle CREATE_ORDER_SUCCESS', () => {
        const orderNumber = 12345;
        expect(orderReducer(initialState, {
            type: CREATE_ORDER_SUCCESS,
            payload: orderNumber,
        })).toEqual({
            orderNumber,
            loading: false,
            error: null,
        });
    });

    it('should handle CREATE_ORDER_FAILURE', () => {
        const error = 'Failed to create order';
        expect(orderReducer(initialState, {
            type: CREATE_ORDER_FAILURE,
            payload: error,
        })).toEqual({
            ...initialState,
            loading: false,
            error,
        });
    });
});
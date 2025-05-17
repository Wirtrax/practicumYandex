import { authReducer } from './authorizationReducer';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
} from '../actions/authAction';

describe('auth reducer', () => {
    const initialState = {
        user: null,
        isAuth: false,
        isLoading: false,
        error: null,
    };

    it('should return the initial state', () => {
        expect(authReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState);
    });

    it('should handle LOGIN_REQUEST', () => {
        expect(authReducer(initialState, { type: LOGIN_REQUEST })).toEqual({
            ...initialState,
            isLoading: true,
            error: null,
        });
    });

    it('should handle LOGIN_SUCCESS', () => {
        const user = { name: 'Test User', email: 'test@example.com' };
        expect(authReducer(initialState, {
            type: LOGIN_SUCCESS,
            payload: { user }
        })).toEqual({
            ...initialState,
            isAuth: true,
            user,
            isLoading: false,
        });
    });

    it('should handle LOGIN_FAILED', () => {
        const error = 'Login failed';
        expect(authReducer(initialState, {
            type: LOGIN_FAILED,
            payload: error
        })).toEqual({
            ...initialState,
            isLoading: false,
            error,
        });
    });
});
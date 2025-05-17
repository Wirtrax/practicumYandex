import { refreshTokenReducer } from './refreshTokenReducer';
import {
    AUTH_CHECK_REQUEST,
    AUTH_CHECK_SUCCESS,
    AUTH_CHECK_FAILED,
    TOKEN_REFRESH_REQUEST,
    TOKEN_REFRESH_SUCCESS,
    TOKEN_REFRESH_FAILED,
    LOGOUT,
    AUTH_CHECK_COMPLETED
} from '../actions/refreshTokenAction';

describe('refreshToken reducer', () => {
    const initialState = {
        user: null,
        isAuth: false,
        isAuthChecked: false,
        tokenRefreshLoading: false,
    };

    const user = { name: 'Test User', email: 'test@example.com' };

    it('should return the initial state', () => {
        expect(refreshTokenReducer(undefined, { type: 'UNKNOWN_ACTION' } as any )).toEqual(initialState);
    });

    it('should handle AUTH_CHECK_REQUEST', () => {
        expect(refreshTokenReducer(initialState, {
            type: AUTH_CHECK_REQUEST,
        })).toEqual({
            ...initialState,
            isLoading: true,
            error: null,
        });
    });

    it('should handle AUTH_CHECK_SUCCESS', () => {
        expect(refreshTokenReducer(initialState, {
            type: AUTH_CHECK_SUCCESS,
            payload: user,
        })).toEqual({
            user,
            isAuth: true,
            isAuthChecked: true,
            isLoading: false,
            error: null,
            tokenRefreshLoading: false,
        });
    });

    it('should handle AUTH_CHECK_FAILED', () => {
        const error = 'Auth check failed';
        expect(refreshTokenReducer(initialState, {
            type: AUTH_CHECK_FAILED,
            payload: error,
        })).toEqual({
            ...initialState,
            isAuthChecked: true,
            isLoading: false,
            error,
        });
    });

    it('should handle TOKEN_REFRESH_REQUEST', () => {
        expect(refreshTokenReducer(initialState, {
            type: TOKEN_REFRESH_REQUEST,
        })).toEqual({
            ...initialState,
            tokenIsRefreshing: true,
            error: null,
        });
    });

    it('should handle TOKEN_REFRESH_SUCCESS', () => {
        expect(refreshTokenReducer(initialState, {
            type: TOKEN_REFRESH_SUCCESS,
        })).toEqual({
            ...initialState,
            tokenIsRefreshing: false,
            isAuth: true,
            error: null,
        });
    });

    it('should handle TOKEN_REFRESH_FAILED', () => {
        const error = 'Token refresh failed';
        expect(refreshTokenReducer(initialState, {
            type: TOKEN_REFRESH_FAILED,
            payload: error,
        })).toEqual({
            ...initialState,
            tokenIsRefreshing: false,
            isAuth: false,
            user: null,
            error,
        });
    });

    it('should handle LOGOUT', () => {
        const state = { ...initialState, isAuth: true, user };
        expect(refreshTokenReducer(state, {
            type: LOGOUT,
        })).toEqual({
            ...initialState,
            isAuthChecked: true,
        });
    });

    it('should handle AUTH_CHECK_COMPLETED', () => {
        expect(refreshTokenReducer(initialState, {
            type: AUTH_CHECK_COMPLETED,
        })).toEqual({
            ...initialState,
            isAuthChecked: true,
        });
    });
});
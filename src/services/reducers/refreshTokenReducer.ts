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
import { RefreshTokenState } from '../../types/store';
import {
    AuthCheckRequestAction,
    AuthCheckSuccessAction,
    AuthCheckFailedAction,
    TokenRefreshRequestAction,
    TokenRefreshSuccessAction,
    TokenRefreshFailedAction,
    LogoutAction,
    AuthCheckCompletedAction
} from '../../types/actions';

export const initialState: RefreshTokenState = {
    user: null,
    isAuth: false,
    isAuthChecked: false,
    tokenRefreshLoading: false,
};

export const refreshTokenReducer = (state = initialState, action:
    AuthCheckRequestAction |
    AuthCheckSuccessAction |
    AuthCheckFailedAction |
    TokenRefreshRequestAction |
    TokenRefreshSuccessAction |
    TokenRefreshFailedAction |
    LogoutAction |
    AuthCheckCompletedAction
): RefreshTokenState => {
    switch (action.type) {
        case AUTH_CHECK_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case AUTH_CHECK_SUCCESS:
            return {
                ...state,
                isAuth: true,
                user: action.payload,
                isAuthChecked: true,
                isLoading: false,
                error: null
            };

        case AUTH_CHECK_FAILED:
            return {
                ...state,
                isAuth: false,
                user: null,
                isAuthChecked: true,
                isLoading: false,
                error: action.payload
            };

        case TOKEN_REFRESH_REQUEST:
            return {
                ...state,
                tokenIsRefreshing: true,
                error: null
            };

        case TOKEN_REFRESH_SUCCESS:
            return {
                ...state,
                tokenIsRefreshing: false,
                isAuth: true,
                error: null
            };

        case TOKEN_REFRESH_FAILED:
            return {
                ...state,
                tokenIsRefreshing: false,
                isAuth: false,
                user: null,
                error: action.payload
            };

        case LOGOUT:
            return {
                ...initialState,
                isAuthChecked: true
            };

        case AUTH_CHECK_COMPLETED:
            return {
                ...state,
                isAuthChecked: true
            };

        default:
            return state;
    }
};
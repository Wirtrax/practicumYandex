import { refreshToken as apiRefreshToken, getUser as apiGetUser } from '../api';
import { getCookie, setCookie, deleteCookie } from '../utils/cookies';
import {
    AuthCheckRequestAction,
    AuthCheckSuccessAction,
    AuthCheckFailedAction,
    TokenRefreshRequestAction,
    TokenRefreshSuccessAction,
    TokenRefreshFailedAction,
    LogoutAction,
    AuthCheckCompletedAction,
} from '../../types/actions';

export const AUTH_CHECK_REQUEST = 'AUTH_CHECK_REQUEST';
export const AUTH_CHECK_SUCCESS = 'AUTH_CHECK_SUCCESS';
export const AUTH_CHECK_FAILED = 'AUTH_CHECK_FAILED';

export const TOKEN_REFRESH_REQUEST = 'TOKEN_REFRESH_REQUEST';
export const TOKEN_REFRESH_SUCCESS = 'TOKEN_REFRESH_SUCCESS';
export const TOKEN_REFRESH_FAILED = 'TOKEN_REFRESH_FAILED';

export const LOGOUT = 'LOGOUT';
export const AUTH_CHECK_COMPLETED = 'AUTH_CHECK_COMPLETED';

let refreshTimer: any;

type TokenRefreshDispatch = (action: TokenRefreshRequestAction | TokenRefreshSuccessAction | TokenRefreshFailedAction) => void;
type AuthCheckDispatch = (action: AuthCheckRequestAction | AuthCheckSuccessAction | AuthCheckFailedAction | AuthCheckCompletedAction) => void;

const startTokenRefresh = (dispatch: TokenRefreshDispatch) => {
    clearTimeout(refreshTimer);

    refreshTimer = setTimeout(async () => {
        try {
            const refreshToken = getCookie('refreshToken');
            if (!refreshToken) return;

            dispatch({ type: TOKEN_REFRESH_REQUEST });

            const { accessToken, refreshToken: newRefreshToken } = await apiRefreshToken(refreshToken);

            setCookie('accessToken', accessToken.split('Bearer ')[1]);
            setCookie('refreshToken', newRefreshToken);

            dispatch({ type: TOKEN_REFRESH_SUCCESS });
            startTokenRefresh(dispatch);

        } catch (error) {
            console.error('Ошибка обновления токена:', error);
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            dispatch({
                type: TOKEN_REFRESH_FAILED,
                payload: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }, 20 * 60 * 1000);
};

export const checkAuth = () => async (dispatch: AuthCheckDispatch) => {
    dispatch({ type: AUTH_CHECK_REQUEST });

    try {
        const accessToken = getCookie('accessToken');
        if (!accessToken) throw new Error('No token');

        const userData = await apiGetUser(accessToken);
        dispatch({ type: AUTH_CHECK_SUCCESS, payload: userData.user });

        // Приводим тип dispatch к нужному для startTokenRefresh
        startTokenRefresh(dispatch as unknown as TokenRefreshDispatch);

    } catch (error) {
        try {
            const refreshToken = getCookie('refreshToken');
            if (refreshToken) {
                const tokens = await apiRefreshToken(refreshToken);
                setCookie('accessToken', tokens.accessToken.split('Bearer ')[1]);
                setCookie('refreshToken', tokens.refreshToken);

                const userData = await apiGetUser(tokens.accessToken.split('Bearer ')[1]);
                dispatch({ type: AUTH_CHECK_SUCCESS, payload: userData.user });

                // Приводим тип dispatch к нужному для startTokenRefresh
                startTokenRefresh(dispatch as unknown as TokenRefreshDispatch);
                return;
            }
        } catch (e) {
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
        }
        dispatch({
            type: AUTH_CHECK_FAILED,
            payload: error instanceof Error ? error.message : 'Unknown error'
        });
    } finally {
        dispatch({ type: AUTH_CHECK_COMPLETED });
    }
};

export const logout = (navigate: (path: string, options?: { replace: boolean }) => void) => async (
    dispatch: (action: LogoutAction) => void
) => {
    clearTimeout(refreshTimer);
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    dispatch({ type: LOGOUT });

    navigate('/login', { replace: true });
};
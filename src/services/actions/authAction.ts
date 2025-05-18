import { login as apilogin } from '../api';
import { setCookie } from '../utils/cookies';
import {
    LoginAction,
    LoginSuccessAction,
    LoginFailedAction
} from '../../types/actions';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const login = (email: string, password: string, navigate: (path: string, options?: { replace: boolean }) => void) =>
    (dispatch: (action: LoginAction | LoginSuccessAction | LoginFailedAction) => void) => {
        dispatch({ type: LOGIN_REQUEST });

        apilogin(email, password)
            .then((res) => {
                if (res.success) {
                    const accessToken = res.accessToken.split('Bearer ')[1];
                    setCookie('accessToken', accessToken);
                    setCookie('refreshToken', res.refreshToken);

                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: { user: res.user }
                    });

                    navigate('/profile', { replace: true });
                } else {
                    dispatch({
                        type: LOGIN_FAILED,
                        payload: 'Ошибка авторизации'
                    });
                }
            })
            .catch((err: Error) => {
                dispatch({
                    type: LOGIN_FAILED,
                    payload: err.message || 'Произошла ошибка при авторизации'
                });
            });
    };
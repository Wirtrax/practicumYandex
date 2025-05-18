import { register as apiRegister } from '../api';
import { setCookie } from '../utils/cookies';
import {
    RegisterRequestAction,
    RegisterSuccessAction,
    RegisterFailedAction
} from '../../types/actions';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const register = (
    email: string,
    password: string,
    name: string,
    navigate: (path: string, options?: { replace: boolean }) => void
) => (dispatch: (action: RegisterRequestAction | RegisterSuccessAction | RegisterFailedAction) => void) => {
    dispatch({ type: REGISTER_REQUEST });

    apiRegister(email, password, name)
        .then((res) => {
            if (res.success) {
                const accessToken = res.accessToken.split('Bearer ')[1];

                setCookie('accessToken', accessToken);
                setCookie('refreshToken', res.refreshToken);

                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: { user: res.user }
                });

                navigate('/profile', { replace: true });
            } else {
                dispatch({
                    type: REGISTER_FAILED,
                    payload: 'Ошибка регистрации'
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: REGISTER_FAILED,
                payload: err instanceof Error ? err.message : 'Unknown error'
            });
        });
};
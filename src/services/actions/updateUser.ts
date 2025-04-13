import { updateUser as apiUpdateUser, getUser as apigetUser } from '../api';
import { getCookie } from '../utils/cookies';
import {
    GetUserRequestAction,
    GetUserSuccessAction,
    GetUserFailedAction,
    UpdateUserRequestAction,
    UpdateUserSuccessAction,
    UpdateUserFailedAction,
} from '../../types/actions';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const getUser = () => {
    return function (dispatch: (action:
        GetUserRequestAction |
        GetUserSuccessAction |
        GetUserFailedAction
    ) => void) {
        dispatch({ type: GET_USER_REQUEST });

        const accessToken = getCookie('accessToken');
        if (!accessToken) {
            dispatch({ type: GET_USER_FAILED });
            return;
        }

        apigetUser(accessToken)
            .then((res) => {
                if (res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        user: res.user,
                    });
                } else {
                    dispatch({ type: GET_USER_FAILED });
                }
            })
            .catch(() => {
                dispatch({ type: GET_USER_FAILED });
            });
    };
};

export const updateUser = (email: string, name: string, password: string) => {
    return function (dispatch: (action:
        UpdateUserRequestAction |
        UpdateUserSuccessAction |
        UpdateUserFailedAction
    ) => void) {
        dispatch({ type: UPDATE_USER_REQUEST });

        const accessToken = getCookie('accessToken');
        if (!accessToken) {
            dispatch({ type: UPDATE_USER_FAILED });
            return;
        }

        apiUpdateUser(email, name, password, accessToken)
            .then((res) => {
                if (res.success) {
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        user: res.user,
                    });
                } else {
                    dispatch({ type: UPDATE_USER_FAILED });
                }
            })
            .catch(() => {
                dispatch({ type: UPDATE_USER_FAILED });
            });
    };
};
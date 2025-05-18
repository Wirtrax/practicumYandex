import { forgotPassword, resetPassword } from '../api';
import {
    ForgotPasswordRequestAction,
    ForgotPasswordSuccessAction,
    ForgotPasswordFailedAction,
    ResetPasswordRequestAction,
    ResetPasswordSuccessAction,
    ResetPasswordFailedAction
} from '../../types/actions';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const forgotPasswordRequest = (email: string) => async (dispatch: (action:
    ForgotPasswordRequestAction |
    ForgotPasswordSuccessAction |
    ForgotPasswordFailedAction
) => void) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    try {
        const response = await forgotPassword(email);
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: response.message
        });
        return response;
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILED,
            payload: error instanceof Error ? error.message : 'Unknown error'
        });
        throw error;
    }
};

export const resetPasswordRequest = (password: string, token: string) => async (dispatch: (action:
    ResetPasswordRequestAction |
    ResetPasswordSuccessAction |
    ResetPasswordFailedAction
) => void) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
        const response = await resetPassword(password, token);
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: response.message
        });
        return response;
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAILED,
            payload: error instanceof Error ? error.message : 'Unknown error'
        });
        throw error;
    }
};
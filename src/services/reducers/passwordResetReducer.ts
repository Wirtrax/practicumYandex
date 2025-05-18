import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED
} from '../actions/passwordResetActions';
import { PasswordResetState } from '../../types/store';
import {
    ForgotPasswordRequestAction,
    ForgotPasswordSuccessAction,
    ForgotPasswordFailedAction,
    ResetPasswordRequestAction,
    ResetPasswordSuccessAction,
    ResetPasswordFailedAction
} from '../../types/actions';

export const initialState: PasswordResetState = {
    request: false,
    failed: false,
    success: false,
    error: null,
    message: null
};

export const passwordResetReducer = (state = initialState, action:
    ForgotPasswordRequestAction |
    ForgotPasswordSuccessAction |
    ForgotPasswordFailedAction |
    ResetPasswordRequestAction |
    ResetPasswordSuccessAction |
    ResetPasswordFailedAction
): PasswordResetState => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                request: true,
                failed: false,
                success: false,
                error: null
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                request: false,
                success: true,
                message: action.payload
            };

        case FORGOT_PASSWORD_FAILED:
            return {
                ...state,
                request: false,
                failed: true,
                error: action.payload
            };

        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                request: true,
                failed: false,
                success: false,
                error: null
            };

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                request: false,
                success: true,
                message: action.payload
            };

        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                request: false,
                failed: true,
                error: action.payload
            };

        default:
            return state;
    }
};
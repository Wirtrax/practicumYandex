import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
} from '../actions/authAction';
import { AuthState } from '../../types/store';
import {
    LoginAction,
    LoginSuccessAction,
    LoginFailedAction
} from '../../types/actions';

export const initialState: AuthState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null,
};

export const authReducer = (
    state = initialState,
    action: LoginAction | LoginSuccessAction | LoginFailedAction
): AuthState => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true, error: null };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                user: action.payload.user
            };
        case LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload || null
            };
        default:
            return state;
    }
};
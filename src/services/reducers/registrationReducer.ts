import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
} from '../actions/registrationAction';
import { AuthState } from '../../types/store';
import {
    RegisterRequestAction,
    RegisterSuccessAction,
    RegisterFailedAction
} from '../../types/actions';

export const initialState: AuthState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null,
};

export const registrationReducer = (state = initialState, action:
    RegisterRequestAction |
    RegisterSuccessAction |
    RegisterFailedAction
): AuthState => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return { ...state, isLoading: true, error: null };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                user: action.payload.user
            };
        case REGISTER_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};
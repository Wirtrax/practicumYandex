import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
} from '../actions/updateUser';
import { UpdateUserState } from '../../types/store';
import {
    GetUserRequestAction,
    GetUserSuccessAction,
    GetUserFailedAction,
    UpdateUserRequestAction,
    UpdateUserSuccessAction,
    UpdateUserFailedAction
} from '../../types/actions';

export const initialState: UpdateUserState = {
    user: null,
    getUserRequest: false,
    getUserFailed: false,
    updateUserRequest: false,
    updateUserFailed: false,
};

export const updateUserReducer = (state = initialState, action:
    GetUserRequestAction |
    GetUserSuccessAction |
    GetUserFailedAction |
    UpdateUserRequestAction |
    UpdateUserSuccessAction |
    UpdateUserFailedAction
): UpdateUserState => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                getUserRequest: false,
            };
        case GET_USER_FAILED:
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: true,
            };
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                updateUserRequest: false,
            };
        case UPDATE_USER_FAILED:
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: true,
            };
        default:
            return state;
    }
};
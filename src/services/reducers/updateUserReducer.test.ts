import { updateUserReducer } from './updateUserReducer';
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
} from '../actions/updateUser';

describe('updateUser reducer', () => {
    const initialState = {
        user: null,
        getUserRequest: false,
        getUserFailed: false,
        updateUserRequest: false,
        updateUserFailed: false,
    };

    const user = { name: 'Test User', email: 'test@example.com' };

    it('should return the initial state', () => {
        expect(updateUserReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState);
    });

    it('should handle GET_USER_REQUEST', () => {
        expect(updateUserReducer(initialState, {
            type: GET_USER_REQUEST,
        })).toEqual({
            ...initialState,
            getUserRequest: true,
            getUserFailed: false,
        });
    });

    it('should handle GET_USER_SUCCESS', () => {
        expect(updateUserReducer(initialState, {
            type: GET_USER_SUCCESS,
            user,
        })).toEqual({
            ...initialState,
            user,
            getUserRequest: false,
        });
    });

    it('should handle GET_USER_FAILED', () => {
        expect(updateUserReducer(initialState, {
            type: GET_USER_FAILED,
        })).toEqual({
            ...initialState,
            getUserRequest: false,
            getUserFailed: true,
        });
    });

    it('should handle UPDATE_USER_REQUEST', () => {
        expect(updateUserReducer(initialState, {
            type: UPDATE_USER_REQUEST,
        })).toEqual({
            ...initialState,
            updateUserRequest: true,
            updateUserFailed: false,
        });
    });

    it('should handle UPDATE_USER_SUCCESS', () => {
        expect(updateUserReducer(initialState, {
            type: UPDATE_USER_SUCCESS,
            user,
        })).toEqual({
            ...initialState,
            user,
            updateUserRequest: false,
        });
    });

    it('should handle UPDATE_USER_FAILED', () => {
        expect(updateUserReducer(initialState, {
            type: UPDATE_USER_FAILED,
        })).toEqual({
            ...initialState,
            updateUserRequest: false,
            updateUserFailed: true,
        });
    });
});
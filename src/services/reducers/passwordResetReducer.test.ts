import { passwordResetReducer } from './passwordResetReducer';
import { initialState } from './passwordResetReducer';
import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED
} from '../actions/passwordResetActions';

describe('passwordReset reducer', () => {

    const message = 'Test message';

    it('should return the initial state', () => {
        expect(passwordResetReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState);
    });

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(passwordResetReducer(initialState, {
            type: FORGOT_PASSWORD_REQUEST,
        })).toEqual({
            ...initialState,
            request: true,
        });
    });

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(passwordResetReducer(initialState, {
            type: FORGOT_PASSWORD_SUCCESS,
            payload: message,
        })).toEqual({
            ...initialState,
            success: true,
            message,
        });
    });

    it('should handle FORGOT_PASSWORD_FAILED', () => {
        const error = 'Failed to reset password';
        expect(passwordResetReducer(initialState, {
            type: FORGOT_PASSWORD_FAILED,
            payload: error,
        })).toEqual({
            ...initialState,
            failed: true,
            error,
        });
    });

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(passwordResetReducer(initialState, {
            type: RESET_PASSWORD_REQUEST,
        })).toEqual({
            ...initialState,
            request: true,
        });
    });

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(passwordResetReducer(initialState, {
            type: RESET_PASSWORD_SUCCESS,
            payload: message,
        })).toEqual({
            ...initialState,
            success: true,
            message,
        });
    });

    it('should handle RESET_PASSWORD_FAILED', () => {
        const error = 'Failed to reset password';
        expect(passwordResetReducer(initialState, {
            type: RESET_PASSWORD_FAILED,
            payload: error,
        })).toEqual({
            ...initialState,
            failed: true,
            error,
        });
    });
});
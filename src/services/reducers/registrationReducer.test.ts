import { registrationReducer } from './registrationReducer';
import { initialState } from './registrationReducer';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
} from '../actions/registrationAction';

describe('registration reducer', () => {

    const user = { name: 'Test User', email: 'test@example.com' };

    it('should return the initial state', () => {
        expect(registrationReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState);
    });

    it('should handle REGISTER_REQUEST', () => {
        expect(registrationReducer(initialState, {
            type: REGISTER_REQUEST,
        })).toEqual({
            ...initialState,
            isLoading: true,
            error: null,
        });
    });

    it('should handle REGISTER_SUCCESS', () => {
        expect(registrationReducer(initialState, {
            type: REGISTER_SUCCESS,
            payload: { user },
        })).toEqual({
            user,
            isAuth: true,
            isLoading: false,
            error: null,
        });
    });

    it('should handle REGISTER_FAILED', () => {
        const error = 'Registration failed';
        expect(registrationReducer(initialState, {
            type: REGISTER_FAILED,
            payload: error,
        })).toEqual({
            ...initialState,
            isLoading: false,
            error,
        });
    });
});
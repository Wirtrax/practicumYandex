import ingredientsReducer from './ingredientsReducer';
import { initialState } from './ingredientsReducer';
import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE,
} from '../actions/ingredientsActions';

describe('ingredients reducer', () => {

    const ingredients = [{
        _id: '1',
        name: 'Булочка',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0
    }, {
        _id: '2',
        name: 'Соус',
        type: 'souse',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0
    }];

    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState);
    });

    it('should handle FETCH_INGREDIENTS_REQUEST', () => {
        expect(ingredientsReducer(initialState, {
            type: FETCH_INGREDIENTS_REQUEST,
        })).toEqual({
            ...initialState,
            loading: true,
        });
    });

    it('should handle FETCH_INGREDIENTS_SUCCESS', () => {
        expect(ingredientsReducer(initialState, {
            type: FETCH_INGREDIENTS_SUCCESS,
            payload: ingredients,
        })).toEqual({
            ingredients,
            loading: false,
            error: null,
        });
    });

    it('should handle FETCH_INGREDIENTS_FAILURE', () => {
        const error = 'Failed to fetch';
        expect(ingredientsReducer(initialState, {
            type: FETCH_INGREDIENTS_FAILURE,
            payload: error,
        })).toEqual({
            ...initialState,
            loading: false,
            error,
        });
    });
});
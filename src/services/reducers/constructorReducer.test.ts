import constructorReducer from './constructorReducer';
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    UPDATE_COUNTS,
} from '../actions/constructorActions';

describe('constructor reducer', () => {
    const initialState = {
        bun: null,
        ingredients: [],
        counts: {},
    };

    const bun = {
        _id: '1',
        type: 'bun',
        name: 'Bun',
        uuid: 'bun-uuid-1',
        price: 100,
        image: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        image_mobile: '',
        image_large: '',
        __v: 0
    };

    const ingredient = {
        _id: '2',
        name: 'Ingredient',
        type: 'main',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 50,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
        uuid: 'ingredient-uuid-1'
    };

    it('should return the initial state', () => {
        expect(constructorReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState);
    });

    it('should handle ADD_INGREDIENT for bun', () => {
        expect(constructorReducer(initialState, {
            type: ADD_INGREDIENT,
            payload: bun,
        })).toEqual({
            bun,
            ingredients: [],
            counts: { '1': 2 },
        });
    });

    it('should handle ADD_INGREDIENT for non-bun', () => {
        expect(constructorReducer(initialState, {
            type: ADD_INGREDIENT,
            payload: ingredient,
        })).toEqual({
            bun: null,
            ingredients: [ingredient],
            counts: { '2': 1 },
        });
    });

    it('should handle REMOVE_INGREDIENT', () => {
        const state = {
            bun: null,
            ingredients: [ingredient],
            counts: { '2': 1 },
        };
        expect(constructorReducer(state, {
            type: REMOVE_INGREDIENT,
            payload: 0,
        })).toEqual({
            bun: null,
            ingredients: [],
            counts: { '2': 0 },
        });
    });

    it('should handle MOVE_INGREDIENT', () => {
        const anotherIngredient = {
            ...ingredient,
            _id: '3',
            uuid: 'ingredient-uuid-2'
        };
        const state = {
            bun: null,
            ingredients: [ingredient, anotherIngredient],
            counts: { '2': 1, '3': 1 },
        };
        expect(constructorReducer(state, {
            type: MOVE_INGREDIENT,
            payload: { fromIndex: 0, toIndex: 1 },
        })).toEqual({
            bun: null,
            ingredients: state.ingredients.reverse(),
            counts: state.counts,
        });
    });

    it('should handle UPDATE_COUNTS', () => {
        const newCounts = { '1': 2, '2': 3 };
        expect(constructorReducer(initialState, {
            type: UPDATE_COUNTS,
            payload: newCounts,
        })).toEqual({
            ...initialState,
            counts: newCounts,
        });
    });
});
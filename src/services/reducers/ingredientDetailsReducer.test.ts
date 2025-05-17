import ingredientDetailsReducer from './ingredientDetailsReducer';
import { initialState } from './ingredientDetailsReducer';
import {
    SET_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT
} from '../actions/ingredientDetailsActions';

describe('ingredientDetails reducer', () => {

    const ingredient = {
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
    };

    it('should return the initial state', () => {
        expect(ingredientDetailsReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState);
    });

    it('should handle SET_CURRENT_INGREDIENT', () => {
        expect(ingredientDetailsReducer(initialState, {
            type: SET_CURRENT_INGREDIENT,
            payload: ingredient,
        })).toEqual({
            currentIngredient: ingredient,
        });
    });

    it('should handle CLEAR_CURRENT_INGREDIENT', () => {
        const state = { currentIngredient: ingredient };
        expect(ingredientDetailsReducer(state, {
            type: CLEAR_CURRENT_INGREDIENT,
        })).toEqual(initialState);
    });
});
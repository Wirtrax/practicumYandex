import { Ingredient } from '../../types/ingredient';
import {
    SetCurrentIngredientAction,
    ClearCurrentIngredientAction
} from '../../types/actions';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const CLEAR_CURRENT_INGREDIENT = 'CLEAR_CURRENT_INGREDIENT';

export const setCurrentIngredient = (ingredient: Ingredient): SetCurrentIngredientAction => ({
    type: SET_CURRENT_INGREDIENT,
    payload: ingredient,
});

export const clearCurrentIngredient = (): ClearCurrentIngredientAction => ({
    type: CLEAR_CURRENT_INGREDIENT,
});
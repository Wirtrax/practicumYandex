import { v4 as uuidV4 } from "uuid";
import { Ingredient } from '../../types/ingredient';
import {
    AddIngredientAction,
    RemoveIngredientAction,
    MoveIngredientAction,
    UpdateCountsAction
} from '../../types/actions';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const UPDATE_COUNTS = 'UPDATE_COUNTS';

export const addIngredient = (ingredient: Ingredient): AddIngredientAction => ({
    type: ADD_INGREDIENT,
    payload: {
        ...ingredient,
        uuid: uuidV4(),
    }
});

export const removeIngredient = (id: number): RemoveIngredientAction => ({
    type: REMOVE_INGREDIENT,
    payload: id,
});

export const moveIngredient = (fromIndex: number, toIndex: number): MoveIngredientAction => ({
    type: MOVE_INGREDIENT,
    payload: { fromIndex, toIndex },
});

export const updateCounts = (counts: Record<string, number>): UpdateCountsAction => ({
    type: UPDATE_COUNTS,
    payload: counts,
});
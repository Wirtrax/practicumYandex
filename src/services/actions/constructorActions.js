export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const UPDATE_COUNTS = 'UPDATE_COUNTS';

export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    payload: ingredient,
});

export const removeIngredient = (id) => ({
    type: REMOVE_INGREDIENT,
    payload: id,
});

export const moveIngredient = (fromIndex, toIndex) => ({
    type: MOVE_INGREDIENT,
    payload: { fromIndex, toIndex },
});

export const updateCounts = (counts) => ({
    type: UPDATE_COUNTS,
    payload: counts,
});
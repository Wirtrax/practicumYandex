import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from '../actions/ingredientDetailsActions';

const initialState = {
    currentIngredient: null,
};

const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT:
            return { ...state, currentIngredient: action.payload };
        case CLEAR_CURRENT_INGREDIENT:
            return { ...state, currentIngredient: null };
        default:
            return state;
    }
};

export default ingredientDetailsReducer;
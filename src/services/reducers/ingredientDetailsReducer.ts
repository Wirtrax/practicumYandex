import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from '../actions/ingredientDetailsActions';
import { IngredientDetailsState } from '../../types/store';
import { SetCurrentIngredientAction, ClearCurrentIngredientAction } from '../../types/actions';

const initialState: IngredientDetailsState = {
    currentIngredient: null,
};

const ingredientDetailsReducer = (state = initialState, action: SetCurrentIngredientAction | ClearCurrentIngredientAction): IngredientDetailsState => {
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
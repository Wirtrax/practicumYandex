import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE,
} from '../actions/ingredientsActions';
import { IngredientsState } from '../../types/store';
import {
    FetchIngredientsRequestAction,
    FetchIngredientsSuccessAction,
    FetchIngredientsFailureAction
} from '../../types/actions';

const initialState: IngredientsState = {
    ingredients: [],
    loading: false,
    error: null,
};

const ingredientsReducer = (state = initialState, action:
    FetchIngredientsRequestAction |
    FetchIngredientsSuccessAction |
    FetchIngredientsFailureAction
): IngredientsState => {
    switch (action.type) {
        case FETCH_INGREDIENTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_INGREDIENTS_SUCCESS:
            return { ...state, loading: false, ingredients: action.payload };
        case FETCH_INGREDIENTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default ingredientsReducer;
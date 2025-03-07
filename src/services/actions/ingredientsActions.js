import { getIngredients } from '../api';

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const fetchIngredients = () => async (dispatch) => {
    dispatch({ type: FETCH_INGREDIENTS_REQUEST });
    try {
        const data = await getIngredients();
        dispatch({ type: FETCH_INGREDIENTS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: FETCH_INGREDIENTS_FAILURE, payload: error.message });
    }
};
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    UPDATE_COUNTS,
} from '../actions/constructorActions';

const initialState = {
    bun: null,
    ingredients: [],
    counts: {},
};

const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    bun: action.payload,
                    counts: {
                        ...state.counts,
                        [action.payload._id]: 2,
                    },
                };
            }
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
                counts: {
                    ...state.counts,
                    [action.payload._id]: (state.counts[action.payload._id] || 0) + 1,
                },
            };
        case REMOVE_INGREDIENT:
            const newIngredients = state.ingredients.filter((ingredient, index) => index !== action.payload);
            const removedIngredient = state.ingredients[action.payload];
            return {
                ...state,
                ingredients: newIngredients,
                counts: {
                    ...state.counts,
                    [removedIngredient._id]: Math.max((state.counts[removedIngredient._id] || 0) - 1, 0),
                },
            };
        case MOVE_INGREDIENT:
            const ingredients = [...state.ingredients];
            const [movedIngredient] = ingredients.splice(action.payload.fromIndex, 1);
            ingredients.splice(action.payload.toIndex, 0, movedIngredient);
            return { ...state, ingredients };
        case UPDATE_COUNTS:
            return {
                ...state,
                counts: action.payload,
            };
        default:
            return state;
    }
};

export default constructorReducer;
import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsReducer';
import constructorReducer from './constructorReducer';
import ingredientDetailsReducer from './ingredientDetailsReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
});

export default rootReducer;
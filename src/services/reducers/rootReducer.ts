import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsReducer';
import constructorReducer from './constructorReducer';
import ingredientDetailsReducer from './ingredientDetailsReducer';
import orderReducer from './orderReducer';
import { registrationReducer } from './registrationReducer';
import { authReducer } from './authorizationReducer';
import { refreshTokenReducer } from './refreshTokenReducer';
import { passwordResetReducer } from './passwordResetReducer';
import { updateUserReducer } from './updateUserReducer';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
    registration: registrationReducer,
    auth: authReducer,
    refreshToken: refreshTokenReducer,
    forgotPassword: passwordResetReducer,
    resetPassword: passwordResetReducer,
    updateUser: updateUserReducer
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
import { Ingredient, ConstructorIngredient } from './ingredient';
import { User } from './user';

// Common action type
export interface Action<T = any> {
    type: string;
    payload?: T;
}

// Auth actions
export interface LoginAction extends Action {
    type: 'LOGIN_REQUEST' ;
    payload?: string;
}

export interface LoginSuccessAction extends Action {
    type: 'LOGIN_SUCCESS';
    payload: { user: User };
}

export interface LoginFailedAction extends Action {
    type: 'LOGIN_FAILED';
    payload?: string;
}

// Constructor actions
export interface AddIngredientAction extends Action {
    type: 'ADD_INGREDIENT';
    payload: ConstructorIngredient;
}

export interface RemoveIngredientAction extends Action {
    type: 'REMOVE_INGREDIENT';
    payload: number;
}

export interface MoveIngredientAction extends Action {
    type: 'MOVE_INGREDIENT';
    payload: { fromIndex: number; toIndex: number };
}

export interface UpdateCountsAction extends Action {
    type: 'UPDATE_COUNTS';
    payload: Record<string, number>;
}

// Ingredient details actions
export interface SetCurrentIngredientAction extends Action {
    type: 'SET_CURRENT_INGREDIENT';
    payload: Ingredient;
}

export interface ClearCurrentIngredientAction extends Action {
    type: 'CLEAR_CURRENT_INGREDIENT';
}

// Ingredients actions
export interface FetchIngredientsRequestAction extends Action {
    type: 'FETCH_INGREDIENTS_REQUEST';
}

export interface FetchIngredientsSuccessAction extends Action {
    type: 'FETCH_INGREDIENTS_SUCCESS';
    payload: Ingredient[];
}

export interface FetchIngredientsFailureAction extends Action {
    type: 'FETCH_INGREDIENTS_FAILURE';
    payload: string;
}

// Order actions
export interface CreateOrderRequestAction extends Action {
    type: 'CREATE_ORDER_REQUEST';
}

export interface CreateOrderSuccessAction extends Action {
    type: 'CREATE_ORDER_SUCCESS';
    payload: number;
}

export interface CreateOrderFailureAction extends Action {
    type: 'CREATE_ORDER_FAILURE';
    payload: string;
}

// Password reset actions
export interface ForgotPasswordRequestAction extends Action {
    type: 'FORGOT_PASSWORD_REQUEST';
}

export interface ForgotPasswordSuccessAction extends Action {
    type: 'FORGOT_PASSWORD_SUCCESS';
    payload: string;
}

export interface ForgotPasswordFailedAction extends Action {
    type: 'FORGOT_PASSWORD_FAILED';
    payload: string;
}

export interface ResetPasswordRequestAction extends Action {
    type: 'RESET_PASSWORD_REQUEST';
}

export interface ResetPasswordSuccessAction extends Action {
    type: 'RESET_PASSWORD_SUCCESS';
    payload: string;
}

export interface ResetPasswordFailedAction extends Action {
    type: 'RESET_PASSWORD_FAILED';
    payload: string;
}

// Refresh token actions
export interface AuthCheckRequestAction extends Action {
    type: 'AUTH_CHECK_REQUEST';
}

export interface AuthCheckSuccessAction extends Action {
    type: 'AUTH_CHECK_SUCCESS';
    payload: User;
}

export interface AuthCheckFailedAction extends Action {
    type: 'AUTH_CHECK_FAILED';
    payload?: string;
}

export interface TokenRefreshRequestAction extends Action {
    type: 'TOKEN_REFRESH_REQUEST';
}

export interface TokenRefreshSuccessAction extends Action {
    type: 'TOKEN_REFRESH_SUCCESS';
}

export interface TokenRefreshFailedAction extends Action {
    type: 'TOKEN_REFRESH_FAILED';
    payload?: string;
}

export interface LogoutAction extends Action {
    type: 'LOGOUT';
}

export interface AuthCheckCompletedAction extends Action {
    type: 'AUTH_CHECK_COMPLETED';
}

// Registration actions
export interface RegisterRequestAction extends Action {
    type: 'REGISTER_REQUEST';
}

export interface RegisterSuccessAction extends Action {
    type: 'REGISTER_SUCCESS';
    payload: { user: User };
}

export interface RegisterFailedAction extends Action {
    type: 'REGISTER_FAILED';
    payload: string;
}

// Update user actions
export interface GetUserRequestAction extends Action {
    type: 'GET_USER_REQUEST';
}

export interface GetUserSuccessAction extends Action {
    type: 'GET_USER_SUCCESS';
    user: User;
}

export interface GetUserFailedAction extends Action {
    type: 'GET_USER_FAILED';
}

export interface UpdateUserRequestAction extends Action {
    type: 'UPDATE_USER_REQUEST';
}

export interface UpdateUserSuccessAction extends Action {
    type: 'UPDATE_USER_SUCCESS';
    user: User;
}

export interface UpdateUserFailedAction extends Action {
    type: 'UPDATE_USER_FAILED';
}

export type AuthActions = LoginAction | LoginSuccessAction | RegisterRequestAction | RegisterSuccessAction | RegisterFailedAction;
export type ConstructorActions = AddIngredientAction | RemoveIngredientAction | MoveIngredientAction | UpdateCountsAction;
export type IngredientDetailsActions = SetCurrentIngredientAction | ClearCurrentIngredientAction;
export type IngredientsActions = FetchIngredientsRequestAction | FetchIngredientsSuccessAction | FetchIngredientsFailureAction;
export type OrderActions = CreateOrderRequestAction | CreateOrderSuccessAction | CreateOrderFailureAction;
export type PasswordResetActions = ForgotPasswordRequestAction | ForgotPasswordSuccessAction | ForgotPasswordFailedAction | ResetPasswordRequestAction | ResetPasswordSuccessAction | ResetPasswordFailedAction;
export type RefreshTokenActions = AuthCheckRequestAction | AuthCheckSuccessAction | AuthCheckFailedAction | TokenRefreshRequestAction | TokenRefreshSuccessAction | TokenRefreshFailedAction | LogoutAction | AuthCheckCompletedAction;
export type UpdateUserActions = GetUserRequestAction | GetUserSuccessAction | GetUserFailedAction | UpdateUserRequestAction | UpdateUserSuccessAction | UpdateUserFailedAction;

export type AppActions =
    | AuthActions
    | ConstructorActions
    | IngredientDetailsActions
    | IngredientsActions
    | OrderActions
    | PasswordResetActions
    | RefreshTokenActions
    | UpdateUserActions;
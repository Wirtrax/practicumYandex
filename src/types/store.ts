import { Ingredient, ConstructorIngredient } from './ingredient';
import { User } from './user';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppActions } from './actions';
import { Order } from './order';

export type RootState = {
    ingredients: IngredientsState;
    burgerConstructor: ConstructorState;
    ingredientDetails: IngredientDetailsState;
    order: OrderState;
    registration: AuthState;
    auth: AuthState;
    refreshToken: RefreshTokenState;
    forgotPassword: PasswordResetState;
    resetPassword: PasswordResetState;
    updateUser: UpdateUserState;
    ws: WSState;
    userOrders: WSUserOrdersState;
    orderDetails: OrderDetailsState;
};

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunk = ThunkAction<void, RootState, unknown, AppActions>;

export type IngredientsState = {
    ingredients: Ingredient[];
    loading: boolean;
    error: string | null;
};

export type ConstructorState = {
    bun: ConstructorIngredient | null;
    ingredients: ConstructorIngredient[];
    counts: Record<string, number>;
};

export type IngredientDetailsState = {
    currentIngredient: Ingredient | null;
};

export type OrderState = {
    orderNumber: number | null;
    loading: boolean;
    error: string | null;
};

export type AuthState = {
    user: User | null;
    isAuth: boolean;
    isLoading: boolean;
    error: string | null;
};

export type PasswordResetState = {
    request: boolean;
    failed: boolean;
    success: boolean;
    error: string | null;
    message: string | null;
};

export type RefreshTokenState = {
    user: User | null;
    isAuth: boolean;
    isAuthChecked: boolean;
    tokenRefreshLoading: boolean;
    isLoading?: boolean;
    tokenIsRefreshing?: boolean;
    error?: string | null;
};

export type UpdateUserState = {
    user: User | null;
    getUserRequest: boolean;
    getUserFailed: boolean;
    updateUserRequest: boolean;
    updateUserFailed: boolean;
};

export type OrderDetailsState = {
    currentOrder: Order | null;
    isLoading: boolean;
    error: string | null;
};

export type WSState = {
    wsConnected: boolean;
    orders: Order[];
    total: number;
    totalToday: number;
    ingredientsMap: Record<string, Ingredient>;
    error: string | null;
};

export type WSUserOrdersState = {
    wsConnected: boolean;
    orders: Order[];
    error: string | null;
};
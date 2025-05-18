import { Ingredient } from './ingredient';
import { RootState } from './store';

export type AppProps = {};

export type AppState = {
    isOrderModalOpen: boolean;
    backgroundLocation: any;
};

export type AppSelector = (state: RootState) => {
    currentIngredient: Ingredient | null;
    orderNumber: number | null;
    bun: ConstructorIngredient | null;
    ingredients: ConstructorIngredient[];
    isAuthFromAuth: boolean;
    isAuthFromRefresh: boolean;
};
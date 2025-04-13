import { Ingredient } from './ingredient';

export type TabProps = {
    currentCategory: string;
    onCategoryChange: (type: string) => void;
    categories: { type: string; name: string }[];
    categoryRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
};

export type IngredientCategoryProps = {
    type: string;
    name: string;
    ingredients: Ingredient[];
    onIngredientClick: (ingredient: Ingredient) => void;
    categoryRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
    counts: Record<string, number>;
};

export type IngredientProps = {
    ingredient: Ingredient;
    onIngredientClick: (ingredient: Ingredient) => void;
    counts: Record<string, number>;
};

export type BurgerIngredientsProps = {
    onIngredientClick: (ingredient: Ingredient) => void;
};
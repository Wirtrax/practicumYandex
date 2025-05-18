import { ConstructorIngredient } from './ingredient';

export type BurgerConstructorProps = {
    openOrderModal: () => void;
};

export type DraggableIngredientProps = {
    ingredient: ConstructorIngredient;
    index: number;
    moveIngredientHandler: (fromIndex: number, toIndex: number) => void;
    removeIngredient: () => void;
};
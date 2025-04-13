import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./IngredientDetailsStyle.module.css";
import { RootState } from '../../../types/store';

const IngredientDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { ingredients } = useSelector((state: RootState) => state.ingredients);
    const { currentIngredient } = useSelector((state: RootState) => state.ingredientDetails);

    const ingredient = currentIngredient || ingredients.find(item => item._id === id);

    if (!ingredient) return null;

    return (
        <div className={`${style.container} p-10 pb-15`}>
            <div>
                <h2 className="text text_type_main-large">Детали ингредиента</h2>
                <img src={ingredient.image_large} alt={ingredient.name} />
                <p className="text text_type_main-medium pb-2 pt-15">{ingredient.name}</p>
                <div className={`${style.infoIngr} text text_type_main-default text_color_inactive pt-4 pb-8`}>
                    <div>
                        <p>Калории, ккал</p>
                        <p className="text text_type_digits-default">{ingredient.calories}</p>
                    </div>
                    <div>
                        <p>Белки, г</p>
                        <p className="text text_type_digits-default">{ingredient.proteins}</p>
                    </div>
                    <div>
                        <p>Жиры, г</p>
                        <p className="text text_type_digits-default">{ingredient.fat}</p>
                    </div>
                    <div>
                        <p>Углеводы, г</p>
                        <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IngredientDetails;
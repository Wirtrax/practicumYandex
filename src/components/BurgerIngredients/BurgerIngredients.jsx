import React, { useState, useEffect, useRef, useMemo } from "react";
import { Counter, CurrencyIcon, Tab as ImportedTab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientsStyle.module.css";

function Tab({ currentCategory, onCategoryChange, categories }) {
  return (
    <div style={{ display: "flex" }}>
      {categories.map(({ type, name }) => (
        <ImportedTab
          key={type}
          value={type}
          active={currentCategory === type}
          onClick={() => onCategoryChange(type)}
        >
          {name}
        </ImportedTab>
      ))}
    </div>
  );
}

function IngredientCategory({ type, name, ingredients, onIngredientClick, categoryRefs, counts }) {
  return (
    <div key={type} ref={(el) => (categoryRefs.current[type] = el)}>
      <h3 className="text text_type_main-medium pb-6 pt-10">{name}</h3>
      <div className={styles.mainContainer}>
        {ingredients.map((ingredient) => (
          <div
            key={ingredient._id}
            className="pl-4 pr-6 pb-8"
            style={{ position: "relative" }}
            onClick={() => onIngredientClick(ingredient)}
          >
            {counts[ingredient._id] > 0 && <Counter count={counts[ingredient._id]} />}
            <img src={ingredient.image} alt={ingredient.name} className="pl-4 pr-4 pb-1" style={{ width: "200px" }} />
            <p className={`${styles.priceGroup} text text_type_digits-default`}>
              <CurrencyIcon /> {ingredient.price}
            </p>
            <h4 className="text text_type_main-default">{ingredient.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

function BurgerIngredients({ ingredients, onIngredientClick }) {
  const [currentCategory, setCurrentCategory] = useState("bun");
  const [counts, setCounts] = useState({});
  const categoryRefs = useRef({});

  const categories = useMemo(() => [
    { type: "bun", name: "Булки" },
    { type: "sauce", name: "Соусы" },
    { type: "main", name: "Начинки" },
  ], []);

  const categorizedIngredients = useMemo(() => {
    return categories.reduce((acc, { type }) => {
      acc[type] = ingredients.filter((ingredient) => ingredient.type === type);
      return acc;
    }, {});
  }, [categories, ingredients]);

  useEffect(() => {
    if (categoryRefs.current[currentCategory]) {
      categoryRefs.current[currentCategory].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentCategory]);

  const handleIngredientClick = (ingredient) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [ingredient._id]: (prevCounts[ingredient._id] || 0) + 1,
    }));
    onIngredientClick(ingredient);
  };

  return (
    <div>
      <p className="text text_type_main-large pb-5 pt-10">Соберите бургер</p>
      <div style={{ maxWidth: "600px" }}>
        <Tab currentCategory={currentCategory}
          onCategoryChange={setCurrentCategory}
          categories={categories} />
        <div className={styles.scrollContainer}>
          {categories.map(({ type, name }) => (
            <IngredientCategory
              key={type}
              type={type}
              name={name}
              ingredients={categorizedIngredients[type]}
              onIngredientClick={handleIngredientClick}
              categoryRefs={categoryRefs}
              counts={counts}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(BurgerIngredients);

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon, Tab as ImportedTab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientsStyle.module.css";
import { TabPropTypes, IngredientCategoryPropTypes, IngredientPropTypes, BurgerIngredientsPropTypes } from './burgerIngredients.propTypes.js';

Tab.propTypes = TabPropTypes;
IngredientCategory.propTypes = IngredientCategoryPropTypes;
Ingredient.propTypes = IngredientPropTypes;
BurgerIngredients.propTypes = BurgerIngredientsPropTypes;

function Tab({ currentCategory, onCategoryChange, categories, categoryRefs }) {
  const handleTabClick = (type) => {
    onCategoryChange(type);
    const section = categoryRefs.current[type];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.tabContainer}>
      {categories.map(({ type, name }) => (
        <ImportedTab
          key={type}
          value={type}
          active={currentCategory === type}
          onClick={() => handleTabClick(type)}
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
          <Ingredient
            key={ingredient._id}
            ingredient={ingredient}
            onIngredientClick={onIngredientClick}
            counts={counts}
          />
        ))}
      </div>
    </div>
  );
}

function Ingredient({ ingredient, onIngredientClick, counts }) {
  const [, drag] = useDrag({
    type: 'ingredient',
    item: { ingredient },
  });

  return (
    <div
      ref={drag}
      className={`${styles.carIngridient} pl-4 pr-6 pb-8`}
      onClick={() => onIngredientClick(ingredient)}
    >
      {counts[ingredient._id] > 0 && <Counter count={counts[ingredient._id]} />}
      <img src={ingredient.image} alt={ingredient.name} className={`${styles.igridientImg} pl-4 pr-4 pb-1`} />
      <p className={`${styles.priceGroup} text text_type_digits-default`}>
        <CurrencyIcon /> {ingredient.price}
      </p>
      <h4 className="text text_type_main-default">{ingredient.name}</h4>
    </div>
  );
}

function BurgerIngredients({ onIngredientClick }) {
  const [currentCategory, setCurrentCategory] = useState('bun');
  const { ingredients } = useSelector((state) => state.ingredients);
  const { counts } = useSelector((state) => state.burgerConstructor);
  const categoryRefs = useRef({});
  const scrollContainerRef = useRef(null);

  const categories = useMemo(() => [
    { type: 'bun', name: 'Булки' },
    { type: 'sauce', name: 'Соусы' },
    { type: 'main', name: 'Начинки' },
  ], []);

  const categorizedIngredients = useMemo(() => {
    return categories.reduce((acc, { type }) => {
      acc[type] = ingredients.filter((ingredient) => ingredient.type === type);
      return acc;
    }, {});
  }, [categories, ingredients]);

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const containerTop = scrollContainer.getBoundingClientRect().top;
    let closestCategory = null;
    let closestDistance = Infinity;

    categories.forEach(({ type }) => {
      const section = categoryRefs.current[type];
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const distance = Math.abs(sectionTop - containerTop);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestCategory = type;
        }
      }
    });

    if (closestCategory && closestCategory !== currentCategory) {
      setCurrentCategory(closestCategory);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [currentCategory]);

  return (
    <div>
      <p className="text text_type_main-large pb-5 pt-10">Соберите бургер</p>
      <div className={styles.BurgerIngredientsContainer}>
        <Tab
          currentCategory={currentCategory}
          onCategoryChange={setCurrentCategory}
          categories={categories}
          categoryRefs={categoryRefs}
        />
        <div className={styles.scrollContainer} ref={scrollContainerRef}>
          {categories.map(({ type, name }) => (
            <IngredientCategory
              key={type}
              type={type}
              name={name}
              ingredients={categorizedIngredients[type]}
              onIngredientClick={onIngredientClick}
              categoryRefs={categoryRefs}
              counts={counts}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BurgerIngredients;

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Counter,
  CurrencyIcon,
  Tab as ImportedTab,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientsStyle.module.css";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import type { Ingredient } from "../../types/ingredient";
import {
  addIngredient,
  removeIngredient,
} from "../../services/actions/constructorActions";
import { createOrderAction } from "../../services/actions/orderActions";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

interface TabProps {
  currentCategory: string;
  onCategoryChange: (type: string) => void;
  categories: { type: string; name: string }[];
  categoryRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

interface IngredientCategoryProps {
  type: string;
  name: string;
  ingredients: Ingredient[];
  categoryRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  counts: Record<string, number>;
  onAddIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (ingredientId: string) => void;
}

interface IngredientProps {
  ingredient: Ingredient;
  count: number;
  onAddIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (ingredientId: string) => void;
}

const Tab: React.FC<TabProps> = ({
  currentCategory,
  onCategoryChange,
  categories,
  categoryRefs,
}) => {
  const handleTabClick = (type: string) => {
    onCategoryChange(type);
    const section = categoryRefs.current[type];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
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
};

const IngredientCategory: React.FC<IngredientCategoryProps> = ({
  type,
  name,
  ingredients,
  categoryRefs,
  counts,
  onAddIngredient,
  onRemoveIngredient,
}) => {
  return (
    <div
      key={type}
      ref={(el) => (categoryRefs.current[type] = el)}
      data-testid={`ingredient-section-${type}`}
    >
      <h3 className="text text_type_main-medium pb-6 pt-10">{name}</h3>
      <div className={styles.mainContainer}>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            ingredient={ingredient}
            count={counts[ingredient._id] || 0}
            onAddIngredient={onAddIngredient}
            onRemoveIngredient={onRemoveIngredient}
          />
        ))}
      </div>
    </div>
  );
};

const Ingredient: React.FC<IngredientProps> = ({
  ingredient,
  count,
  onAddIngredient,
  onRemoveIngredient,
}) => {
  return (
    <div className={`${styles.carIngridient} pl-4 pr-6 pb-8`}>
      {count > 0 && (
        <Button
          type="secondary"
          size="small"
          htmlType="button"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            onRemoveIngredient(ingredient._id);
          }}
          extraClass={styles.removeButton}
          data-testid={`remove-${ingredient._id}`}
        >
          -
        </Button>
      )}
      <div onClick={() => onAddIngredient(ingredient)}>
        {count > 0 && <Counter count={count} />}
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={`${styles.igridientImg} pl-4 pr-4 pb-1`}
        />
        <p className={`${styles.priceGroup} text text_type_digits-default`}>
          {ingredient.price} <CurrencyIcon type="primary" />
        </p>
        <h4 className="text text_type_main-default">{ingredient.name}</h4>
      </div>
    </div>
  );
};

export const BurgerIngredientsMobile: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState("bun");
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const {
    bun,
    ingredients: constructorIngredients,
    counts,
  } = useAppSelector((state) => state.burgerConstructor);
  const { isAuth: isAuthFromAuth } = useAppSelector((state) => state.auth);
  const { isAuth: isAuthFromRefresh, isAuthChecked } = useAppSelector(
    (state) => state.refreshToken
  );

  const isAuthenticated = isAuthFromAuth || isAuthFromRefresh;
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const isOrderProcessingRef = useRef(false);

  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categories = useMemo(
    () => [
      { type: "bun", name: "Булки" },
      { type: "sauce", name: "Соусы" },
      { type: "main", name: "Начинки" },
    ],
    []
  );

  const categorizedIngredients = useMemo(() => {
    return categories.reduce((acc, { type }) => {
      acc[type] = ingredients.filter((ingredient) => ingredient.type === type);
      return acc;
    }, {} as Record<string, Ingredient[]>);
  }, [categories, ingredients]);

  const totalPrice = useMemo(() => {
    const ingredientsPrice = constructorIngredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    const bunPrice = bun ? bun.price * 2 : 0;
    return ingredientsPrice + bunPrice;
  }, [bun, constructorIngredients]);

  const handleAddIngredient = (ingredient: Ingredient) => {
    dispatch(addIngredient(ingredient));
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    const index = [...constructorIngredients]
      .map((ing) => ing._id)
      .lastIndexOf(ingredientId);

    if (index !== -1) {
      dispatch(removeIngredient(index));
    }
  };

  const handleCreateOrder = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!bun || isOrderProcessingRef.current) return;

    isOrderProcessingRef.current = true;
    setIsOrderProcessing(true);

    try {
      const ingredientIds = [
        bun._id,
        ...constructorIngredients.map((ingredient) => ingredient._id),
        bun._id,
      ];

      await dispatch(createOrderAction(ingredientIds));
    } catch (error) {
      console.error("Ошибка создания заказа:", error);
    } finally {
      isOrderProcessingRef.current = false;
      setIsOrderProcessing(false);
    }
  };

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
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
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
              categoryRefs={categoryRefs}
              counts={counts}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
            />
          ))}
        </div>
      </div>
      <div className={styles.orderSection}>
        <span className="text text_type_digits-medium pr-2">
          {totalPrice} <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleCreateOrder}
          disabled={!bun || isOrderProcessing}
        >
          {isOrderProcessing ? "Создание заказа..." : "Оформить заказ"}
        </Button>
        {isOrderProcessing && <Loader />}
      </div>
    </div>
  );
};

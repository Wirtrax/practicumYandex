import React, { useMemo, useState, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";

import {
  addIngredient,
  removeIngredient,
  moveIngredient,
} from "../../services/actions/constructorActions";
import { createOrderAction } from "../../services/actions/orderActions";
import { connectUserOrders } from "../../services/actions/userOrdersActions";

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./BurgerConstructor.module.css";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { ConstructorIngredient } from "../../types/ingredient";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

interface BurgerConstructorProps {
  openOrderModal: () => void;
}

interface DraggableIngredientProps {
  ingredient: ConstructorIngredient;
  index: number;
  moveIngredientHandler: (fromIndex: number, toIndex: number) => void;
  removeIngredient: () => void;
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
  openOrderModal,
}) => {
  const dispatch = useAppDispatch();
  const { bun, ingredients = [] } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const { isAuth: isAuthFromAuth } = useAppSelector((state) => state.auth);
  const { isAuth: isAuthFromRefresh, isAuthChecked } = useAppSelector(
    (state) => state.refreshToken
  );
  const navigate = useNavigate();
  const isAuthenticated = isAuthFromAuth || isAuthFromRefresh;
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const isOrderProcessingRef = useRef(false);

  const totalPrice = useMemo(() => {
    const ingredientsPrice = ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    const bunPrice = bun ? bun.price * 2 : 0;
    return ingredientsPrice + bunPrice;
  }, [bun, ingredients]);

  const [, drop] = useDrop({
    accept: "ingredient",
    drop: (item: { ingredient: ConstructorIngredient }) => {
      dispatch(addIngredient(item.ingredient));
    },
  });

  const moveIngredientHandler = (fromIndex: number, toIndex: number) => {
    dispatch(moveIngredient(fromIndex, toIndex));
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
        ...ingredients.map((ingredient) => ingredient._id),
        bun._id,
      ];
      await dispatch(createOrderAction(ingredientIds));
      openOrderModal();
      dispatch(connectUserOrders());
    } catch (error) {
      console.error("Ошибка создания заказа:", error);
    } finally {
      isOrderProcessingRef.current = false;
      setIsOrderProcessing(false);
    }
  };

  return (
    <section
      className={`${style.container} pt-25 pl-4 pr-4`}
      ref={drop}
      data-testid="constructor-drop-target"
    >
      {bun && (
        <div
          className="pb-4 pr-4"
          data-testid="constructor-bun-top"
          data-type="bun"
        >
          <ConstructorElement
            type="top"
            isLocked
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

      <div
        className={style.scrollBar}
        data-testid="constructor-main-ingredients"
      >
        {ingredients.map((ingredient, index) => (
          <DraggableIngredient
            key={`${ingredient.uuid}`}
            ingredient={ingredient}
            index={index}
            moveIngredientHandler={moveIngredientHandler}
            removeIngredient={() => dispatch(removeIngredient(index))}
            data-testid="ingredient-item"
          />
        ))}
      </div>

      {bun && (
        <div
          className="pr-4"
          data-testid="constructor-bun-bottom"
          data-type="bun"
        >
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

      <div className="pt-10">
        <span
          className="text text_type_digits-medium pr-10"
          data-testid="total-price"
        >
          {totalPrice} <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleCreateOrder}
          disabled={!bun || isOrderProcessing}
          data-testid="order-button"
        >
          {isOrderProcessing ? "Создание заказа..." : "Оформить заказ"}
        </Button>
        {isOrderProcessing && <Loader />}
      </div>
    </section>
  );
};

const DraggableIngredient: React.FC<DraggableIngredientProps> = ({
  ingredient,
  index,
  moveIngredientHandler,
  removeIngredient,
}) => {
  const [, drag] = useDrag({
    type: "constructorIngredient",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "constructorIngredient",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveIngredientHandler(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`${style.dndItem} pb-4`}
      data-testid="constructor-ingredient"
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={removeIngredient}
        data-testid="ingredient-item"
      />
    </div>
  );
};

export default BurgerConstructor;

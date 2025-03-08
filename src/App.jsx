import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { fetchIngredients } from './services/actions/ingredientsActions';
import { clearCurrentIngredient, setCurrentIngredient } from './services/actions/ingredientDetailsActions';
import { createOrderAction } from './services/actions/orderActions';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from "./components/AppHeader/AppHeader.jsx";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor.jsx";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients.jsx";
import OrderDetails from "./components/Modal/OrderModal/OrderDetails";
import IngredientDetails from "./components/Modal/IngredientDetails/IngredientDetails.jsx";
import Modal from "./components/Modal/Modal.jsx";

import style from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const { currentIngredient } = useSelector((state) => state.ingredientDetails);
  const { orderNumber } = useSelector((state) => state.order);
  const { bun, ingredients: constructorIngredients } = useSelector((state) => state.burgerConstructor);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleIngredientClick = (ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
  };

  const openOrderModal = () => {
    const ingredientsIds = [
      bun?._id,
      ...constructorIngredients.map((ingredient) => ingredient._id),
      bun?._id,
    ].filter(Boolean);

    if (ingredientsIds.length > 0) {
      dispatch(createOrderAction(ingredientsIds));
      setIsOrderModalOpen(true);
    } else {
      alert('Добавьте ингредиенты в конструктор!');
    }
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={style.appGroup}>
          <BurgerIngredients onIngredientClick={handleIngredientClick} />
          <BurgerConstructor openOrderModal={openOrderModal} />
        </main>
      </DndProvider>
      {currentIngredient && (
        <Modal onClose={() => dispatch(clearCurrentIngredient())}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}

      {isOrderModalOpen && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}

    </>
  );
}

export default App;

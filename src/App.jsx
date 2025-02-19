import React, { useState, useEffect } from "react";
import AppHeader from "./components/AppHeader/AppHeader.jsx";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor.jsx";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients.jsx";
import OrderDetails from "./components/Modal/OrderModal/OrderDetails";
import InfoModal from "./components/Modal/InfoModal/InfoModal";
import Modal from "./components/Modal/Modal.jsx";

import style from './App.module.css';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [bun, setBun] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeInfoModal = () => {
    setSelectedIngredient(null);
  };

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  useEffect(() => {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((response) => response.json())
      .then((data) => {
        setIngredients(data.data);
        const buns = data.data.filter((item) => item.type === "bun");
        if (buns.length > 0) setBun(buns[0]);
      })
      .catch((error) => console.error("Error fetching ingredients:", error));
  }, []);

  return (
    <>
      <AppHeader />
      <div className={style.appGroup}>
        <BurgerIngredients ingredients={ingredients} onIngredientClick={handleIngredientClick} />
        <BurgerConstructor bun={bun} ingredients={ingredients} onOrderClick={openOrderModal} />
      </div>

      
      {selectedIngredient && (
        <Modal onClose={closeInfoModal}>
          <InfoModal ingredient={selectedIngredient} />
        </Modal>
      )}

      {isOrderModalOpen && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;

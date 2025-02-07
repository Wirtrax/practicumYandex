import React from "react";
import AppHeader from "./components/AppHeader/AppHeader.jsx";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor.jsx";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients.jsx";
import InfoModal from "./components/Modal/InfoModal/InfoModal.jsx";

function App() {
  return (
    <>
      <AppHeader />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "40px" }}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
      <InfoModal></InfoModal>
    </>
  );
}

export default React.memo(App); 

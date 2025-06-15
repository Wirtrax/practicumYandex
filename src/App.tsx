import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";

import { fetchIngredients } from './services/actions/ingredientsActions';
import { clearCurrentIngredient, setCurrentIngredient } from './services/actions/ingredientDetailsActions';
import { createOrderAction } from './services/actions/orderActions';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import OrderDetails from "./components/Modal/OrderModal/OrderDetails";
import IngredientDetails from "./components/Modal/IngredientDetails/IngredientDetails";
import Modal from "./components/Modal/Modal";
import Login from "./components/Page/Login/Login";
import Register from "./components/Page/Register/Register";
import ForgotPassword from "./components/Page/Forgot-password/ForgotPassword";
import ForgotPasswordConfirming from "./components/Page/Forgot-password/ForgotPasswordConfirming";
import Profile from "./components/Profile/Profile";
import OrderFeed from "./components/Order/Feed/OrderFeed";
import OneOrder from "./components/Order/OrderPage/OneOrder";
import OrderDetailsPage from "./components/Order/OrderPage/OrderDetailsPage";
import OrderHistory from "./components/Order/OrderHistory/OrderHistory";

import { ProtectedAuthorizedRoute } from "./components/ProtectedRoutes/ProtectedAuthorizedRoute";
import { ProtectedUnauthorizedRoute } from "./components/ProtectedRoutes/ProtectedUnauthorizedRoute"

import style from './App.module.css';

import { checkAuth } from "./services/actions/refreshTokenAction";
import { useAppDispatch, useAppSelector } from './types/hooks';
import { ConstructorIngredient, Ingredient } from './types/ingredient';
import { BurgerIngredientsMobile } from "./components/BurgerIngredients/BurgerIngredientsMobile";


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { ingredients } = useAppSelector((state) => state.ingredients);
  const { currentIngredient } = useAppSelector((state) => state.ingredientDetails);
  const { orderNumber } = useAppSelector((state) => state.order);
  const { bun, ingredients: constructorIngredients } = useAppSelector((state) => state.burgerConstructor);
  const { isAuth: isAuthFromAuth } = useAppSelector((state) => state.auth);
  const { isAuth: isAuthFromRefresh } = useAppSelector((state) => state.refreshToken);

  const isAuthenticated = isAuthFromAuth || isAuthFromRefresh;

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [backgroundLocation, setBackgroundLocation] = useState<any>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [checkSize, setCheckSize] = useState(false);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.modal) {
      setBackgroundLocation(location.state.background);
    } else {
      setBackgroundLocation(null);
    }

    if (location.pathname.startsWith('/ingredients/')) {
      const ingredientId = location.pathname.split('/')[2];
      const ingredient = ingredients.find((ing: Ingredient) => ing._id === ingredientId);

      if (ingredient) {
        dispatch(setCurrentIngredient(ingredient));

        if (isInitialLoad && !location.state?.modal) {
          setBackgroundLocation({ pathname: '/' });
        }
      }
    }

    setIsInitialLoad(false);
  }, [location, ingredients, dispatch, navigate, isInitialLoad]);

  useEffect(() => {
    const handleResize = () => {
      const windowInnerWidth = document.documentElement.clientWidth
      setCheckSize(windowInnerWidth < 750)
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const handleIngredientClick = (ingredient: Ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
    navigate(`/ingredients/${ingredient._id}`, {
      state: {
        modal: true,
        background: location
      }
    });
  };


  const openOrderModal = () => {
    const ingredientsIds = [
      bun?._id,
      ...constructorIngredients.map((ingredient: ConstructorIngredient) => ingredient._id),
      bun?._id,
    ].filter((id): id is string => id !== undefined);

    if (ingredientsIds.length > 0) {
      if (!isAuthenticated) return navigate('/login');
      dispatch(createOrderAction(ingredientsIds));
      setIsOrderModalOpen(true);
    } else {
      alert('Добавьте ингредиенты в конструктор!');
    }
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const closeIngredientModal = () => {
    dispatch(clearCurrentIngredient());
    navigate(backgroundLocation || '/', {
      replace: true,
      state: null
    });
  };

  const closeOrderDetailsModal = () => {
    const isProfileOrder = location.pathname.startsWith('/profile/orders');
    navigate(isProfileOrder ? '/profile/orders' : '/feed', {
      replace: true,
      state: null
    });
  };

  return (
    <>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route element={<ProtectedUnauthorizedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ForgotPasswordConfirming />} />
        </Route>

        <Route path="/feed" element={<OrderFeed />} />
        <Route path="/feed/:number" element={<OrderDetailsPage />} />

        <Route path="/profile" element={
          <ProtectedAuthorizedRoute>
            <Profile />
          </ProtectedAuthorizedRoute>
        } />
        <Route path="/profile/orders" element={
          <ProtectedAuthorizedRoute>
            <OrderHistory />
          </ProtectedAuthorizedRoute>
        } />
        <Route path="/profile/orders/:number" element={
          <ProtectedAuthorizedRoute>
            <OrderDetailsPage />
          </ProtectedAuthorizedRoute>
        } />

        <Route path='/' element={
          <DndProvider backend={HTML5Backend}>
            <section className={style.appGroup}>
              {!checkSize ? (
                <>
                  <BurgerIngredients onIngredientClick={(ingredient) => handleIngredientClick(ingredient)} />
                  <BurgerConstructor openOrderModal={openOrderModal} />
                </>
              ) :
                <BurgerIngredientsMobile />
              }
            </section>
          </DndProvider>
        } />

        <Route path="/ingredients/:id" element={
          <div className={style.ingredientPage}>
            <IngredientDetails />
          </div>
        } />
      </Routes>

      {backgroundLocation && currentIngredient && (
        <Modal onClose={closeIngredientModal}>
          <IngredientDetails />
        </Modal>
      )}

      {backgroundLocation && (
        <Routes>
          <Route path="/feed/:number" element={
            <Modal onClose={closeOrderDetailsModal}>
              <OneOrder />
            </Modal>
          } />
          <Route path="/profile/orders/:number" element={
            <Modal onClose={closeOrderDetailsModal}>
              <OneOrder />
            </Modal>
          } />
        </Routes>
      )}

      {isOrderModalOpen && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails orderNumber={orderNumber ?? 0} />
        </Modal>
      )}
    </>
  );
}

export default App;
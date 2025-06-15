import { FC, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OnceIng from "./OnceIng";
import style from './OneOrder.module.css';
import { getOrderDetails } from '../../../services/actions/orderDetailsActions';
import { fetchIngredients } from '../../../services/actions/ingredientsActions';
import Loader from '../../Loader/Loader';
import { Order } from '../../../types/order';
import { RootState } from '../../../types/store';
import { Ingredient } from '../../../types/ingredient';
import { useAppDispatch, useAppSelector } from '../../../types/hooks';

const OneOrder: FC = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { orders: wsOrders = [] } = useAppSelector((state: RootState) => state.ws);
  const { currentOrder, isLoading: isOrderLoading, error: orderError } = useAppSelector((state: RootState) => state.orderDetails);
  const { ingredients: allIngredients = [], loading: isIngredientsLoading } = useAppSelector((state: RootState) => state.ingredients);

  const orderFromState = location.state?.orderData as Order | undefined;

  useEffect(() => {
    if (allIngredients.length === 0) {
      dispatch(fetchIngredients());
    }

    if (!orderFromState && !wsOrders.find(o => o.number === Number(number))) {
      const orderNumber = Number(number);
      if (!isNaN(orderNumber)) {
        dispatch(getOrderDetails(orderNumber));
      }
    }
  }, [number, wsOrders, dispatch, orderFromState, allIngredients.length]);

  const ingredientsMap = allIngredients.reduce((acc: Record<string, Ingredient>, ingredient) => {
    acc[ingredient._id] = ingredient;
    return acc;
  }, {});

  const order = orderFromState ||
    wsOrders.find(o => o.number === Number(number)) ||
    currentOrder;

  const isLoading = isOrderLoading || (allIngredients.length === 0 && isIngredientsLoading);

  if (isLoading) return <Loader />;

  if (orderError) return (
    <div className={style.error}>
      <p className="text text_type_main-medium text_color_error">
        {orderError}
      </p>
    </div>
  );

  if (!order) return (
    <div className={style.error}>
      <p className="text text_type_main-medium">
        Заказ не найден
      </p>
    </div>
  );

  const ingredientsCount: Record<string, number> = {};
  order.ingredients.forEach(id => {
    ingredientsCount[id] = (ingredientsCount[id] || 0) + 1;
  });
  const uniqueIngredients = Object.keys(ingredientsCount);

  const totalPrice = uniqueIngredients.reduce((sum, id) => {
    return sum + (ingredientsMap[id]?.price || 0) * ingredientsCount[id];
  }, 0);

  return (
    <section className={style.oneOrder}>
      <h3 className="text text_type_digits-default pb-10">#{order.number}</h3>
      <h1 className="text text_type_main-medium pb-3">{order.name}</h1>
      <p className="text text_type_main-default pb-15" style={{ color: order.status === 'done' ? '#00CCCC' : 'white' }}>
        {order.status === 'done' ? 'Выполнен' : 'В работе'}
      </p>

      <h2 className="text text_type_main-medium pb-6">Состав</h2>

      <div className={style.scrollFood}>
        {uniqueIngredients.map((id) => {
          const ingredient = ingredientsMap[id];
          return (
            <OnceIng
              key={id}
              ingredient={ingredient}
              count={ingredientsCount[id]}
            />
          );
        })}
      </div>

      <div className={style.footer}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
        <div className={style.price}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};

export default OneOrder;
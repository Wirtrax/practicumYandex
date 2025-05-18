import { getCookie } from '../utils/cookies';

export const WS_USER_ORDERS_CONNECTION_START = 'WS_USER_ORDERS_CONNECTION_START';
export const WS_USER_ORDERS_CONNECTION_SUCCESS = 'WS_USER_ORDERS_CONNECTION_SUCCESS';
export const WS_USER_ORDERS_CONNECTION_ERROR = 'WS_USER_ORDERS_CONNECTION_ERROR';
export const WS_USER_ORDERS_CONNECTION_CLOSED = 'WS_USER_ORDERS_CONNECTION_CLOSED';
export const WS_GET_USER_ORDERS = 'WS_GET_USER_ORDERS';

export const connectUserOrders = () => {
    const token = getCookie('accessToken');
    const cleanToken = token ? token.replace('Bearer ', '') : '';
    return {
        type: WS_USER_ORDERS_CONNECTION_START,
        payload: `wss://norma.nomoreparties.space/orders?token=${cleanToken}`
    };
};
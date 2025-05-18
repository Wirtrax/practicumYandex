import {
    WS_USER_ORDERS_CONNECTION_START,
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_GET_USER_ORDERS
} from '../services/actions/userOrdersActions';
import { Middleware } from 'redux';
import { AppDispatch, RootState } from '../types/store';

export const wsUserOrdersMiddleware = (): Middleware<{}, RootState, AppDispatch> => {
    return (store) => {
        let socket: WebSocket | null = null;

        return (next) => (action: any) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === WS_USER_ORDERS_CONNECTION_START) {
                socket = new WebSocket(payload as string);
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: WS_USER_ORDERS_CONNECTION_SUCCESS });
                };

                socket.onerror = () => {
                    dispatch({
                        type: WS_USER_ORDERS_CONNECTION_ERROR,
                        payload: 'WebSocket error'
                    });
                };

                socket.onclose = () => {
                    dispatch({ type: WS_USER_ORDERS_CONNECTION_CLOSED });
                };

                socket.onmessage = (event: MessageEvent) => {
                    const data = JSON.parse(event.data);
                    dispatch({
                        type: WS_GET_USER_ORDERS,
                        payload: data
                    });
                };
            }

            next(action);
        };
    };
};
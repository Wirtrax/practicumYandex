import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../services/actions/wsActions';
import { fetchIngredients } from '../services/actions/ingredientsActions';
import { Middleware } from 'redux';
import { AppDispatch, RootState } from '../types/store';
import { Order } from '../types/order';
import { Ingredient } from '../types/ingredient';

export const wsMiddleware = (): Middleware<{}, RootState, AppDispatch> => {
    return (store) => {
        let socket: WebSocket | null = null;

        return (next) => (action: any) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === WS_CONNECTION_START) {
                if (socket) {
                    socket.close();
                }

                socket = new WebSocket(payload as string);

                socket.onopen = () => {
                    dispatch({ type: WS_CONNECTION_SUCCESS });
                    dispatch(fetchIngredients());
                };

                socket.onerror = () => {
                    dispatch({
                        type: WS_CONNECTION_ERROR,
                        payload: 'WebSocket error'
                    });
                };

                socket.onclose = () => {
                    dispatch({ type: WS_CONNECTION_CLOSED });
                };

                socket.onmessage = (event: MessageEvent) => {
                    try {
                        const data = JSON.parse(event.data) as {
                            orders?: Order[];
                            total?: number;
                            totalToday?: number;
                        };

                        const state = store.getState();
                        const ingredientsMap = state.ingredients.ingredients.reduce(
                            (acc: Record<string, Ingredient>, item: Ingredient) => {
                                acc[item._id] = item;
                                return acc;
                            },
                            {}
                        );

                        dispatch({
                            type: WS_GET_MESSAGE,
                            payload: {
                                orders: data.orders || [],
                                total: data.total || 0,
                                totalToday: data.totalToday || 0,
                                ingredientsMap
                            }
                        });
                    } catch (error) {
                        console.error('Error parsing WebSocket message:', error);
                    }
                };
            }

            next(action);
        };
    };
};
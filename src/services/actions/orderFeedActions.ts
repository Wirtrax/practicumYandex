import { WS_CONNECTION_START } from './wsActions';

export const connectFeed = () => ({
    type: WS_CONNECTION_START,
    payload: 'wss://norma.nomoreparties.space/orders/all'
});
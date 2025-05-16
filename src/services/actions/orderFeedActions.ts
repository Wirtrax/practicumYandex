import { WS_CONNECTION_START, WS_DISCONNECT } from './wsActions';

export const connectFeed = () => ({
    type: WS_CONNECTION_START,
    payload: 'wss://norma.nomoreparties.space/orders/all'
});

export const disconnectFeed = () => ({
    type: WS_DISCONNECT
});
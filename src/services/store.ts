import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import { wsMiddleware } from '../middleware/wsMiddleware';
import { wsUserOrdersMiddleware } from '../middleware/userOrdersMiddleware';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            wsMiddleware(),
            wsUserOrdersMiddleware()
        ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
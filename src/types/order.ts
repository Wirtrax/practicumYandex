import { Ingredient } from './ingredient';

export type Order = {
    _id: string;
    ingredients: string[];
    status: 'created' | 'pending' | 'done';
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
};

export type OrderResponse = {
    success: boolean;
    orders: Order[];
    total?: number;
    totalToday?: number;
};

export type FullOrder = Omit<Order, 'ingredients'> & {
    ingredients: Ingredient[];
    price: number;
    statusText: string;
    dateText: string;
};

export type WSOrderData = {
    orders: Order[];
    total: number;
    totalToday: number;
};

export type OrderState = {
    orderNumber: number | null;
    loading: boolean;
    error: string | null;
    currentOrder: Order | null;
};

export type CreateOrderResponse = {
    success: boolean;
    name: string;
    order: {
        number: number;
    };
};

export type OrderStatus = {
    text: string;
    color: string;
};

export type OrderStatuses = {
    [key in Order['status']]: OrderStatus;
};

export const ORDER_STATUSES: OrderStatuses = {
    created: {
        text: 'Создан',
        color: 'white'
    },
    pending: {
        text: 'Готовится',
        color: 'white'
    },
    done: {
        text: 'Выполнен',
        color: '#00CCCC'
    }
};

export type OrderHistory = {
    orders: Order[];
    total: number;
    totalToday: number;
};

export type UserOrdersResponse = {
    success: boolean;
    orders: Order[];
    total: number;
    totalToday: number;
};

export type OrderIngredientsCount = Record<string, number>;
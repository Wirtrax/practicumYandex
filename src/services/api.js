import { request } from "./utils/api";

export const getIngredients = async () => {
    return request('/ingredients');
};

export const createOrder = async (ingredients) => {
    return request('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
    });
};
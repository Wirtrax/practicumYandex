const API_URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = async () => {
    const response = await fetch(`${API_URL}/ingredients`);
    if (!response.ok) {
        throw new Error('Ошибка при получении ингредиентов');
    }
    return response.json();
};

export const createOrder = async (ingredients) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
    });
    if (!response.ok) {
        throw new Error('Ошибка при создании заказа');
    }
    return response.json();
};
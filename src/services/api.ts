import { request } from "./utils/api";
import { User } from '../types/user';

// Ingredients
export const getIngredients = async (): Promise<{
    success: boolean;
    data: any
}> => {
    return request('/ingredients');
};

export const createOrder = async (ingredients: string[]): Promise<{
    success: boolean;
    order: { number: number }
}> => {
    return request('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
    });
};

// Authentication
export const register = async (email: string, password: string, name: string): Promise<{
    success: boolean;
    user: User;
    accessToken: string;
    refreshToken: string
}> => {
    return request('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
    });
};

export const login = async (email: string, password: string): Promise<{
    success: boolean;
    user: User;
    accessToken: string;
    refreshToken: string
}> => {
    return request('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
};

export const refreshToken = async (refreshToken: string): Promise<{
    success: boolean;
    accessToken: string;
    refreshToken: string
}> => {
    return request('/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken }),
    });
};

export const getUser = async (accessToken: string): Promise<{
    success: boolean;
    user: User
}> => {
    return request('/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const updateUser = async (
    email: string,
    name: string,
    password: string,
    accessToken: string
): Promise<{
    success: boolean;
    user: User
}> => {
    return request('/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ email, name, password }),
    });
};

export const forgotPassword = async (email: string): Promise<{
    success: boolean;
    message: string
}> => {
    return request('/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
};

export const resetPassword = async (password: string, token: string): Promise<{
    success: boolean;
    message: string
}> => {
    return request('/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
    });
};
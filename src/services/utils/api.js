import { checkResponse } from "./responseChek";

const API_URL = 'https://norma.nomoreparties.space/api';

export const request = (endpoint, options = {}) => {
    return fetch(`${API_URL}${endpoint}`, options).then(checkResponse);
};
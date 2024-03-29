const BASE_URL = 'https://norma.nomoreparties.space/api';
const WS_URL = 'wss://norma.nomoreparties.space';

export const WS_ORDERS_URL = `${WS_URL}/orders`;
//
export const API_INGREDIENTS_URL = `${BASE_URL}/ingredients`;
export const API_ORDER_URL = `${BASE_URL}/orders`;
//
export const API_AUTH_REG = `${BASE_URL}/auth/register`;
export const API_AUTH_LOGIN = `${BASE_URL}/auth/login`;
export const API_AUTH_LOGOUT = `${BASE_URL}/auth/logout`;
export const API_AUTH_TOKEN = `${BASE_URL}/auth/token`;
//
export const API_USER_REQUEST = `${BASE_URL}/auth/user`;
//
export const API_PASSWORD_STEP1_URL = `${BASE_URL}/password-reset`;
export const API_PASSWORD_STEP2_URL = `${BASE_URL}/password-reset/reset`;

export const INGREDIENT_TYPES = {
  BUN: {
    TYPE: 'bun',
    NAME: 'Булки',
  },
  MAIN: {
    TYPE: 'main',
    NAME: 'Основные',
  },
  SAUCE: {
    TYPE: 'sauce',
    NAME: 'Соусы',
  },
};

import axios from 'axios';
import { camelCase, snakeCase } from './axios-helper';

// this can be exported as default,
// but I like to keep it like this, just in case we have multiple axios instances
// eslint-disable-next-line import/prefer-default-export
export const api = axios.create({
  baseURL: process.env.VUE_APP_API_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios middleware to convert all api responses to camelCase
api.interceptors.response.use(camelCase);

// Axios middleware to convert all api requests to snake_case
api.interceptors.request.use(snakeCase);

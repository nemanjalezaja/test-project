import { camelizeKeys, decamelizeKeys } from 'humps';

// Axios middleware to convert all api requests to snake_case
export const snakeCase = ((config) => {
  const newConfig = { ...config };
  newConfig.url = `${config.url}`;
  if (newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig;
  if (config.params) newConfig.params = decamelizeKeys(config.params);
  if (config.data) newConfig.data = decamelizeKeys(config.data);
  return newConfig;
});

// Axios middleware to convert all api responses to camelCase
export const camelCase = ((response) => {
  const res = { ...response };
  if (res.data && res.headers['content-type'].includes('application/json')) {
    res.data = camelizeKeys(res.data);
  }
  return res;
});

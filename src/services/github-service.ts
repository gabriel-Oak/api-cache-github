import axios from 'axios';
import { HttpError } from '../utils/errors';

const githubService = axios.create({
  baseURL: 'https://api.github.com/'
});

githubService.interceptors.request.use((config) => {
  config.headers.accept = 'application/vnd.github.v3+json';
  return config;
});

githubService.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response = {} } = error;
    const err = new HttpError({
      statusCode: response.status || 500,
      message: response.status
        ? response.data.message || 'Desculpe, tem algo dando errado com o github'
        : 'Parece que não conseguimos acessar o github',
    });

    return Promise.reject(err);
  },
);



export default githubService;
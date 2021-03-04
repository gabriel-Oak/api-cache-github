import axios from 'axios';

const githubService = axios.create({
  baseURL: 'https://api.github.com/'
});

githubService.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response = {} } = error;

    if (response.status >= 500) {
      error.message = response.data.message || 'Erro desconhecido, contate o suporte!';
    } else if (!response.status) {
      error.message = 'Parece que um de nossos serviços está fora do ar.';
    } else {
      error.message = response.data.message;
    }

    return Promise.reject(error);
  },
);



export default githubService;
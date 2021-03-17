import { AxiosInstance } from "axios";
import axios from 'axios';

export const imgbbClient = axios.create({
  baseURL: 'https://api.imgbb.com'
});

imgbbClient.interceptors.request.use((config) => {
  const { params = {} } = config;
  config.headers['content-type'] = "application/x-www-form-urlencoded;charset=UTF-8"
  config.params = {
    ...params,
    key: process.env.IMGBB_KEY,
  }
  return config;
});

imgbbClient.interceptors.response.use(
  (response) => response.data,
  (e) => {
    const { response = { data: {} } } = e;
    const err = {
      statusCode: response.status || 500,
      message: response.data.error
        ? response.data.error.message || 'Desculpe, erro com o servidor de imagens'
        : 'Parece que não conseguimos acessar servidor de imagens',
    };

    return Promise.reject(err);
  },
);

export interface UploadFileParams {
  image: string;
  name: string;
}

export class ImgbbService {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;

    this.uploadFile = this.uploadFile.bind(this);
  }

  async uploadFile(params: UploadFileParams) {
    const form = new URLSearchParams(params as unknown as Record<string, string>);
    return this.client.post('/1/upload', form);
  }
}

const imgbbService = new ImgbbService(imgbbClient);
export default imgbbService;
import { AxiosResponse } from 'axios';
import axiosInstance from '../axiosInstance';

const ApiUrl = '/auth/login';

type Params = {
  email: string;
  password: string;
};

const callLoginApi = (credentials: Params): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(ApiUrl, credentials)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export default callLoginApi;

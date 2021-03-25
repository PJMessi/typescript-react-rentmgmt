import { AxiosResponse } from 'axios';
import axiosInstance from '../axiosInstance';

const ApiUrl = '/rooms';

const callFetchRoomsApi = (): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(ApiUrl)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export default callFetchRoomsApi;

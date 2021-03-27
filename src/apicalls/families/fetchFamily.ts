import { AxiosResponse } from 'axios';
import axiosInstance from '../axiosInstance';

const ApiUrl = '/families/:familyId';

const callFetchFamilyApi = (familyId: number): Promise<AxiosResponse> => {
  const RoomApiUrl = ApiUrl.replace(':familyId', familyId.toString());
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(RoomApiUrl)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export default callFetchFamilyApi;

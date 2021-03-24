import axiosInstance from './axiosInstance';
import { AppDispatch } from '../redux/store';
import { loginRequest, loginError, loginSuccess } from '../redux/auth';
import type { User } from '../redux/auth';
import { hideSnackbar, showSnackbar } from '../redux/snackbar';

/** Makes API request to login user and updates the state according to the response. */
// eslint-disable-next-line import/prefer-default-export
export const requestLogin = async (
  dispatch: AppDispatch,
  credentials: {
    email: string;
    password: string;
  }
): Promise<void> => {
  const loginApi = '/auth/login';
  dispatch(loginRequest());

  try {
    const apiResult = await axiosInstance.post(loginApi, credentials);

    const {
      token,
      user,
    }: {
      token: string;
      user: User;
    } = apiResult.data.data;

    dispatch(loginSuccess({ token, user }));

    // error snackbar shows if user puts invalid credentials. So if user tries again by putting valid
    // credentials and if the error snackbar is still showing, hide it.
    dispatch(hideSnackbar());
  } catch (error) {
    if (error.response) {
      const errorMessage: string = error.response.data.message;
      dispatch(showSnackbar({ message: errorMessage, type: 'error' }));
      dispatch(
        loginError({
          error: {
            message: errorMessage,
          },
        })
      );
    }
  }
};

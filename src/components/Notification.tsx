import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { hideSnackbar } from '../redux/snackbar';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomizedSnackbars = (): JSX.Element => {
  const { open, message, type } = useAppSelector((state) => state.snackbar);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideSnackbar());
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type === null ? undefined : type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbars;

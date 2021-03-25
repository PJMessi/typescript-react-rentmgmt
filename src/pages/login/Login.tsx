import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Copyright from '../../components/Copyright';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { requestLogin } from '../../redux/authSlice';
import useStyles from './loginStyles';

type LoginFormAttributes = {
  email: string;
  password: string;
};

const Login = (): JSX.Element => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const location = useLocation<{ from: { pathname: string } }>();
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      let redirectLocation = location.state.from;
      if (!redirectLocation) redirectLocation = { pathname: '/' };

      history.replace(redirectLocation);
    }
  }, [isLoggedIn, location, history]);

  const { register, handleSubmit, errors } = useForm<LoginFormAttributes>();
  const handleLoginForm = (data: LoginFormAttributes) => {
    dispatch(requestLogin(data));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(handleLoginForm)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            name="email"
            inputRef={register({ required: true })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            name="password"
            inputRef={register({ required: true })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                Dont have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;

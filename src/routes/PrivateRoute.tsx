import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import MainLayout from '../components/layouts/main/MainLayout';
import { useAppSelector } from '../redux/store';

const PrivateRoute = ({
  children,
  ...rest
}: { children: JSX.Element } & RouteProps): JSX.Element => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  return (
    <>
      <Route
        {...rest}
        render={(props: RouteComponentProps) =>
          isLoggedIn ? (
            <MainLayout>{children}</MainLayout>
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      />
    </>
  );
};

export default PrivateRoute;

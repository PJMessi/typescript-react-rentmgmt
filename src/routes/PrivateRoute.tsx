import { Route, RouteProps } from 'react-router-dom';
import MainLayout from '../components/layouts/main.layout';

const PrivateRoute = ({
  children,
  ...rest
}: { children: JSX.Element } & RouteProps): JSX.Element => {
  return (
    <>
      <Route {...rest}>
        <MainLayout>{children}</MainLayout>
      </Route>
    </>
  );
};

export default PrivateRoute;

import { Route, RouteProps } from 'react-router-dom';
import AuthLayout from '../components/layouts/auth.layout';

const PublicRoute = ({
  children,
  ...rest
}: { children: JSX.Element } & RouteProps): JSX.Element => {
  return (
    <>
      <Route {...rest}>
        <AuthLayout>{children}</AuthLayout>
      </Route>
    </>
  );
};

export default PublicRoute;

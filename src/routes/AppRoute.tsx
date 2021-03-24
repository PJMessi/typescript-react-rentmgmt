import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRoute = (): JSX.Element => {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact>
            <Dashboard />
          </PrivateRoute>

          <PublicRoute path="/login" exact>
            <Login />
          </PublicRoute>
        </Switch>
      </Router>
    </>
  );
};

export default AppRoute;

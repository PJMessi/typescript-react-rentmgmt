import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Invoice from '../pages/invoices/Invoice';
import Dashboard from '../pages/dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Room from '../pages/rooms/Room';
import Family from '../pages/families/Family';
import Members from '../pages/members/Members';

const AppRoute = (): JSX.Element => {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact>
            <Dashboard />
          </PrivateRoute>

          <PrivateRoute path="/families" exact>
            <Family />
          </PrivateRoute>

          <PrivateRoute path="/families/:familyId/members" exact>
            <Members />
          </PrivateRoute>

          <PrivateRoute path="/rooms" exact>
            <Room />
          </PrivateRoute>

          <PrivateRoute path="/invoices" exact>
            <Invoice />
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

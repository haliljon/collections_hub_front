import { Outlet, Navigate } from 'react-router-dom';
import isAuthenticated from './components/auth/auth';

const PrivateRoute = () => {
  if (isAuthenticated()) {
    return <Outlet />;
  }
  return <Navigate to="/signin" />;
};

export default PrivateRoute;

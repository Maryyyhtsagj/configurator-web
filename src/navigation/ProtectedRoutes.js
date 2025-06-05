import { Outlet, Navigate } from 'react-router';
import Wrapper from '../components/Wrapper';

export default function ({ isAuth, unAuthorizedFirstScreen }) {
  return (isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={unAuthorizedFirstScreen} replace />
  )
  );
}

import { Outlet, Navigate } from 'react-router';
import Wrapper from '../components/Wrapper';

export default function ({ isAuth, screenToNavigate }) {
  return !isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={screenToNavigate} replace />
  );
}

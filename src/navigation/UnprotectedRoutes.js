import { Outlet, Navigate } from 'react-router';
import Wrapper from '../components/Wrapper';

export default function () {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai/index';
import { pathnameAtom } from '../atoms/globalAtoms';

const usePathnameChange = () => {
  const [, setPathname] = useAtom(pathnameAtom);
  const location = useLocation();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);
};

export default usePathnameChange;

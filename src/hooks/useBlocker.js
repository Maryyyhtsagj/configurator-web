import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useNavigationBlocker(shouldBlock, message) {
  const location = useLocation();
  const navigate = useNavigate();
  const prevLocation = useRef(location);
  const confirmed = useRef(false);

  useEffect(() => {
    if (location !== prevLocation.current && shouldBlock() && !confirmed.current) {
      if (message?.length) {
        const confirmLeave = window.confirm(message);
        if (!confirmLeave) {
          navigate(-1); // откатываем переход
        } else {
          confirmed.current = true;
          prevLocation.current = location;
        }
      }

      navigate(-1); // откатываем переход
    } else {
      prevLocation.current = location;
      confirmed.current = false;
    }
  }, [location, navigate, shouldBlock, message]);
}

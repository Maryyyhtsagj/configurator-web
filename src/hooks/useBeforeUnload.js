import { useCallback, useEffect, useRef } from 'react';

const useBeforeUnload = (message = 'Вы уверены, что хотите закрыть вкладку?') => {
  const allowReload = useRef(false); // Track if reload is intentional

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (allowReload.current) {
        allowReload.current = false; // Reset after allowing reload
        return; // Do NOT block reload
      }

      event.preventDefault();
      event.returnValue = message; // Required for modern browsers
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [message]);

  const reloadPage = useCallback(() => {
    allowReload.current = true; // Allow reload without alert
    window.location.reload();
  }, []);

  return { reloadPage };
};

export default useBeforeUnload;

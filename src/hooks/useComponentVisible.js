import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(
  initialIsVisible = false,
  { withContextMenu = false, onClickOutside } = {},
) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    // event.preventDefault();
    if (ref.current && !ref.current.contains(event.target)) {
      if (typeof onClickOutside === 'function') {
        onClickOutside();
      } else {
        setIsComponentVisible(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    if (withContextMenu) document.addEventListener('contextmenu', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      if (withContextMenu) document.removeEventListener('contextmenu', handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}

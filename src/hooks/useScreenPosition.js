import React, { useEffect, useState } from 'react';

const UseScreenPosition = (ref, scrollableRefCurrent) => {
  const [obj, setObj] = useState({
    left: 0, top: 0,
  });

  const getPositions = () => {
    const rect = ref.current.getBoundingClientRect();
    setObj({
      left: rect.left,
      top: rect.top,
    });
  };

  useEffect(() => {
    if (!ref.current) return;

    getPositions();
  }, [ref.current]);

  useEffect(() => {
    if (scrollableRefCurrent) {
      scrollableRefCurrent.addEventListener('scroll', getPositions);
    }

    return () => {
      if (scrollableRefCurrent) {
        scrollableRefCurrent.removeEventListener('scroll', getPositions);
      }
    };
  }, [scrollableRefCurrent]);

  return obj;
};

export default UseScreenPosition;

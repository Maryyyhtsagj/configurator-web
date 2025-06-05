import { useLayoutEffect, useState } from 'react';
import { useAtom } from 'jotai/index';
import { windowHeightAtom, windowWidthAtom } from '../atoms/globalAtoms';

function UseWindowSize() {
  const [, setWidth] = useAtom(windowWidthAtom);
  const [, setHeight] = useAtom(windowHeightAtom);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);
}

export default UseWindowSize;

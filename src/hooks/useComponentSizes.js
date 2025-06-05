import { useEffect, useState } from 'react';

function useComponentSizes({ componentRef, onEntryChange }, dependencies = []) {
  const [sizes, setSizes] = useState(0);

  useEffect(() => {
    if (!componentRef?.current) return;

    setSizes(componentRef.current.getBoundingClientRect());
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (typeof onEntryChange === 'function') onEntryChange(entry);

      if (componentRef.current) {
        setSizes(componentRef.current.getBoundingClientRect());
      }
    });
    resizeObserver.observe(componentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [componentRef, ...dependencies]);

  return { sizes };
}

export default useComponentSizes;

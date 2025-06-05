import { useEffect, useState } from 'react';

function CachedSvg({ src, ...p }) {
  const [dataUri, setDataUri] = useState(null);

  useEffect(() => {
    const cacheKey = `cached-svg:${src}`;

    const loadSvg = async () => {
      return;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setDataUri(cached);
        return;
      }

      try {
        const res = await fetch(src);
        const text = await res.text();
        const encoded = encodeURIComponent(text)
          .replace(/'/g, '%27')
          .replace(/"/g, '%22');
        const uri = `data:image/svg+xml,${encoded}`;

        localStorage.setItem(cacheKey, uri);
        setDataUri(uri);
      } catch (err) {
        console.error('Failed to fetch SVG:', err);
      }
    };

    loadSvg();
  }, [src]);

  return <img src={dataUri || src} {...p} />;
}

export default CachedSvg;

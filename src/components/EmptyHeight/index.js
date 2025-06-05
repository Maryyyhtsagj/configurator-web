import React from 'react';

function EmptyHeight({ height, width }) {
  return (
    <div style={{ height: `${height}px`, width: `${width}px` }} />
  );
}

export default EmptyHeight;

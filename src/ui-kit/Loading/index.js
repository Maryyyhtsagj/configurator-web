import React from 'react';
import { Oval } from 'react-loader-spinner';
import styles from './css/index.module.scss';

function Loading({
  height = 20, width = 20, className, visible, color = '#081B4D', secondaryColor,
}) {
  return (
    <div className={styles.loadingWrapper}>
      <Oval
        height={height}
        width={width}
        color={color}
        wrapperClass={className}
        visible={visible}
        ariaLabel="oval-loading"
        secondaryColor={secondaryColor || color}
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>

  );
}

export default Loading;

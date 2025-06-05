import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import Loading from '../Loading';

function IconButton({
  text,
  icon,
  onClick,
  isDisabled,
  loading,
  height = 38,
  hideTextOnMobile = false,
}) {
  const calculatedStyle = useMemo(() => ({
    height: `${height}px`,
  }), [height]);

  const handleClick = (ev) => {
    if (isDisabled || loading) return;

    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={classNames(
        styles.button,
        !loading && !isDisabled && 'pressable',
        {
          [styles.hideTextOnMobile]: hideTextOnMobile,
          [styles.disabled]: isDisabled,
        },
      )}
      style={calculatedStyle}
    >
      {loading ? <Loading color="#1A1A1A" /> : (
        <>
          <img className={styles.icon} src={icon} alt="icon" />
          <p className={styles.text}>{text}</p>
        </>
      )}
    </div>
  );
}

export default IconButton;

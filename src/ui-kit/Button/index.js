import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';

export const BUTTON_VARIANTS = {
  main: 'main',
  secondary: 'secondary',
  inverse: 'inverse',
};

function Button({
  text,
  type = '',
  onClick,
  isDisabled,
  height = 43,
  width = null, // pass null if want to fit inner content
  paddingHorizontal = 30,
  variant = BUTTON_VARIANTS.main,
}) {
  const calculatedClassName = useMemo(() => (
    {
      [styles.disabled]: isDisabled,
      [styles.main]: variant === BUTTON_VARIANTS.main,
      [styles.secondary]: variant === BUTTON_VARIANTS.secondary,
      [styles.inverse]: variant === BUTTON_VARIANTS.inverse,
    }
  ), [isDisabled, variant]);

  const calculatedStyle = useMemo(() => (
    {
      height: `${height}px`,
      width: width === null ? 'unset' : typeof width === 'string' ? width : `${width}px`,
      padding: `0 ${paddingHorizontal}px`,
    }
  ), [height, width, paddingHorizontal]);

  const handleClick = (ev) => {
    if (isDisabled) return;

    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={classNames(styles.button, calculatedClassName)}
      style={calculatedStyle}
    >
      <p className={styles.text}>{text}</p>
    </button>
  );
}

export default Button;

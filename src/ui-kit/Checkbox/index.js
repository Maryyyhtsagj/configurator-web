import React from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import TickIcon from '../../assets/icons/tickWhiteSmall.svg';

function Checkbox({
  text, value, onClick, error, disabled,
}) {
  return (
    <div
      className={classNames(styles.wrapper, (!disabled) && 'pressable')}
      onClick={disabled ? undefined : onClick}
      style={disabled ? { opacity: 0.4 } : {}}
    >
      <div className={classNames(styles.checkbox, { [styles.checkboxActive]: value, [styles.checkboxError]: error })}>
        <img src={TickIcon} alt="V" />
      </div>
      <p className={classNames(styles.text, { [styles.textError]: error })}>{text}</p>
    </div>
  );
}

export default Checkbox;

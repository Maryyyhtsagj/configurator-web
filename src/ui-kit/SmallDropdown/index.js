import React from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import ArrowBottom from '../../assets/icons/arrowBottom.svg';

function SmallDropdown({ text, onClick }) {
  return (
    <div className={classNames(styles.wrapper, 'pressable')} onClick={onClick}>
      <p className={styles.text}>{text}</p>
      <img src={ArrowBottom} alt="V" />
    </div>
  );
}

export default SmallDropdown;

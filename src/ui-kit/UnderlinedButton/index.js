import React from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';

function UnderlinedButton({ text, onClick }) {
  return (
    <div className={classNames('pressable')} onClick={onClick}>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default UnderlinedButton;

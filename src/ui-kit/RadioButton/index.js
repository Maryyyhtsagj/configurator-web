import React from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';

function RadioButton({ text, value, onClick }) {
  return (
    <div className={classNames(styles.wrapper, 'pressable')} onClick={onClick}>
      <div className={classNames(styles.radio, { [styles.radioActive]: value })}>
        <div className={styles.radioInner} />
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default RadioButton;

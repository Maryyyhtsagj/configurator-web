import React from 'react';
import styles from './css/index.module.scss';
import Loading from '../Loading';

function LoadingModal() {
  return (
    <div className={styles.loadingWrapper}>
      <Loading width={40} height={40} visible />
    </div>
  );
}

export default LoadingModal;

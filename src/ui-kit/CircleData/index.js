import React from 'react';
import styles from './css/index.module.scss';

function CircleData({ name, value }) {
  return (
    <div className={styles.characteristicsCircles}>
      <p className={styles.characteristicsCirclesNum}>{name}</p>
      <p className={styles.characteristicsCirclesValue}>{value}</p>
    </div>
  );
}

export default CircleData;

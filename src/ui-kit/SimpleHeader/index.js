import React from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';

function SimpleHeader({
  subtitle, title, isCenter, className,
}) {
  return (
    <div className={classNames(styles.header, className, { [styles.headerCenter]: isCenter })}>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {title && <p className={styles.title}>{title}</p>}
    </div>
  );
}

export default SimpleHeader;

import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import Button from '../../../../ui-kit/Button';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import { isAuthAtom } from '../../../../atoms/accountAtoms';

function WhatIs() {
  const { t } = useTranslations();
  const navigate = useNavigate();

  const onAboutClick = () => {
    navigate('/about');
  };

  return (
    <section className={styles.whatIs}>
      <div className={classNames('container')}>
        <div className={styles.whatIsInner}>
          <p className={classNames(styles.mainTitle, styles.mobileTitle)}>
            {t(DICTIONARY.whatIsTitle)}
          </p>

          <div className={styles.whatIsLeft}>
            <div className={styles.blueFrame} />
          </div>

          <div className={styles.whatIsRight}>
            <p className={classNames(styles.mainTitle, styles.desktopTitle)}>
              {t(DICTIONARY.whatIsTitle)}
            </p>

            <p className={styles.description}>
              {t(DICTIONARY.whatIsDescription1)}
              <br />
              <br />
              {t(DICTIONARY.whatIsDescription2)}
              <br />
              <br />
              {t(DICTIONARY.whatIsDescription3)}
            </p>

            <div className={styles.buttonWrapper}>
              <Button
                text={t(DICTIONARY.moreAboutConfiguratorButton)}
                onClick={onAboutClick}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatIs;

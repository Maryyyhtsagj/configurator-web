import React, { useTransition } from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import { useNavigate } from 'react-router-dom';
import styles from './css/index.module.scss';
import ConfiguratorIcon from '../../../../assets/icons/configurator.svg';
import CalculatorIcon from '../../../../assets/icons/calculator.svg';
import DownloadLightIcon from '../../../../assets/icons/downloadLight.svg';
import Button from '../../../../ui-kit/Button';
import LaptopImage from '../../../../assets/images/Laptop.png';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import { isAuthAtom } from '../../../../atoms/accountAtoms';

function Create() {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [isAuth] = useAtom(isAuthAtom);

  const onCreateClick = () => {
    navigate(isAuth ? '/configurator' : '/login');
  };

  return (
    <section className={styles.create}>
      <div className={classNames('container')}>
        <div className={styles.createWrapper}>
          <div className={styles.createLeft}>
            <p className={styles.mainTitle}>
              {t(DICTIONARY.homeCreateTitle)}
            </p>

            <div className={styles.createInner}>
              <div className={styles.createFeature}>
                <div className={styles.iconWrapper}>
                  <div className={styles.icon}>
                    <img src={ConfiguratorIcon} alt={t(DICTIONARY.configuratorFeatureTitle)} />
                  </div>
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.featureTitle}>
                    {t(DICTIONARY.configuratorFeatureTitle)}
                  </p>
                  <p className={styles.featureDescription}>
                    {t(DICTIONARY.configuratorFeatureDescription)}
                  </p>
                </div>
              </div>

              <div className={styles.createFeature}>
                <div className={styles.iconWrapper}>
                  <div className={styles.icon}>
                    <img src={CalculatorIcon} alt={t(DICTIONARY.calculatorFeatureTitle)} />
                  </div>
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.featureTitle}>
                    {t(DICTIONARY.calculatorFeatureTitle)}
                  </p>
                  <p className={styles.featureDescription}>
                    {t(DICTIONARY.calculatorFeatureDescription)}
                  </p>
                </div>
              </div>

              <div className={styles.createFeature}>
                <div className={styles.iconWrapper}>
                  <div className={styles.icon}>
                    <img src={DownloadLightIcon} alt={t(DICTIONARY.downloadFeatureTitle)} />
                  </div>
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.featureTitle}>
                    {t(DICTIONARY.downloadFeatureTitle)}
                  </p>
                  <p className={styles.featureDescription}>
                    {t(DICTIONARY.downloadFeatureDescription)}
                  </p>
                </div>
              </div>

              <div className={`${styles.buttonWrapper} ${styles.desktopButton}`}>
                <Button
                  text={t(DICTIONARY.createConfigurationButton)}
                  onClick={onCreateClick}
                />
              </div>
            </div>
          </div>

          <div className={styles.createRight}>
            <div className={styles.laptopPlaceholder}>
              <img src={LaptopImage} alt="laptop" />
            </div>
          </div>

          <div className={`${styles.buttonWrapper} ${styles.mobileButton}`}>
            <Button
              text={t(DICTIONARY.createConfigurationButton)}
              onClick={onCreateClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Create;

import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './css/index.module.scss';
import useTranslations from '../../../../hooks/useTranslations';
import SimpleHeader from '../../../../ui-kit/SimpleHeader';
import Button from '../../../../ui-kit/Button';
import { DICTIONARY } from '../../../../translations/dictionary';
import LaptopImage from '../../../../assets/images/Laptop.png';
import CalculatorIcon from '../../../../assets/icons/calculator.svg';
import DownloadLightIcon from '../../../../assets/icons/downloadLight.svg';
import ConfiguratorIcon from '../../../../assets/icons/configurator.svg';

function WhatIsConfig() {
  const { t } = useTranslations();
  const navigate = useNavigate();

  const onInstructionsClick = () => {
    navigate('/instructions');
  };

  return (
    <>
      <section className={styles.about}>
        <div className={classNames('container')}>
          <div className={styles.aboutWrapper}>
            <div className={styles.aboutLeft}>
              <div className={styles.desktopHeader}>
                <SimpleHeader
                  title={t(DICTIONARY.whatIsTitle)}
                  subtitle={t(DICTIONARY.contactFormSubTitle)}
                />
              </div>

              <div className={styles.mobileHeader}>
                <SimpleHeader
                  title={t(DICTIONARY.whatIsTitle)}
                  subtitle={t(DICTIONARY.contactFormSubTitle)}
                  isCenter
                />
              </div>

              <div className={styles.aboutInner}>
                <p className={styles.description}>
                  {t(DICTIONARY.whatIsDescription1)}
                  <br />
                  <br />
                  {t(DICTIONARY.whatIsDescription2)}
                  <br />
                  <br />
                  {t(DICTIONARY.whatIsDescription3)}
                </p>
                <div className={`${styles.buttonWrapper} ${styles.desktopButton}`}>
                  <Button
                    onClick={onInstructionsClick}
                    text={t(DICTIONARY.watchVideo)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.aboutRight}>
              <div className={styles.laptopPlaceholder}>
                <img src={LaptopImage} alt="laptop" />
              </div>
            </div>

            <div className={`${styles.buttonWrapper} ${styles.mobileButton}`}>
              <Button
                onClick={onInstructionsClick}
                text={t(DICTIONARY.watchVideo)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.aboutConfig}>
        <div className={styles.aboutConfigInner}>
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
        </div>
      </section>
    </>
  );
}

export default WhatIsConfig;

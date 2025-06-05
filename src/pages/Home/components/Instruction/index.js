import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import { useNavigate } from 'react-router-dom';
import styles from './css/index.module.scss';
import Button from '../../../../ui-kit/Button';
import ConfiguratorIcon from '../../../../assets/icons/configurator.svg';
import SigmaIcon from '../../../../assets/icons/sigma.svg';
import ChartIcon from '../../../../assets/icons/chart.svg';
import LineIcon from '../../../../assets/icons/line.svg';
import TextImage from '../../../../assets/images/Text.png';
import { windowWidthAtom } from '../../../../atoms/globalAtoms';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import { isAuthAtom } from '../../../../atoms/accountAtoms';

function Instruction() {
  const [windowWidth] = useAtom(windowWidthAtom);
  const { t } = useTranslations();
  const navigate = useNavigate();

  const scaleX = useMemo(
    () => (windowWidth >= 1270 ? 1 : windowWidth / 1400),
    [windowWidth],
  );

  const onInstructionsClick = () => {
    navigate('/instructions');
  };

  return (
    <section className={styles.instruction}>
      <div className={classNames('container')}>
        <div className={styles.instructionWrapper}>
          <div className={styles.headerWrapper}>
            <p className={styles.mainTitle}>
              {t(DICTIONARY.instructionMainTitle)}
            </p>
            <p className={styles.mainDescription}>
              {t(DICTIONARY.instructionMainDescription)}
            </p>

            <div className={`${styles.buttonWrapper} ${styles.desktopButton}`}>
              <Button
                text={t(DICTIONARY.watchVideoInstructionButton)}
                onClick={onInstructionsClick}
              />
            </div>
          </div>

          <div className={styles.instructionStepsRow}>
            <div className={classNames(styles.instructionStep, styles.stepOne)}>
              <div className={styles.stepNumberWrapper}>
                <span className={styles.stepNumber}>01</span>
                <div className={styles.stepIcon}>
                  <img src={ConfiguratorIcon} alt={t(DICTIONARY.stepOneTitle)} />
                </div>
              </div>

              <div className={styles.stepContent}>
                <p className={styles.stepTitle}>
                  {t(DICTIONARY.stepOneTitle)}
                </p>
                <p className={styles.stepDescription}>
                  {t(DICTIONARY.stepOneDescription)}
                </p>
              </div>
            </div>

            <div className={classNames(styles.instructionStep, styles.stepTwo)}>
              <div className={styles.stepNumberWrapper}>
                <span className={styles.stepNumber}>02</span>
                <div className={styles.stepIcon}>
                  <img src={SigmaIcon} alt={t(DICTIONARY.stepTwoTitle)} />
                </div>
              </div>
              <div className={styles.stepContent}>
                <p className={styles.stepTitle}>
                  {t(DICTIONARY.stepTwoTitle)}
                </p>
                <p className={styles.stepDescription}>
                  {t(DICTIONARY.stepTwoDescription)}
                </p>
              </div>
            </div>

            <div className={classNames(styles.instructionStep, styles.stepThree)}>
              <div className={styles.stepNumberWrapper}>
                <span className={styles.stepNumber}>03</span>
                <div className={styles.stepIcon}>
                  <img src={ChartIcon} alt={t(DICTIONARY.stepThreeTitle)} />
                </div>
              </div>
              <div className={styles.stepContent}>
                <p className={styles.stepTitle}>
                  {t(DICTIONARY.stepThreeTitle)}
                </p>
                <p className={styles.stepDescription}>
                  {t(DICTIONARY.stepThreeDescription)}
                </p>
              </div>
            </div>
          </div>

          <div className={classNames(styles.backgroundSvg)} style={{ transform: `scaleX(${scaleX})` }}>
            <img src={LineIcon} alt="line" />
          </div>

          <div className={styles.bottomText}>
            <img src={TextImage} alt="text" />
          </div>

          <div className={classNames(styles.buttonWrapper, styles.mobileButton)}>
            <Button
              text={t(DICTIONARY.watchVideoInstructionButton)}
              onClick={onInstructionsClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Instruction;

import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import SimpleHeader from '../../../../ui-kit/SimpleHeader';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import Button from '../../../../ui-kit/Button';
import { isAuthAtom } from '../../../../atoms/accountAtoms';

function ConfigInstructions() {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [isAuth] = useAtom(isAuthAtom);

  const onCreateClick = () => {
    navigate(isAuth ? '/configurator' : '/login');
  };

  return (
    <section className={styles.instruction}>
      <div className={classNames('container')}>
        <div className={styles.instructionInner}>
          <SimpleHeader
            title={t(DICTIONARY.configInstructionsTitle)}
            subtitle={t(DICTIONARY.configInstructionsSubTitle)}
            isCenter
          />

          <div className={styles.frameWrapper}>
            <div className={styles.blueFrame} />
          </div>

          <div className={styles.descriptionWrapper}>
            <p>
              {t(DICTIONARY.configInstructionsDescription)}
            </p>
          </div>

          <div className={styles.buttonWrapper}>
            <Button
              text={t(DICTIONARY.createConfigurationButton)}
              width="100%"
              onClick={onCreateClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfigInstructions;

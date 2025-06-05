import React from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import styles from './css/index.module.scss';
import useTranslations from '../../../../hooks/useTranslations';
import useInputState from '../../../../hooks/useInputState';
import Form, { FORM_BUTTON_TYPES, FORM_INPUT_TYPES } from '../../../../ui-kit/Form';
import { DICTIONARY } from '../../../../translations/dictionary';
import BuildingImage from '../../../../assets/images/Building.png';

function EnterPassword() {
  const { t } = useTranslations();
  const [email, setEmail, emailError, setEmailError] = useInputState('');
  const { token: tokenFromUrl } = useParams();

  console.log({ tokenFromUrl });

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!email) setEmailError('Email!!');
  };

  const inputs = [
    /*    {
      componentType: FORM_INPUT_TYPES.input,
      name: 'email',
      text: t(DICTIONARY.emailInputLabel),
      value: email,
      onChange: setEmail,
      isRequired: true,
      error: emailError,
    }, */
    {
      componentType: FORM_INPUT_TYPES.input,
      name: 'email',
      text: t(DICTIONARY.newPassword),
      value: email,
      onChange: setEmail,
      isRequired: true,
      error: emailError,
    },
    {
      componentType: FORM_INPUT_TYPES.input,
      name: 'email',
      text: t(DICTIONARY.confirmPassword),
      value: email,
      onChange: setEmail,
      isRequired: true,
      error: emailError,
    },
  ];

  const buttons = [
    {
      componentType: FORM_BUTTON_TYPES.main,
      text: t(DICTIONARY.restore),
      type: 'submit',
    },
    {
      componentType: FORM_BUTTON_TYPES.underlined,
      text: t(DICTIONARY.toLogin),
      onClick: () => console.log('to login'),
    },
    {
      componentType: FORM_BUTTON_TYPES.underlined,
      text: t(DICTIONARY.registration),
      onClick: () => console.log('register'),
    },
  ];

  return (
    <div className={styles.enterPassword}>
      <div className={classNames('container')}>
        <div className={styles.enterPasswordInner}>
          <Form
            title={t(DICTIONARY.enterPasswordFormTitle)}
            subtitle={t(DICTIONARY.passwordFormSubTitle)}
            inputs={inputs}
            buttons={buttons}
            onSubmit={onSubmit}
            source={BuildingImage}
            maxHeight="700px"
          />
        </div>
      </div>
    </div>
  );
}

export default EnterPassword;

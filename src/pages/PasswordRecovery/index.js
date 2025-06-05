import React, { useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import useInputState from '../../hooks/useInputState';
import Form, { FORM_BUTTON_TYPES, FORM_INPUT_TYPES } from '../../ui-kit/Form';
import BuildingImage from '../../assets/images/Building.png';
import useTranslations from '../../hooks/useTranslations';
import { DICTIONARY } from '../../translations/dictionary';
import sendRequest from '../../helpers/sendRequest';
import Api from '../../api';
import LocalStorageServices from '../../services/LocalStorageServices';
import { openInfoModalAtom } from '../../atoms/modalAtoms';

function PasswordRecovery() {
  const { t } = useTranslations();
  const [, openInfoModal] = useAtom(openInfoModalAtom);
  const navigate = useNavigate();
  const [email, setEmail, emailError, setEmailError] = useInputState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    if (!email) {
      setEmailError('Заполните E-mail');
      return;
    }

    const data = await sendRequest({
      request: Api.passwordRecovery,
      payload: { email },
      warnErrorText: 'while password recovery',
      setLoading,
    });

    if (data?.status === 'ok') {
      openInfoModal({
        text: data.message,
      });
    } else {
      setEmailError(data?.message || 'Неизвестная ошибка');
    }
  };

  const inputs = [
    {
      componentType: FORM_INPUT_TYPES.input,
      name: 'email',
      text: t(DICTIONARY.emailInputLabel),
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
      isDisabled: loading,
    },
    {
      componentType: FORM_BUTTON_TYPES.underlined,
      text: t(DICTIONARY.toLogin),
      onClick: () => {
        navigate('/login');
      },
    },
    {
      componentType: FORM_BUTTON_TYPES.underlined,
      text: t(DICTIONARY.registration),
      onClick: () => {
        navigate('/registration');
      },
    },
  ];

  return (
    <div className={styles.password}>
      <div className={classNames('container')}>
        <div className={styles.passwordInner}>
          <Form
            title={t(DICTIONARY.passwordFormTitle)}
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

export default PasswordRecovery;

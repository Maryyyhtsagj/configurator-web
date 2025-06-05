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
import { tokenAtom } from '../../atoms/accountAtoms';

function Login() {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);
  const [email, setEmail, emailError, setEmailError] = useInputState('');
  const [password, setPassword, passwordError, setPasswordError] = useInputState('');
  // const [checkboxValue, setCheckboxValue, checkboxValueError, setCheckboxValueError] = useInputState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    let flag = false;
    if (!email) {
      setEmailError('Заполните E-mail');
      flag = true;
    }
    if (!password) {
      setPasswordError('Заполните пароль');
      flag = true;
    }
    if (flag) return;

    const data = await sendRequest({
      request: Api.auth,
      payload: { email, password },
      warnErrorText: 'while auth',
      setLoading,
    });

    if (data?.status === 'ok') {
      LocalStorageServices.setToken(data.data.token);
      setToken(data.data.token);
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
    {
      componentType: FORM_INPUT_TYPES.input,
      name: 'password',
      text: t(DICTIONARY.passwordInputLabel),
      value: password,
      onChange: setPassword,
      isRequired: true,
      error: passwordError,
      type: 'password',
    },
    {
      componentType: FORM_INPUT_TYPES.checkbox,
      text: t(DICTIONARY.rememberMeCheckbox),
      // value: checkboxValue,
      // onClick: () => setCheckboxValue((prev) => !prev),
      // error: checkboxValueError,
    },
  ];

  const buttons = [
    {
      componentType: FORM_BUTTON_TYPES.main,
      text: t(DICTIONARY.login),
      type: 'submit',
      isDisabled: loading,
    },
    {
      componentType: FORM_BUTTON_TYPES.underlined,
      text: t(DICTIONARY.forgotPasswordLink),
      onClick: () => {
        navigate('/password');
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
    <div className={styles.authorization}>
      <div className={classNames('container')}>
        <div className={styles.authorizationInner}>
          <Form
            title={t(DICTIONARY.authFormTitle)}
            subtitle={t(DICTIONARY.authFormSubTitle)}
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

export default Login;

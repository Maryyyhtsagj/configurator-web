import React from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import useInputState from '../../hooks/useInputState';
import Form, { FORM_BUTTON_TYPES, FORM_INPUT_TYPES } from '../../ui-kit/Form';
import BuildingImage from '../../assets/images/Building.png';
import useTranslations from '../../hooks/useTranslations';
import { DICTIONARY } from '../../translations/dictionary';

function Registration() {
  const { t } = useTranslations();

  // Individual states for each input field
  const [name, setName, nameError, setNameError] = useInputState('');
  const [email, setEmail, emailError, setEmailError] = useInputState('');
  const [password, setPassword, passwordError, setPasswordError] = useInputState('');
  const [repeatPassword, setRepeatPassword, repeatPasswordError, setRepeatPasswordError] = useInputState('');
  const [company, setCompany, companyError, setCompanyError] = useInputState('');
  const [position, setPosition, positionError, setPositionError] = useInputState('');
  const [checkboxValue, setCheckboxValue, checkboxValueError, setCheckboxValueError] = useInputState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();

    let hasError = false;

    if (!name) {
      setNameError('Name is required');
      hasError = true;
    }
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    }
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }
    if (!repeatPassword) {
      setRepeatPasswordError('Please confirm your password');
      hasError = true;
    } else if (password !== repeatPassword) {
      setRepeatPasswordError('Passwords do not match');
      hasError = true;
    }
    if (!company) {
      setCompanyError('Company name is required');
      hasError = true;
    }
    if (!position) {
      setPositionError('Position is required');
      hasError = true;
    }
    if (!checkboxValue) {
      setCheckboxValueError('You must agree to the privacy policy');
      hasError = true;
    }
  };

  const inputs = [
    {
      componentType: FORM_INPUT_TYPES.input,
      name: 'name',
      text: t(DICTIONARY.nameInputLabel),
      value: name,
      onChange: setName,
      isRequired: true,
      error: nameError,
    },
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
      componentType: FORM_INPUT_TYPES.input,
      name: 'repeatPassword',
      text: t(DICTIONARY.repeatPasswordInputLabel),
      value: repeatPassword,
      onChange: setRepeatPassword,
      isRequired: true,
      error: repeatPasswordError,
      type: 'password',
    },
    {
      componentType: FORM_INPUT_TYPES.input,
      name: 'company',
      text: t(DICTIONARY.company),
      value: company,
      onChange: setCompany,
      isRequired: true,
      error: companyError,
    },
    {
      componentType: FORM_INPUT_TYPES.input,
      name: 'position',
      text: t(DICTIONARY.position),
      value: position,
      onChange: setPosition,
      isRequired: true,
      error: positionError,
    },
    {
      componentType: FORM_INPUT_TYPES.checkbox,
      text: t(DICTIONARY.agreePrivacyPolicy),
      value: checkboxValue,
      onChange: setCheckboxValue,
      error: checkboxValueError,
    },
  ];

  const buttons = [
    {
      componentType: FORM_BUTTON_TYPES.main,
      text: t(DICTIONARY.register),
      type: 'submit',
    },
    {
      componentType: FORM_BUTTON_TYPES.underlined,
      text: t(DICTIONARY.toLogin),
      onClick: () => console.log('Navigating to Login...'),
    },
    {
      componentType: FORM_BUTTON_TYPES.underlined,
      text: t(DICTIONARY.forgotPasswordLink),
      onClick: () => console.log('Forgot password clicked'),
    },
  ];

  return (
    <div className={styles.registration}>
      <div className={classNames('container')}>
        <div className={styles.registrationInner}>
          <Form
            title={t(DICTIONARY.registration)}
            subtitle={t(DICTIONARY.registerFormSubTitle)}
            inputs={inputs}
            buttons={buttons}
            onSubmit={onSubmit}
            source={BuildingImage}
            maxHeight="800px"
          />
        </div>
      </div>
    </div>
  );
}

export default Registration;

import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import useInputState from '../../hooks/useInputState';
import Form, { FORM_BUTTON_TYPES, FORM_INPUT_TYPES } from '../../ui-kit/Form';
import BuildingImage from '../../assets/images/Building.png';
import useTranslations from '../../hooks/useTranslations';
import { DICTIONARY } from '../../translations/dictionary';

function Contact() {
  const { t } = useTranslations();
  const [name, setName, nameError, setNameError] = useInputState('');
  const [email, setEmail, emailError, setEmailError] = useInputState('');
  const [topic, setTopic, topicError, setTopicError] = useInputState();
  const [request, setRequest, requestError, setRequestError] = useInputState('');
  const [checkboxValue, setCheckboxValue, checkboxValueError, setCheckboxValueError] = useInputState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setNameError('Выбери');
    setEmailError('Выбери');
    setTopicError('Выбери');
    setRequestError('Выбери');
    setCheckboxValueError(true);
  };

  const onCheckBoxClick = () => {};

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
      componentType: FORM_INPUT_TYPES.select,
      text: t(DICTIONARY.topicInputLabel),
      items: [
        { value: 'auth', label: t(DICTIONARY.topicOptions.auth) },
        { value: 'configurator', label: t(DICTIONARY.topicOptions.configurator) },
        { value: 'partners', label: t(DICTIONARY.topicOptions.partners) },
        { value: 'other', label: t(DICTIONARY.topicOptions.other) },
      ],
      value: topic,
      placeholder: t(DICTIONARY.topicInputPlaceholder),
      onChange: setTopic,
      isRequired: true,
      error: topicError,
    },
    {
      componentType: FORM_INPUT_TYPES.input,
      text: t(DICTIONARY.requestInputLabel),
      value: request,
      onChange: setRequest,
      error: requestError,
      isTextArea: true,
      textAreaHeight: 115,
    },
    {
      componentType: FORM_INPUT_TYPES.checkbox,
      text: t(DICTIONARY.privacyPolicyCheckbox),
      value: checkboxValue,
      onClick: onCheckBoxClick,
      error: checkboxValueError,
    },
  ];

  const buttons = [
    {
      componentType: FORM_BUTTON_TYPES.main,
      text: t(DICTIONARY.submitButtonText),
      type: 'submit',
      onClick: () => {},
    },
  ];

  return (
    <div className={styles.contact}>
      <div className={classNames('container')}>
        <div className={styles.contactInner}>
          <Form
            title={t(DICTIONARY.contactUs)}
            subtitle={t(DICTIONARY.contactFormSubTitle)}
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

export default Contact;

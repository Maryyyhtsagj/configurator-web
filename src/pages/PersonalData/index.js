import React from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import SimpleHeader from '../../ui-kit/SimpleHeader';
import Input from '../../ui-kit/Input';
import Button from '../../ui-kit/Button';
import useInputState from '../../hooks/useInputState';
import useTranslations from '../../hooks/useTranslations';
import { DICTIONARY } from '../../translations/dictionary';

function PersonalData() {
  const { t } = useTranslations();
  const [fullName, setFullName, fullNameError, setFullNameError] = useInputState('');
  const [email, setEmail, emailError, setEmailError] = useInputState('');
  const [phone, setPhone, phoneError, setPhoneError] = useInputState('');
  const [companyName, setCompanyName, companyNameError, setCompanyNameError] = useInputState('');
  const [position, setPosition, positionError, setPositionError] = useInputState('');
  const [newPassword, setNewPassword, newPasswordError, setNewPasswordError] = useInputState('');
  const [confirmPassword, setConfirmPassword, confirmPasswordError, setConfirmPasswordError] = useInputState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log('Form submitted:', {
      fullName,
      email,
      phone,
      companyName,
      position,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <div className={styles.personal}>
      <div className={classNames('container')}>
        <div className={styles.personalInner}>
          <SimpleHeader
            subtitle={t(DICTIONARY.personalSubTitle)}
            title={t(DICTIONARY.personalTitle)}
            isCenter
          />

          <div className={styles.inputWrapper}>
            <Input
              text={t(DICTIONARY.fullName)}
              value={fullName}
              onChange={setFullName}
              width="100%"
              error={fullNameError}
            />
            <Input
              text="E-mail"
              value={email}
              onChange={setEmail}
              width="100%"
              error={emailError}
            />
            <Input
              text={t(DICTIONARY.phone)}
              value={phone}
              onChange={setPhone}
              width="100%"
              error={phoneError}
            />
            <Input
              text={t(DICTIONARY.companyName)}
              value={companyName}
              onChange={setCompanyName}
              width="100%"
              error={companyNameError}
            />
            <Input
              text={t(DICTIONARY.position)}
              value={position}
              onChange={setPosition}
              width="100%"
              error={positionError}
            />
            <Input
              text={t(DICTIONARY.newPassword)}
              value={newPassword}
              onChange={setNewPassword}
              width="100%"
              error={newPasswordError}
              type="password"
            />
            <Input
              text={t(DICTIONARY.confirmNewPassword)}
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder=""
              width="100%"
              error={confirmPasswordError}
              type="password"
            />

            <div className={styles.buttonWrapper}>
              <Button
                text={t(DICTIONARY.saveChanges)}
                onClick={handleSubmit}
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalData;

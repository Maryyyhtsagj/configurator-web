import React, { useCallback } from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import Input from '../Input';
import Select from '../Select';
import Checkbox from '../Checkbox';
import Button from '../Button';
import UnderlinedButton from '../UnderlinedButton';
import SimpleHeader from '../SimpleHeader';

export const FORM_INPUT_TYPES = {
  input: 'input',
  select: 'select',
  checkbox: 'checkbox',
};

export const FORM_BUTTON_TYPES = {
  main: 'main',
  underlined: 'underlined',
};

function Form({
  subtitle = '',
  title = '',
  inputs = [],
  buttons = [],
  onSubmit,
  source,
  maxHeight,
}) {
  const inputInner = useCallback((type) => (
    type === FORM_INPUT_TYPES.input ? Input
      : type === FORM_INPUT_TYPES.select ? Select
        : type === FORM_INPUT_TYPES.checkbox ? Checkbox
          : null), []);

  const buttonsInner = useCallback((type) => (
    type === FORM_BUTTON_TYPES.main ? Button
      : type === FORM_BUTTON_TYPES.underlined ? UnderlinedButton
        : null), []);

  return (
    <form onSubmit={onSubmit} className={styles.formWrapper}>
      <div className={styles.headerWrapperMobile}>
        <SimpleHeader subtitle={subtitle} title={title} isCenter />
      </div>
      <div className={styles.divLeft}>
        <img
          src={source}
          alt="form img"
          className={styles.formImage}
          style={{ maxHeight }}
        />
      </div>

      <div className={styles.divRight}>
        <div className={styles.headerWrapperDesktop}>
          <SimpleHeader subtitle={subtitle} title={title} />
        </div>

        {inputs.length > 0 && (
        <div className={styles.inputsWrapper}>
          {inputs.map(({ componentType, ...inputProps }, index) => {
            const Inner = inputInner(componentType);

            return <Inner key={index} width="100%" {...inputProps} />;
          })}
        </div>
        )}

        {buttons.length > 0 && (
        <div className={styles.buttonsWrapper}>
          {buttons.map(({ componentType, ...buttonsProps }, index) => {
            const Inner = buttonsInner(componentType);

            return <Inner key={index} {...buttonsProps} />;
          })}
        </div>
        )}
      </div>
    </form>
  );
}

export default Form;

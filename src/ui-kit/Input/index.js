import React, { useMemo, useRef } from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import QuestionIcon from '../../assets/icons/questionSmall.svg';
import useComponentVisible from '../../hooks/useComponentVisible';
import CloseIcon from '../../assets/icons/crossDark.svg';

function Input({
  text,
  value,
  onChange,
  placeholder,
  rightIcon,
  isRequired,
  hintText,
  cursor = 'text',
  width = 260,
  wrapperStyles = {},
  style = {},
  error,
  isTextArea,
  textAreaHeight,
  withClean,
  ...p
}) {
  const inputRef = useRef();
  const { ref: hintRef, isComponentVisible, setIsComponentVisible } = useComponentVisible();

  const calculatedWrapperStyle = useMemo(() => (
    {
      width: typeof width === 'string' ? width : `${width}px`,
      ...wrapperStyles,
    }
  ), [width, wrapperStyles]);

  const calculatedStyle = useMemo(() => (
    {
      paddingRight: rightIcon ? `${54}px` : '',
      cursor,
      ...style,
    }
  ), [rightIcon, cursor, style]);

  const calculatedTextAreaStyle = useMemo(() => (
    {
      paddingRight: rightIcon ? `${54}px` : '',
      cursor,
      height: `${textAreaHeight}px`,
    }
  ), [rightIcon, cursor, textAreaHeight]);

  return (
    <div className={styles.inputWrapper} style={calculatedWrapperStyle}>
      <div className={styles.inputHeader} style={{ marginBottom: text?.length ? 8 : 0 }}>
        <p className={styles.title}>{text}</p>
        {isRequired && <p className={styles.required}>*</p>}
        {hintText?.length > 0 && (
        <div className={styles.hintWrapper}>
          <div
            className={classNames(styles.hintButton, 'pressable')}
            onClick={() => setIsComponentVisible(true)}
          >
            <img src={QuestionIcon} alt="?" />
          </div>
          <div
            ref={hintRef}
            className={classNames(styles.hint, { [styles.hintVisible]: isComponentVisible })}
          >
            <p className={styles.hintText}>{hintText}</p>
          </div>
        </div>
        )}
      </div>

      <div className={styles.inputContainer}>
        {isTextArea ? (
          <textarea
            ref={inputRef}
            className={classNames(styles.input, styles.textarea, { [styles.inputError]: error?.length })}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={calculatedTextAreaStyle}
            autoCapitalize="off"
            {...p}
          />
        ) : (
          <input
            ref={inputRef}
            className={classNames(styles.input, { [styles.inputError]: error?.length })}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={calculatedStyle}
            autoCapitalize="off"
            {...p}
          />
        )}

        {(withClean && value?.length > 0) ? (
          <div
            className={classNames(styles.rightIcon, 'pressable')}
            onClick={() => onChange('', true)}
          >
            <img src={CloseIcon} alt="X" />
          </div>
        ) : rightIcon ? (
          <div
            className={styles.rightIcon}
            style={{ cursor }}
            onClick={() => inputRef.current?.focus()}
          >
            <img src={rightIcon} alt="icon" />
          </div>
        ) : null}
      </div>
      {error?.length > 0 && <p className={styles.error}>{error === 'NO_ERROR_TEXT' ? '' : error}</p>}
    </div>
  );
}

export default Input;

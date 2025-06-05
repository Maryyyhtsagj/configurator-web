import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai/index';
import Button, { BUTTON_VARIANTS } from '../Button';
import { closeModalAtom } from '../../atoms/modalAtoms';
import styles from './css/index.module.scss';

function ConfirmModal({
  text,
  buttonText = 'Ок',
  secondButtonText = 'Отмена',
  onButtonClick,
  onSecondButtonClick,
  buttonLoading,
  // buttonClassName,
}) {
  const closeModal = useSetAtom(closeModalAtom);

  const onClick = (ev) => {
    if (typeof onButtonClick === 'function') {
      onButtonClick(ev);
    } else {
      closeModal();
    }
  };

  const onSecondClick = (ev) => {
    if (typeof onSecondButtonClick === 'function') {
      onSecondButtonClick(ev);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <p className={styles.text}>{text}</p>
      <div className={styles.buttonsRow}>
        <div className={styles.button}>
          <Button
            text={secondButtonText}
            variant={BUTTON_VARIANTS.secondary}
            onClick={onSecondClick}
            isDisabled={buttonLoading}
            width="100%"
          />
        </div>
        <div className={styles.button}>
          <Button
            text={buttonText}
            onClick={onClick}
            isDisabled={buttonLoading}
            width="100%"
          />
        </div>
      </div>
    </>
  );
}

export default ConfirmModal;

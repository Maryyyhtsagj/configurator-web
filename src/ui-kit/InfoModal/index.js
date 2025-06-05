import React from 'react';
import { useSetAtom } from 'jotai/index';
import Button from '../Button';
import { closeModalAtom } from '../../atoms/modalAtoms';
import styles from './css/index.module.scss';

function InfoModal({
  text,
  buttonText = 'Ок',
  onButtonClick,
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

  return (
    <>
      <p className={styles.text}>{text}</p>
      <div className={styles.buttonsRow}>
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

export default InfoModal;

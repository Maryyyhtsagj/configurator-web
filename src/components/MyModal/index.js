import React, { useEffect, useState } from 'react';
import './css/index.scss';
import Modal from 'react-modal';
import { useAtom, useSetAtom } from 'jotai';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import CloseIcon from '../../assets/icons/cross.svg';
import sleep from '../../helpers/sleep';

function MyModal({ modalAtom, closeModalAtom }) {
  const [modalState, setModalState] = useAtom(modalAtom);
  const closeModal = useSetAtom(closeModalAtom);
  const [localChildren, setLocalChildren] = useState(null);

  const {
    isOpen, closeFunction, children, style, containerStyle, withCloseButton, overlayStyle, closeTimeoutMS,
  } = modalState;

  const closeOnPressOutside = typeof modalState.closeOnPressOutside === 'boolean' ? modalState.closeOnPressOutside : true;

  const handleClosing = () => {
    if (typeof closeFunction === 'function') {
      closeFunction();
    }
    closeModal();
  };

  useEffect(() => {
    let timer;
    if (isOpen) {
      setLocalChildren(children);
    } else {
      timer = setTimeout(() => {
        setLocalChildren(null);
      }, closeTimeoutMS ?? 200);
    }

    return () => clearTimeout(timer);
  }, [isOpen, children]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeOnPressOutside ? handleClosing : undefined}
      style={{
        overlay: { ...stylesLocal.overlay, ...(overlayStyle || {}) },
        content: { ...stylesLocal.content, ...style },
      }}
      closeTimeoutMS={closeTimeoutMS ?? 200}
    >
      <div className={styles.wrapper} style={containerStyle}>
        {localChildren}
        {withCloseButton && (
          <div
            onClick={handleClosing}
            className={classNames(styles.closeButton, 'pressable')}
          >
            <img src={CloseIcon} alt="X" />
          </div>
        )}
      </div>
    </Modal>
  );
}

const stylesLocal = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(8,27,77,0.7)',
    zIndex: 10,
  },
  content: {
    position: 'absolute',
    height: 'fit-content',
    width: 'fit-content',
    overflow: 'visible',
    WebkitOverflowScrolling: 'touch',
    top: '50%',
    left: '50%',
    transform: `translate(-${50}%, -${50}%)`,
    padding: '0px',
    backgroundColor: 'rgba(255,255,255,0)',
    border: 0,
  },
};

export default MyModal;

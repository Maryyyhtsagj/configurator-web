import { atom } from 'jotai';
import deepClone from '../helpers/deepClone';
import ConfirmModal from '../ui-kit/ConfirmModal';
import InfoModal from '../ui-kit/InfoModal';
import LoadingModal from '../ui-kit/LoadingModal';

export const modalInitObj = {
  isOpen: false,
  closeFunction: null,
  children: null,
  style: null,
  withCloseButton: true,
  closeOnPressOutside: true,
  overlayStyle: null,
  containerStyle: null,
  closeTimeoutMS: null,
};

const modalStateAtom = atom(deepClone(modalInitObj), (get, set, update) => {
  const newObj = { ...get(modalStateAtom), ...update };
  set(modalStateAtom, newObj);
});

const closeModalAtom = atom(null, (get, set) => {
  const newObj = { ...deepClone(modalInitObj), isOpen: false, closeTimeoutMS: get(modalStateAtom).closeTimeoutMS };
  set(modalStateAtom, newObj);
});

/* The same modal but second start */
const modal2StateAtom = atom(deepClone(modalInitObj), (get, set, update) => {
  const newObj = { ...get(modal2StateAtom), ...update };
  set(modal2StateAtom, newObj);
});

const closeModal2Atom = atom(null, (get, set) => {
  const newObj = { ...deepClone(modalInitObj), isOpen: false, closeTimeoutMS: get(modal2StateAtom).closeTimeoutMS };
  set(modal2StateAtom, newObj);
});
/* The same modal but second end */

const openInfoModalAtom = atom(null, (get, set, val) => {
  const newObj = {
    ...get(modalStateAtom),
    ...val,
    isOpen: true,
    children: <InfoModal {...val} />,
    closeOnPressOutside: val.closeOnPressOutside ?? true,
  };

  set(modalStateAtom, newObj);
});

const openConfirmModalAtom = atom(null, (get, set, val) => {
  const newObj = {
    ...get(modalStateAtom),
    ...val,
    isOpen: true,
    children: <ConfirmModal {...val} />,
    closeOnPressOutside: val.closeOnPressOutside ?? true,
  };

  set(modalStateAtom, newObj);
});

const openLoadingModalAtom = atom(null, (get, set, val) => {
  const newObj = {
    ...get(modalStateAtom),
    ...val,
    isOpen: true,
    children: <LoadingModal {...val} />,
    closeOnPressOutside: false,
    withCloseButton: false,
  };

  set(modalStateAtom, newObj);
});

export {
  modalStateAtom,
  closeModalAtom,
  openInfoModalAtom,
  openConfirmModalAtom,
  openLoadingModalAtom,
  modal2StateAtom,
  closeModal2Atom,
};

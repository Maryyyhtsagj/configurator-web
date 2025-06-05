import { atom } from 'jotai';
import LocalStorageServices from '../services/LocalStorageServices';

const isInitAtom = atom(false);
const initLoadingAtom = atom(false);

const languagesListAtom = atom([]);
const langAtom = atom(LocalStorageServices.getLanguage());

const pathnameAtom = atom('/');

const windowWidthAtom = atom(window.innerWidth);
const windowHeightAtom = atom(window.innerHeight);

const wrapperRefAtom = atom({ current: null });
const scrollableContentRefAtom = atom({ current: null });

export {
  isInitAtom,
  languagesListAtom,
  langAtom,
  windowWidthAtom,
  windowHeightAtom,
  pathnameAtom,
  initLoadingAtom,
  wrapperRefAtom,
  scrollableContentRefAtom,
};

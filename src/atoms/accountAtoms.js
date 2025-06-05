import { atom } from 'jotai';
import LocalStorageServices from '../services/LocalStorageServices';

const isAuthAtom = atom(Boolean(LocalStorageServices.getToken()));

const tokenAtom = atom(LocalStorageServices.getToken(), (get, set, update) => {
  if (update?.length) {
    set(isAuthAtom, true);
  } else {
    set(isAuthAtom, false);
  }
  set(tokenAtom, update);
});

const isAdminAtom = atom(false);

export { isAuthAtom, tokenAtom, isAdminAtom };

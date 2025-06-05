import { atom } from 'jotai';

/* Projects Start */
const projectsAtom = atom([]);
const gettingProjectsLoadingAtom = atom(false);
const creatingProjectLoadingAtom = atom(false);
const deletingProjectLoadingAtom = atom(false);
const projectsCountAtom = atom(null);
const projectsPagesInfoAtom = atom(null);
const projectsItemsOnPageAtom = atom(8);
/* Projects End */

export {
  projectsAtom,
  gettingProjectsLoadingAtom,
  creatingProjectLoadingAtom,
  deletingProjectLoadingAtom,
  projectsCountAtom,
  projectsPagesInfoAtom,
  projectsItemsOnPageAtom,
};

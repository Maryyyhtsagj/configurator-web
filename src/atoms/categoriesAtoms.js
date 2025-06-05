import { atom } from 'jotai';

const categoriesAtom = atom([]);

const materialsAtom = atom([]);

// all materials with "path" array
const materialsWithPathAtom = atom([]);

// the same as the above one but filtered
const materialsFilteredAtom = atom([]);

const categoriesTreeFilteredAtom = atom([]);

const materialsQueryAtom = atom('');

const materialTypesAtom = atom([]);

const categoriesInnerListMaxHeightAtom = atom(200);

export {
  categoriesAtom,
  materialsAtom,
  materialTypesAtom,
  categoriesInnerListMaxHeightAtom,
  materialsWithPathAtom,
  materialsFilteredAtom,
  materialsQueryAtom,
  categoriesTreeFilteredAtom,
};

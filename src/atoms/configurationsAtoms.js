import { atom } from 'jotai';

/* Configurations Start */
const configurationsAtom = atom([]);
const gettingConfigurationsLoadingAtom = atom(false);
const gettingSingleConfigurationLoadingAtom = atom(false);
const editingConfigurationLoadingAtom = atom(false);
const deletingConfigurationLoadingAtom = atom(false);
const configurationsProjectAtom = atom(null);
const configurationsPagesInfoAtom = atom(null);
const configurationsItemsOnPageAtom = atom(8);
/* Configurations End */

export {
  configurationsAtom,
  gettingConfigurationsLoadingAtom,
  gettingSingleConfigurationLoadingAtom,
  editingConfigurationLoadingAtom,
  deletingConfigurationLoadingAtom,
  configurationsProjectAtom,
  configurationsPagesInfoAtom,
  configurationsItemsOnPageAtom,
};

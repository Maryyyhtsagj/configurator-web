import LocalStorageServices from '../services/LocalStorageServices';

function tStatic(dictObj, ...params) {
  const lang = LocalStorageServices.getLanguage();

  return dictObj[lang](...params);
}

export default tStatic;

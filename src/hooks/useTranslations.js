import { useAtom } from 'jotai/index';
import { langAtom } from '../atoms/globalAtoms';
import { LANGUAGES } from '../constants/languages';
import LocalStorageServices from '../services/LocalStorageServices';

const useTranslations = () => {
  const [lang, setLang] = useAtom(langAtom);

  function t(dictObj, ...params) {
    return dictObj[lang](...params);
  }

  const changeLang = (code) => {
    if (!LANGUAGES[code]) {
      code = LANGUAGES.ru.code;
    }

    LocalStorageServices.setLang(code);
    setLang(code);
  };

  return { lang, setLang: changeLang, t };
};

export default useTranslations;

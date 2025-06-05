import React, { useEffect } from 'react';
import classNames from 'classnames';
import SmallDropdown from '../../../ui-kit/SmallDropdown';
import styles from '../css/index.module.scss';
import { LANGUAGES } from '../../../constants/languages';
import TickIcon from '../../../assets/icons/tickWhite.svg';
import useTranslations from '../../../hooks/useTranslations';
import useComponentVisible from '../../../hooks/useComponentVisible';

function LanguagesDropdown({ setIsOverlayVisible }) {
  const { lang, setLang } = useTranslations();

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible();
  const onLanguageClick = () => {
    setIsComponentVisible(true);
  };

  const onLanguageSelect = (code) => {
    setIsComponentVisible(false);
    setLang(code);
  };

  useEffect(() => {
    setIsOverlayVisible(isComponentVisible);
  }, [isComponentVisible]);

  return (
    <>
      <SmallDropdown text={LANGUAGES[lang].shortName} onClick={onLanguageClick} />
      <div
        ref={ref}
        className={classNames(
          styles.dropdown,
          styles.langDropdown,
          { [styles.dropdownVisible]: isComponentVisible },
        )}
      >
        {Object.keys(LANGUAGES).map((key) => (
          <div
            key={key}
            className={classNames(
              styles.dropdownItem,
              styles.langDropdownItem,
              { [styles.langDropdownItemActive]: key === lang },
            )}
            onClick={() => onLanguageSelect(LANGUAGES[key].code)}
          >
            <p className={styles.dropdownItemText}>{LANGUAGES[key].name}</p>
            {key === lang && <img src={TickIcon} alt="V" className={styles.langDropdownTick} />}
          </div>
        ))}
      </div>
    </>
  );
}

export default LanguagesDropdown;

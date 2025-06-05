import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import SmallDropdown from '../../../ui-kit/SmallDropdown';
import styles from '../css/index.module.scss';
import ForwardIcon from '../../../assets/icons/forwardWhite.svg';
import useTranslations from '../../../hooks/useTranslations';
import useComponentVisible from '../../../hooks/useComponentVisible';
import { DICTIONARY } from '../../../translations/dictionary';

function AccountDropdown({ setIsOverlayVisible, onLinkClick, LINK_KEYS }) {
  const { t } = useTranslations();

  const links = useMemo(
    () => [LINK_KEYS.personalData, LINK_KEYS.myProjects, LINK_KEYS.configurationsHistory, LINK_KEYS.logout],
    [LINK_KEYS],
  );

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible();
  const onAccountClick = () => {
    setIsComponentVisible(true);
  };

  const onLinkClickLocal = (key) => {
    setIsComponentVisible(false);
    onLinkClick(key)();
  };

  useEffect(() => {
    setIsOverlayVisible(isComponentVisible);
  }, [isComponentVisible]);

  return (
    <>
      <SmallDropdown text={t(DICTIONARY.personalAccount)} onClick={onAccountClick} />
      <div
        ref={ref}
        className={classNames(
          styles.dropdown,
          styles.accountDropdown,
          { [styles.dropdownVisible]: isComponentVisible },
        )}
      >
        {links.map((key) => (
          <div
            key={key}
            className={classNames(
              styles.dropdownItem,
              styles.accountDropdownItem,
            )}
            onClick={() => onLinkClickLocal(key)}
          >
            <p className={styles.dropdownItemText}>{t(DICTIONARY[key])}</p>
            <img src={ForwardIcon} alt="->" className={styles.accountDropdownTick} />
          </div>
        ))}
      </div>
    </>
  );
}

export default AccountDropdown;

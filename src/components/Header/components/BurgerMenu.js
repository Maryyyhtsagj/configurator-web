import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import BurgerIcon from '../../../assets/icons/burgerMenu.svg';
import ArrowRightIcon from '../../../assets/icons/arrowRight.svg';
import ArrowRightWhiteIcon from '../../../assets/icons/arrowRightWhite.svg';
import { pathnameAtom } from '../../../atoms/globalAtoms';
import styles from '../css/index.module.scss';
import { isAuthAtom } from '../../../atoms/accountAtoms';
import useTranslations from '../../../hooks/useTranslations';
import { DICTIONARY } from '../../../translations/dictionary';
import Button from '../../../ui-kit/Button';

function BurgerMenu({ onLinkClick, isLinkActive, LINK_KEYS }) {
  const [isAuth] = useAtom(isAuthAtom);
  const [pathname] = useAtom(pathnameAtom);
  const { t } = useTranslations();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const links = useMemo(
    () => (isAuth
      ? [LINK_KEYS.configurator, LINK_KEYS.personalData, LINK_KEYS.myProjects, LINK_KEYS.configurationsHistory, LINK_KEYS.logout]
      : [LINK_KEYS.aboutConfigurator, LINK_KEYS.instructions, LINK_KEYS.contactUs, LINK_KEYS.registration]),
    [isAuth, LINK_KEYS],
  );

  const onBurgerClick = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const onLinkClickLocal = (key) => () => {
    onLinkClick(key)();
    setIsMenuVisible(false);
  };

  useEffect(() => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    }
  }, [pathname]);

  return (
    <>
      <div className={classNames('pressable')} onClick={onBurgerClick}>
        <img src={BurgerIcon} alt="Menu" />
      </div>
      <div className={classNames(styles.floatingMenu, { [styles.floatingMenuVisible]: isMenuVisible })}>
        <div className={styles.linksList}>
          {links.map((key) => (
            <div
              onClick={onLinkClickLocal(key)}
              key={key}
              className={classNames(styles.floatingMenuItem, { [styles.floatingMenuItemActive]: isLinkActive(key) }, 'pressableLight')}
            >
              <p>{t(DICTIONARY[key])}</p>
              <img src={isLinkActive(key) ? ArrowRightWhiteIcon : ArrowRightIcon} alt=">" />
            </div>
          ))}
        </div>
        <Button text={t(DICTIONARY.login)} onClick={onLinkClickLocal(LINK_KEYS.login)} />
      </div>
    </>

  );
}

export default BurgerMenu;

import React from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import { isAuthAtom } from '../../../atoms/accountAtoms';
import styles from '../css/index.module.scss';
import ArrowLeft from '../../../assets/icons/arrowLeft.svg';
import EmptyHeight from '../../EmptyHeight';
import useTranslations from '../../../hooks/useTranslations';
import { DICTIONARY } from '../../../translations/dictionary';
import AccountDropdown from './AccountDropdown';
import { windowWidthAtom } from '../../../atoms/globalAtoms';
import BurgerMenu from './BurgerMenu';
import useHeader from '../hooks/useHeader';

function HeaderLinks({ setIsOverlayVisible }) {
  const { t } = useTranslations();
  const { LINK_KEYS, onLinkClick, isLinkActive } = useHeader();
  const [isAuth] = useAtom(isAuthAtom);
  const [windowWidth] = useAtom(windowWidthAtom);

  return (
    <div className={styles.links}>

      {windowWidth <= 900 ? isAuth ? (
        <>
          <div
            className={classNames(styles.linkSmallButton, 'pressable')}
            onClick={onLinkClick(LINK_KEYS.myProjects)}
          >
            <img src={ArrowLeft} alt="<" />
          </div>
          <EmptyHeight width={10} />
          <BurgerMenu onLinkClick={onLinkClick} isLinkActive={isLinkActive} LINK_KEYS={LINK_KEYS} />
        </>
      ) : <BurgerMenu onLinkClick={onLinkClick} isLinkActive={isLinkActive} LINK_KEYS={LINK_KEYS} />
        : isAuth ? (
          <>
            <div
              onClick={onLinkClick(LINK_KEYS.myProjects)}
              className={classNames(styles.linkSmallButton, 'pressable')}
            >
              <img src={ArrowLeft} alt="<" />
            </div>
            <EmptyHeight width={10} />
            <div
              onClick={onLinkClick(LINK_KEYS.configurator)}
              className={classNames(
                styles.linkItem,
                { [styles.linkItemActive]: window.location.pathname === '/configurator' },
                'pressable',
              )}
            >
              <p className={styles.linkItemText}>{t(DICTIONARY[LINK_KEYS.configurator])}</p>
            </div>
            <div
              onClick={onLinkClick(LINK_KEYS.instructions)}
              className={classNames(
                styles.linkItem,
                { [styles.linkItemActive]: window.location.pathname === '/instructions' },
                'pressable',
              )}
            >
              <p className={styles.linkItemText}>{t(DICTIONARY[LINK_KEYS.instructions])}</p>
            </div>
            <div
              onClick={onLinkClick(LINK_KEYS.contactUs)}
              className={classNames(
                styles.linkItem,
                { [styles.linkItemActive]: window.location.pathname === '/contact' },
                'pressable',
              )}
            >
              <p className={styles.linkItemText}>{t(DICTIONARY[LINK_KEYS.contactUs])}</p>
            </div>
            <div className={styles.line} />
            <div>
              <AccountDropdown
                setIsOverlayVisible={setIsOverlayVisible}
                LINK_KEYS={LINK_KEYS}
                onLinkClick={onLinkClick}
              />
            </div>
            <EmptyHeight width={10} />
          </>
        ) : (
          <>
            <div
              onClick={onLinkClick(LINK_KEYS.aboutConfigurator)}
              className={classNames(
                styles.linkItem,
                { [styles.linkItemActive]: window.location.pathname === '/about' },
                'pressable',
              )}
            >
              <p className={styles.linkItemText}>{t(DICTIONARY[LINK_KEYS.aboutConfigurator])}</p>
            </div>
            <div
              onClick={onLinkClick(LINK_KEYS.instructions)}
              className={classNames(
                styles.linkItem,
                { [styles.linkItemActive]: window.location.pathname === '/instructions' },
                'pressable',
              )}
            >
              <p className={styles.linkItemText}>{t(DICTIONARY[LINK_KEYS.instructions])}</p>
            </div>
            <div
              onClick={onLinkClick(LINK_KEYS.contactUs)}
              className={classNames(
                styles.linkItem,
                { [styles.linkItemActive]: window.location.pathname === '/contact' },
                'pressable',
              )}
            >
              <p className={styles.linkItemText}>{t(DICTIONARY[LINK_KEYS.contactUs])}</p>
            </div>
            <div className={styles.line} />
            <div
              onClick={onLinkClick(LINK_KEYS.registration)}
              className={classNames(
                styles.linkItem,
                { [styles.linkItemActive]: window.location.pathname === '/registration' },
                'pressable',
              )}
            >
              <p className={styles.linkItemText}>{t(DICTIONARY[LINK_KEYS.registration])}</p>
            </div>
            <div
              onClick={onLinkClick(LINK_KEYS.login)}
              className={classNames(
                styles.linkItem,
                { [styles.linkItemActive]: window.location.pathname === '/login' || window.location.pathname === '/' },
                'pressable',
              )}
            >
              <p className={styles.linkItemText}>{t(DICTIONARY[LINK_KEYS.login])}</p>
            </div>
          </>
        )}
    </div>

  );
}

export default HeaderLinks;

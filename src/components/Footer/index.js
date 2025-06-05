import React from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import { useNavigate } from 'react-router-dom';
import styles from './css/index.module.scss';
import LogoText from '../../assets/images/LogoText.svg';
import TelegramIcon from '../../assets/icons/telegram.svg';
import VkIcon from '../../assets/icons/vk.svg';
import useTranslations from '../../hooks/useTranslations';
import { DICTIONARY } from '../../translations/dictionary';
import { isAuthAtom } from '../../atoms/accountAtoms';
import useFooter from './hooks/useFooter';
import EmptyHeight from '../EmptyHeight';

function Footer() {
  const { LINK_KEYS, onLinkClick } = useFooter();
  const navigate = useNavigate();
  const { t } = useTranslations();
  const [isAuth] = useAtom(isAuthAtom);

  const onPrivacyPolicyClick = () => {
    navigate('/privacy');
  };
  const onTelegramClick = () => {
    window.open('https://t.me/aiglive', '_blank');
  };
  const onVkClick = () => {
    window.open('https://vk.com/aig_glass', '_blank');
  };

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={LogoText} alt="Logo" className={styles.logo} />
          <div className={styles.leftTexts}>
            <p>{t(DICTIONARY.policy1)}</p>
            <p
              onClick={onPrivacyPolicyClick}
              className={classNames(styles.policy, 'pressable')}
            >
              {t(DICTIONARY.policy2)}
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.linksBlock}>
            <div className={styles.linksBlockItem}>
              <p
                className={styles.link}
                onClick={onLinkClick(LINK_KEYS.toAigWeb)}
              >
                {t(DICTIONARY.toAigWeb)}
              </p>
              {isAuth ? (
                <>
                  <p
                    onClick={onLinkClick(LINK_KEYS.myProjects)}
                    className={styles.link}
                  >
                    {t(DICTIONARY.myProjects)}
                  </p>
                  <EmptyHeight height={13} />
                </>
              ) : (
                <>
                  <p
                    onClick={onLinkClick(LINK_KEYS.login)}
                    className={styles.link}
                  >
                    {t(DICTIONARY.login)}
                  </p>
                  <p
                    onClick={onLinkClick(LINK_KEYS.registration)}
                    className={styles.link}
                  >
                    {t(DICTIONARY.registration)}
                  </p>
                </>
              )}
            </div>
            <div className={styles.linksBlockItem}>
              <p
                onClick={onLinkClick(LINK_KEYS.aboutConfigurator)}
                className={styles.link}
              >
                {t(DICTIONARY.aboutConfigurator)}
              </p>
              <p
                onClick={onLinkClick(LINK_KEYS.instructions)}
                className={styles.link}
              >
                {t(DICTIONARY.instructions)}
              </p>
              <p
                onClick={onLinkClick(LINK_KEYS.contactUs)}
                className={styles.link}
              >
                {t(DICTIONARY.contactUs)}
              </p>
            </div>
          </div>
          <div className={styles.contactsBlock}>
            <p className={styles.contactsTitle}>{t(DICTIONARY.weInSocials)}</p>
            <div className={styles.contactsRow}>
              <div className={classNames(styles.contactItem, 'pressable')} onClick={onTelegramClick}>
                <img src={TelegramIcon} alt="Tg" />
                <p className={styles.contactText}>Telegram</p>
              </div>
              <div className={classNames(styles.contactItem, 'pressable')} onClick={onVkClick}>
                <img src={VkIcon} alt="Vk" />
                <p className={styles.contactText}>VK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

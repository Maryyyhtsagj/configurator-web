import React, { useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './css/index.module.scss';
import Logo from '../../assets/images/Logo.svg';
import HeaderLinks from './components/HeaderLinks';
import LanguagesDropdown from './components/LanguagesDropdown';

function Header() {
  const navigate = useNavigate();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const onLogoClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <img src={Logo} alt="Logo" className={styles.logo} onClick={onLogoClick} />

        <LanguagesDropdown setIsOverlayVisible={setIsOverlayVisible} />
      </div>
      <div className={styles.right}>
        <HeaderLinks setIsOverlayVisible={setIsOverlayVisible} />
      </div>

      <div className={classNames(
        styles.overlay,
        { [styles.overlayVisible]: isOverlayVisible },
      )}
      />
    </div>
  );
}

export default Header;

import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai/index';
import { closeModalAtom, openConfirmModalAtom, openInfoModalAtom } from '../../../atoms/modalAtoms';
import { tokenAtom } from '../../../atoms/accountAtoms';
import LocalStorageServices from '../../../services/LocalStorageServices';

const LINK_KEYS = {
  personalAccount: 'personalAccount',
  personalData: 'personalData',
  configurationsHistory: 'configurationsHistory',
  aboutConfigurator: 'aboutConfigurator',
  configurator: 'configurator',
  myProjects: 'myProjects',
  instructions: 'instructions',
  contactUs: 'contactUs',

  registration: 'registration',
  login: 'login',
  logout: 'logout',
};

const useHeader = () => {
  const navigate = useNavigate();
  const [, openConfirmModal] = useAtom(openConfirmModalAtom);
  const [, closeModal] = useAtom(closeModalAtom);
  const [, setToken] = useAtom(tokenAtom);

  const onLogoutClick = () => {
    openConfirmModal({
      text: 'Вы уверены, что хотите выйти из аккаунта?',
      onButtonClick: () => {
        LocalStorageServices.removeToken();
        setToken('');
        closeModal();
      },
    });
  };

  const onLinkClick = (key) => () => {
    if (key === LINK_KEYS.login) {
      navigate('/login');
    } else if (key === LINK_KEYS.logout) {
      onLogoutClick();
    } else if (key === LINK_KEYS.personalAccount) {
      navigate('/personal');
    } else if (key === LINK_KEYS.personalData) {
      navigate('/personal');
    } else if (key === LINK_KEYS.registration) {
      navigate('/registration');
    } else if (key === LINK_KEYS.configurationsHistory) {
      navigate('/configurations-history');
    } else if (key === LINK_KEYS.aboutConfigurator) {
      navigate('/about');
    } else if (key === LINK_KEYS.configurator) {
      navigate('/configurator');
    } else if (key === LINK_KEYS.myProjects) {
      navigate('/my-projects');
    } else if (key === LINK_KEYS.instructions) {
      navigate('/instructions');
    } else if (key === LINK_KEYS.contactUs) {
      navigate('/contact');
    }
  };

  const isLinkActive = (key) => {
    if (key === LINK_KEYS.login) {
      return window.location.pathname === '/login' || window.location.pathname === '/';
    }
    if (key === LINK_KEYS.personalAccount) {
      return window.location.pathname === '/personal';
    }
    if (key === LINK_KEYS.registration) {
      return window.location.pathname === '/registration';
    }
    if (key === LINK_KEYS.configurationsHistory) {
      return window.location.pathname === '/configurations-history';
    }
    if (key === LINK_KEYS.aboutConfigurator) {
      return window.location.pathname === '/about';
    }
    if (key === LINK_KEYS.configurator) {
      return window.location.pathname === '/configurator';
    }
    if (key === LINK_KEYS.myProjects) {
      return window.location.pathname === '/my-projects';
    }
    if (key === LINK_KEYS.instructions) {
      return window.location.pathname === '/instructions';
    }
    if (key === LINK_KEYS.contactUs) {
      return window.location.pathname === '/contact';
    }
  };

  return { LINK_KEYS, onLinkClick, isLinkActive };
};

export default useHeader;

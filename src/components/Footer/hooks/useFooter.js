import { useNavigate } from 'react-router-dom';

const LINK_KEYS = {
  aboutConfigurator: 'aboutConfigurator',
  instructions: 'instructions',
  contactUs: 'contactUs',
  toAigWeb: 'toAigWeb',
  myProjects: 'myProjects',

  registration: 'registration',
  login: 'login',
};

const useFooter = () => {
  const navigate = useNavigate();

  const onLinkClick = (key) => () => {
    if (key === LINK_KEYS.login) {
      navigate('/login');
    } else if (key === LINK_KEYS.toAigWeb) {
      window.open('https://aigrus.ru/', '_blank');
    } else if (key === LINK_KEYS.personalAccount) {
      navigate('/personal');
    } else if (key === LINK_KEYS.registration) {
      navigate('/registration');
    } else if (key === LINK_KEYS.configurationsHistory) {
      // navigate('/registration');
    } else if (key === LINK_KEYS.aboutConfigurator) {
      navigate('/about');
    } else if (key === LINK_KEYS.configurator) {
      navigate('/configurator');
    } else if (key === LINK_KEYS.myProjects) {
      navigate('/my-project');
    } else if (key === LINK_KEYS.instructions) {
      navigate('/instructions');
    } else if (key === LINK_KEYS.contactUs) {
      navigate('/contact');
    }
  };

  return { LINK_KEYS, onLinkClick };
};

export default useFooter;

class LocalStorageServices {
  static getToken = () => localStorage.getItem('token') || '';

  static setToken = (token) => {
    localStorage.setItem('token', token);
  };

  static removeToken = () => {
    localStorage.removeItem('token');
  };

  static getLanguage = () => localStorage.getItem('lang') || 'ru';

  static setLang = (lang) => {
    localStorage.setItem('lang', lang);
  };
}

export default LocalStorageServices;

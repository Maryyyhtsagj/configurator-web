import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Modal from 'react-modal';
import { Provider } from 'jotai';
import App from './App';
import store from './atoms';
import reportWebVitals from './reportWebVitals';

Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

const excludeList = ['React Router Future Flag Warning', 'Warning: findDOMNode is deprecated and will be removed', 'Warning: validateDOMNesting'];

const initialConsoleError = console.error;
console.error = (...args) => {
  if (args?.length) {
    // eslint-disable-next-line no-restricted-syntax
    for (const arg of args) {
      // eslint-disable-next-line no-restricted-syntax
      for (const excludeItem of excludeList) {
        if (typeof arg?.includes === 'function' && arg.includes(excludeItem)) return;
      }
    }
  }
  initialConsoleError(...args);
};
const initialConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args?.length) {
    // eslint-disable-next-line no-restricted-syntax
    for (const arg of args) {
      // eslint-disable-next-line no-restricted-syntax
      for (const excludeItem of excludeList) {
        if (typeof arg?.includes === 'function' && arg.includes(excludeItem)) return;
      }
    }
  }
  initialConsoleWarn(...args);
};

reportWebVitals();

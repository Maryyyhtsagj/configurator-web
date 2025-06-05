import { useState } from 'react';

const UseInputState = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState('');

  const handleValue = (ev, setInstantly = false) => {
    if (setInstantly) {
      setValue(ev);
    } else {
      if (!ev) {
        return false;
      }
      if (typeof ev === 'string' || typeof ev === 'number' || typeof ev === 'function') {
        setValue(ev);
      } else {
        setValue(ev.target.value);
      }
    }

    if (error) {
      setError('');
    }
  };
  return [value, handleValue, error, setError];
};

export default UseInputState;

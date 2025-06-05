import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import Input from '../Input';
import useInputState from '../../hooks/useInputState';
import DropdownIcon from '../../assets/icons/arrowBottomThick.svg';
import useComponentVisible from '../../hooks/useComponentVisible';
import useTranslations from '../../hooks/useTranslations';
import { DICTIONARY } from '../../translations/dictionary';
import { windowWidthAtom } from '../../atoms/globalAtoms';

function Select({
  items = [],
  value,
  onChange,
  dropdownHeight = 204,
  width = 260,

  valueField = 'value',
  labelField = 'label',
  ...p
}) {
  const { t } = useTranslations();
  const [searchVal, setSearchVal] = useInputState('');
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible();
  const [filteredItems, setFilteredItems] = useState([]);
  const [windowWidth] = useAtom(windowWidthAtom);

  const calculatedStyle = useMemo(() => (
    {
      width: typeof width === 'string' ? width : `${width}px`,
    }
  ), [width]);

  const onFocus = (ev) => {
    setIsComponentVisible(true);
  };

  const onBlur = () => {
  };

  const onItemClick = (item) => {
    onChange(item, true);
    setIsComponentVisible(false);
  };

  useEffect(() => {
    if (searchVal.length) {
      setFilteredItems(items.filter((item) => item[labelField].toLowerCase().includes(searchVal.toLowerCase())));
    } else {
      setFilteredItems([...items]);
    }
  }, [items, searchVal]);

  useEffect(() => {
    setSearchVal(value?.[labelField] || '', true);
  }, [value]);

  useEffect(() => {
    if (isComponentVisible) {
      setSearchVal('', true);
    } else if (!isComponentVisible) {
      if (value?.[labelField]) {
        setSearchVal(value[labelField], true);
      }
    }
  }, [isComponentVisible]);

  return (
    <div className={styles.select} ref={ref} style={calculatedStyle}>
      <Input
        cursor={isComponentVisible ? 'text' : 'pointer'}
        rightIcon={DropdownIcon}
        width="100%"
        onFocus={onFocus}
        onClick={onFocus}
        onBlur={onBlur}
        value={searchVal}
        onChange={setSearchVal}
        readOnly={windowWidth <= 900}
        {...p}
      />
      <div
        className={classNames(styles.list, { [styles.listVisible]: isComponentVisible, [styles.listLow]: !p.text?.length })}
        style={{ maxHeight: `${dropdownHeight}px` }}
      >
        {filteredItems.length ? filteredItems.map((item) => (
          <div
            key={item[valueField]}
            className={styles.listItem}
            onClick={() => onItemClick(item)}
          >
            <p className={styles.listItemText}>{item[labelField]}</p>
          </div>
        )) : <div className={styles.emptyText}>{t(DICTIONARY.empty)}</div>}
      </div>
    </div>
  );
}

export default Select;

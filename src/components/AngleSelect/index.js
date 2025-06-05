import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import Input from '../../ui-kit/Input';
import useInputState from '../../hooks/useInputState';
import DropdownIcon from '../../assets/icons/arrowBottomThick.svg';
import TickIcon from '../../assets/icons/tickWhite.svg';
import CrossIcon from '../../assets/icons/crossDark.svg';
import CrossSmallIcon from '../../assets/icons/crossExtraSmall.svg';
import useComponentVisible from '../../hooks/useComponentVisible';
import useTranslations from '../../hooks/useTranslations';
import { DICTIONARY } from '../../translations/dictionary';
import Checkbox from '../../ui-kit/Checkbox';

const SELF_VALUE = 'SELF_VALUE';
const MORE_VALUE = 'MORE_VALUE';
function AngleSelect({
  items = [],
  values = [],
  onChange,

  labelField = 'name',
  valueField = 'id',

  maxValuesCount,

  ...p
}) {
  const { t, lang } = useTranslations();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible();
  const [listInputVal, setListInputVal, listInputValError, setListInputValError] = useInputState();
  const isMaxCountReached = useMemo(() => values.length >= maxValuesCount, [values, maxValuesCount]);
  const isSelfValueSaved = useMemo(() => values.some((i) => i[valueField] === SELF_VALUE), [values, valueField]);
  const valuesToDraw = useMemo(() => (values.length > 3
    ? [values[0], values[1], { [valueField]: MORE_VALUE, [labelField]: t(DICTIONARY.anglesMore, values.length - 2) }]
    : values), [values, maxValuesCount, valueField, labelField, lang]);

  const onInputClick = () => {
    setIsComponentVisible(true);
  };

  const onBlur = () => {
  };

  const onListButtonClick = () => {
    if (isSelfValueSaved) {
      let newList = [...values];
      newList = newList.filter((i) => i[valueField] !== SELF_VALUE);
      setListInputVal('', true);
      onChange(newList);
      return;
    }

    if ((!listInputVal && listInputVal !== 0)
        || listInputVal > 90 || listInputVal < 0
        || listInputVal?.includes('e') || listInputVal?.includes('.') || listInputVal?.includes('-')
        || values.some((i) => i[labelField] === `${listInputVal}°`)
    ) {
      return setListInputValError('NO_ERROR_TEXT');
    }

    const newList = [...values];
    newList.push({ [valueField]: SELF_VALUE, [labelField]: `${listInputVal}°` });
    onChange(newList);
  };

  const onTagClick = (value) => {
    let newList = [...values];
    newList = newList.filter((i) => i[valueField] !== value[valueField]);
    onChange(newList);
  };

  const onItemClick = (item) => {
    let newList = [...values];
    if (values.some((i) => i[valueField] === item[valueField])) {
      newList = newList.filter((i) => i[valueField] !== item[valueField]);
    } else {
      newList.push(item);
    }
    onChange(newList);
  };

  useEffect(() => {
    setListInputVal('', true);

    if (isComponentVisible && isSelfValueSaved) {
      setListInputVal(values.find((i) => i[valueField] === SELF_VALUE)[labelField].slice(0, -1), true);
    }
  }, [isComponentVisible]);

  return (
    <div className={styles.select} ref={ref}>
      <Input
        rightIcon={DropdownIcon}
        width="100%"
        onBlur={onBlur}
        disabled
        onClick={onInputClick}
        placeholder={!values.length ? t(DICTIONARY.chooseAngles) : ''}
        {...p}
      />
      <div className={styles.mainRow} onClick={onInputClick}>
        {valuesToDraw.map((i) => (
          <div
            className={styles.tag}
            key={i[valueField]}
            onClick={(ev) => ev.stopPropagation()}
          >
            <p className={styles.tagName}>{i[labelField]}</p>
            {i[valueField] !== MORE_VALUE && (
              <div onClick={() => onTagClick(i)} className={classNames(styles.tagIcon, 'pressable')}>
                <img src={CrossSmallIcon} alt="X" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className={classNames(styles.list, { [styles.listVisible]: isComponentVisible })}
      >
        <div className={styles.listScrollable}>
          <div
            className={classNames(styles.listInputRow)}
            style={(isMaxCountReached && !isSelfValueSaved) ? stylesLocal.opacity : undefined}
          >
            <Input
              width={159}
              style={stylesLocal.listInput}
              value={listInputVal}
              onChange={setListInputVal}
              placeholder={t(DICTIONARY.setAngle)}
              type="number"
              error={listInputValError}
              disabled={isMaxCountReached || isSelfValueSaved}
            />
            <div
              onClick={(!isMaxCountReached || isSelfValueSaved) ? onListButtonClick : undefined}
              className={classNames(styles.tickButton, {
                [styles.tickButtonDisabled]: isMaxCountReached && !isSelfValueSaved,
                [styles.tickButtonSelfSaved]: isSelfValueSaved,
              })}
            >
              <img src={isSelfValueSaved ? CrossIcon : TickIcon} alt="V" />
            </div>
          </div>
          <div>
            {items.length ? (
              <>
                {items.map((item) => (
                  <div
                    key={item[valueField]}
                    className={styles.listItem}
                  >
                    <Checkbox
                      text={item[labelField]}
                      value={values.some((i) => i[valueField] === item[valueField])}
                      onClick={() => onItemClick(item)}
                      disabled={!values.some((i) => i[valueField] === item[valueField]) && isMaxCountReached}
                    />
                  </div>
                ))}
                <div
                  className={styles.listItem}
                >
                  <Checkbox
                    text={t(DICTIONARY.angleMain)}
                    value
                    disabled
                  />
                </div>
              </>
            ) : <div className={styles.emptyText}>{t(DICTIONARY.empty)}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

const stylesLocal = {
  listInput: {
    height: '38px',
    padding: '0 10px',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  opacity: {
    opacity: 0.6,
  },
};

export default AngleSelect;

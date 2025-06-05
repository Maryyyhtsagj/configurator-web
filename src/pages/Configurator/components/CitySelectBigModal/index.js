import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useAtom } from 'jotai/index';
import classNames from 'classnames';
import _ from 'lodash';
import { v4 } from 'uuid';
import styles from './css/index.module.scss';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import Input from '../../../../ui-kit/Input';
import CloseIcon from '../../../../assets/icons/crossDark.svg';
import {
  configuratorAllCitiesAtom, configuratorAllCitiesLoadingAtom,
  configuratorCitiesAtom, configuratorRegionsAtom,
  configuratorSelectedCityAtom,
} from '../../../../atoms/configuratorAtoms';
import useInputState from '../../../../hooks/useInputState';
import Select from '../../../../ui-kit/Select';
import sendRequest from '../../../../helpers/sendRequest';
import Api from '../../../../api';
import sleep from '../../../../helpers/sleep';
import { closeModalAtom } from '../../../../atoms/modalAtoms';
import useComponentSizes from '../../../../hooks/useComponentSizes';
import Loading from '../../../../ui-kit/Loading';
import { windowWidthAtom } from '../../../../atoms/globalAtoms';

const COLUMN_WIDTH = 210;
const ROW_HEIGHT = 18.2;

function CitySelectBigModal() {
  const { t } = useTranslations();
  const listRef = useRef(null);
  const { sizes: { width: listWidth, height: listHeight } } = useComponentSizes({ componentRef: listRef });

  const [windowWidth] = useAtom(windowWidthAtom);
  const [, closeModal] = useAtom(closeModalAtom);
  const [configuratorCities] = useAtom(configuratorCitiesAtom);
  const [configuratorSelectedCity, setConfiguratorSelectedCity] = useAtom(configuratorSelectedCityAtom);
  const [configuratorRegions] = useAtom(configuratorRegionsAtom);
  const [configuratorAllCities, setConfiguratorAllCities] = useAtom(configuratorAllCitiesAtom);
  const [configuratorAllCitiesLoading, setConfiguratorAllCitiesLoading] = useAtom(configuratorAllCitiesLoadingAtom);

  const [cityQuery, setCityQuery] = useInputState('');
  const [selectedRegion, setSelectedRegion] = useInputState();
  const [filteredCities, setFilteredCities] = useState([]);

  const itemsMinCountPerColumn = useMemo(() => Math.floor(listHeight / ROW_HEIGHT), [listHeight]);

  const splitList = useMemo(() => {
    const columnCount = Math.max(Math.floor(listWidth / COLUMN_WIDTH), 1);
    const itemsPerColumn = Math.max(Math.ceil(filteredCities.length / columnCount), itemsMinCountPerColumn);
    return _.chunk(filteredCities, itemsPerColumn);
  }, [listWidth, filteredCities.length, itemsMinCountPerColumn]);

  const onCityClick = (city) => {
    setConfiguratorSelectedCity(city);
    closeModal();
  };

  const getAllCitiesRequest = async () => {
    const data = await sendRequest({
      request: Api.getALlCities,
      setLoading: setConfiguratorAllCitiesLoading,
    });

    if (data?.status === 'ok') {
      setConfiguratorAllCities(data.data.cities);
    }
  };

  const addSpaceToFilteredList = (list) => {
    // adding visual height between big and small cities
    let lastBigCityIndex = -1;
    for (let i = 0; i < list.length; i++) {
      if (!list[i].show_on_top) break;
      lastBigCityIndex = i;
    }

    if (lastBigCityIndex !== -1) list.splice(lastBigCityIndex + 1, 0, { id: v4(), isEmpty: true });
    setFilteredCities(list);
  };

  useEffect(() => {
    if (!configuratorAllCities?.length && !configuratorAllCitiesLoading) {
      getAllCitiesRequest().then();
    }
  }, []);

  useEffect(() => {
    if (cityQuery?.length <= 2 && !selectedRegion) {
      return addSpaceToFilteredList([...configuratorAllCities]);
    }

    const timer = setTimeout(() => {
      const filtered = configuratorAllCities.filter(
        (i) => (cityQuery?.length ? i.name.toLowerCase().includes(cityQuery.toLowerCase()) : true)
          && (selectedRegion?.id ? i.area_id === selectedRegion.id : true),
      );
      addSpaceToFilteredList(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [cityQuery, configuratorAllCities?.length, selectedRegion]);

  return (
    <div className={styles.citySelectBigModal}>
      <p className={styles.title}>{t(DICTIONARY.selectCity)}</p>
      <div className={styles.inputsRow}>
        <Input
          value={cityQuery}
          onChange={setCityQuery}
          width={windowWidth <= 900 ? '100%' : 292}
          placeholder={t(DICTIONARY.setCityName)}
        />
        <Select
          items={configuratorRegions}
          valueField="id"
          labelField="name"
          value={selectedRegion}
          onChange={setSelectedRegion}
          placeholder={t(DICTIONARY.setRegion)}
          width={windowWidth <= 900 ? '100%' : 292}
        />
        {Boolean(selectedRegion) && (
          <div
            className={classNames(styles.clearButton, 'pressable')}
            onClick={() => setSelectedRegion('', true)}
          >
            <img src={CloseIcon} alt="X" />
          </div>
        )}
      </div>

      {configuratorAllCitiesLoading ? (
        <div className={styles.loading}><Loading /></div>
      ) : (
        <div ref={listRef} className={classNames(styles.list, 'blueVerticalScroll')}>
          {splitList.map((column, index) => (
            <div
              key={index}
              className={styles.column}
            >
              {column.map((i) => (
                <div
                  key={i.id}
                  onClick={!i.isEmpty ? () => onCityClick(i) : undefined}
                  className={classNames(styles.cityItem, {
                    [styles.cityItemBold]: i.show_on_top, [styles.cityItemEmpty]: i.isEmpty,
                  }, !i.isEmpty && 'pressable')}
                >
                  {i.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CitySelectBigModal;

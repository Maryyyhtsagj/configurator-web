import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai/index';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import Input from '../../../../ui-kit/Input';
import SearchIcon from '../../../../assets/icons/search.svg';
import TickIcon from '../../../../assets/icons/tickWhiteSmall.svg';
import {
  configuratorAllCitiesAtom, configuratorAllCitiesLoadingAtom,
  configuratorCitiesAtom,
  configuratorSelectedCityAtom,
} from '../../../../atoms/configuratorAtoms';
import Button, { BUTTON_VARIANTS } from '../../../../ui-kit/Button';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import { closeModalAtom, modalInitObj, modalStateAtom } from '../../../../atoms/modalAtoms';
import useInputState from '../../../../hooks/useInputState';
import sendRequest from '../../../../helpers/sendRequest';
import Api from '../../../../api';
import Loading from '../../../../ui-kit/Loading';
import sleep from '../../../../helpers/sleep';
import CitySelectBigModal from '../CitySelectBigModal';
import { windowWidthAtom } from '../../../../atoms/globalAtoms';

function CitySelectModal() {
  const { t } = useTranslations();

  const [windowWidth] = useAtom(windowWidthAtom);
  const [, closeModal] = useAtom(closeModalAtom);
  const [, setModalState] = useAtom(modalStateAtom);
  const [configuratorCities] = useAtom(configuratorCitiesAtom);
  const [configuratorSelectedCity, setConfiguratorSelectedCity] = useAtom(configuratorSelectedCityAtom);
  const [configuratorAllCities, setConfiguratorAllCities] = useAtom(configuratorAllCitiesAtom);
  const [configuratorAllCitiesLoading, setConfiguratorAllCitiesLoading] = useAtom(configuratorAllCitiesLoadingAtom);

  const [cityQuery, setCityQuery] = useInputState('');
  const [filteredCities, setFilteredCities] = useState([...configuratorCities]);

  const onCityClick = (city) => {
    setConfiguratorSelectedCity(city);
    closeModal();
  };

  const onAnotherCityClick = () => {
    setModalState({
      ...modalInitObj,
      isOpen: true,
      children: <CitySelectBigModal />,
    });
  };

  const getAllCitiesRequest = async () => {
    setConfiguratorAllCitiesLoading(true);
    const data = await sendRequest({
      request: Api.getALlCities,
    });

    if (data?.status === 'ok') {
      setConfiguratorAllCities(data.data.cities);
    }

    await sleep(310);
    setConfiguratorAllCitiesLoading(false);
  };

  useEffect(() => {
    if (cityQuery?.length <= 2) {
      return setFilteredCities([...configuratorCities]);
    }
    const timer = setTimeout(() => {
      if (!configuratorAllCities?.length && !configuratorAllCitiesLoading) {
        return getAllCitiesRequest().then();
      }

      setFilteredCities(configuratorAllCities.filter((i) => i.name.toLowerCase().includes(cityQuery.toLowerCase())));
    }, 300);

    return () => clearTimeout(timer);
  }, [cityQuery, configuratorCities, configuratorAllCities?.length]);

  return (
    <div className={styles.citySelectModal}>
      <div className={classNames(styles.scrollable, 'blueVerticalScroll')}>
        <Input
          value={cityQuery}
          onChange={setCityQuery}
          width="100%"
          placeholder={t(DICTIONARY.citySearch)}
          rightIcon={SearchIcon}
        />
        {configuratorAllCitiesLoading ? (
          <div className={styles.loading}><Loading /></div>
        ) : filteredCities.map((i) => (
          <div key={i.id} className={styles.cityItem} onClick={() => onCityClick(i)}>
            <p className={styles.cityName}>{i.name}</p>
            <img src={TickIcon} alt="V" className="noSelection" />
          </div>
        ))}
      </div>

      <Button
        text={t(DICTIONARY.anotherCity)}
        variant={BUTTON_VARIANTS.secondary}
        width="100%"
        onClick={onAnotherCityClick}
      />
    </div>
  );
}

export default CitySelectModal;

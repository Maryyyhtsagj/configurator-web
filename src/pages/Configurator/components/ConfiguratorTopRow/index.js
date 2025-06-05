import React, { useEffect } from 'react';
import { useAtom } from 'jotai/index';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import LocationIcon from '../../../../assets/icons/location.svg';
import {
  configuratorCitiesAtom,
  configuratorLayersListAtom,
  configuratorSelectedCityAtom,
} from '../../../../atoms/configuratorAtoms';
import RefreshIcon from '../../../../assets/icons/refresh.svg';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import { modalStateAtom, openConfirmModalAtom } from '../../../../atoms/modalAtoms';
import CitySelectModal from '../CitySelectModal';
import { windowWidthAtom } from '../../../../atoms/globalAtoms';
import ArrowBottom from '../../../../assets/icons/arrowBottom.svg';

function ConfiguratorTopRow({ refreshConfiguration }) {
  const { t } = useTranslations();

  const [configuratorLayersList, setConfiguratorLayersList] = useAtom(configuratorLayersListAtom);

  const [windowWidth] = useAtom(windowWidthAtom);
  const [, setModalState] = useAtom(modalStateAtom);
  const [, openConfirmModal] = useAtom(openConfirmModalAtom);
  const [configuratorCities] = useAtom(configuratorCitiesAtom);
  const [configuratorSelectedCity, setConfiguratorSelectedCity] = useAtom(configuratorSelectedCityAtom);

  const onRefreshConfigurationClick = () => {
    openConfirmModal({
      text: t(DICTIONARY.sureToCleanConfiguration),
      onButtonClick: refreshConfiguration,
    });
  };

  const onCityClick = async () => {
    if (windowWidth <= 900) {
      setModalState({
        isOpen: true,
        containerStyle: { padding: 0 },
        children: <CitySelectModal />,
        withCloseButton: false,
        closeTimeoutMS: 0,
      });
    } else {
      setModalState({
        isOpen: true,
        children: <CitySelectModal />,
        containerStyle: { padding: 0 },
        overlayStyle: { backgroundColor: 'rgba(0,0,0,0)' },
        style: {
          top: '120px',
          left: '390px',
          transform: 'translate(0, 0)',
        },
        withCloseButton: false,
        closeTimeoutMS: 0,
      });
    }
  };

  useEffect(() => {
    if (configuratorCities?.length) {
      const selected = configuratorCities.find((i) => i.selected);
      if (selected) setConfiguratorSelectedCity(selected);
    }
  }, [configuratorCities]);

  return (
    <div className={styles.configuratorTopRow}>
      <div className={classNames(styles.citySelect, 'pressable')} onClick={onCityClick}>
        <img src={LocationIcon} alt="V" />
        <p>{configuratorSelectedCity?.name || t(DICTIONARY.selectCity)}</p>
        <img src={ArrowBottom} alt="V" />
      </div>

      {Boolean(configuratorLayersList.length) && (
        <div
          className={classNames(styles.refresh, 'pressable')}
          onClick={onRefreshConfigurationClick}
        >
          <img src={RefreshIcon} alt="<" />
          <p>{t(DICTIONARY.refreshConfiguration)}</p>
        </div>
      )}
    </div>
  );
}

export default ConfiguratorTopRow;

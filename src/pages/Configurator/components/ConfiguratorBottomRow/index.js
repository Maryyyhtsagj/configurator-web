import React, { useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import {
  configuratorAnglesAtom,
  configuratorCalculationsAtom,
  configuratorGlassTypesAtom,
  configuratorLayersErrorsAtom,
  configuratorLayersListAtom,
  configuratorMaxAnglesCountAtom, configuratorSelectedAnglesAtom,
  configuratorSelectedCityAtom, configuratorSingleConfigurationAtom,
} from '../../../../atoms/configuratorAtoms';
import Input from '../../../../ui-kit/Input';
import useInputState from '../../../../hooks/useInputState';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import Select from '../../../../ui-kit/Select';
import Button from '../../../../ui-kit/Button';
import ConfiguratorServices from '../../../../services/ConfiguratorServices';
import sendRequest from '../../../../helpers/sendRequest';
import Api from '../../../../api';
import { windowWidthAtom } from '../../../../atoms/globalAtoms';
import AngleSelect from '../../../../components/AngleSelect';
import { materialsAtom } from '../../../../atoms/categoriesAtoms';
import { openInfoModalAtom } from '../../../../atoms/modalAtoms';

function ConfiguratorBottomRow({ isConfiguring }) {
  const { t } = useTranslations();
  const [, openInfoModal] = useAtom(openInfoModalAtom);
  const [windowWidth] = useAtom(windowWidthAtom);
  const [configuratorLayersList, setConfiguratorLayersList] = useAtom(configuratorLayersListAtom);
  const [, setConfiguratorCalculations] = useAtom(configuratorCalculationsAtom);
  const [configuratorGlassTypes] = useAtom(configuratorGlassTypesAtom);
  const [configuratorSelectedCity] = useAtom(configuratorSelectedCityAtom);
  const [configuratorAngles] = useAtom(configuratorAnglesAtom);
  const [configuratorMaxAnglesCount] = useAtom(configuratorMaxAnglesCountAtom);
  const [configuratorLayersErrors, setConfiguratorLayersErrors] = useAtom(configuratorLayersErrorsAtom);
  const [configuratorSingleConfiguration, setConfiguratorSingleConfiguration] = useAtom(configuratorSingleConfigurationAtom);
  const [materials] = useAtom(materialsAtom);

  const [configurationCode, setConfigurationCode] = useInputState();
  const [glassType, setGlassType] = useInputState();
  const [angles, setAngles] = useAtom(configuratorSelectedAnglesAtom);
  const [calculatingLoading, setCalculatingLoading] = useState(false);
  const isSmallScreen = useMemo(() => windowWidth <= 900, [windowWidth]);

  const onConfigureClick = async () => {
    const payload = {
      code: configurationCode,
      base_material: glassType.id,
    };

    const data = await sendRequest({
      request: Api.createConfigurationWithScratch,
      payload,
      warnErrorText: 'while creating with scratch code',
    });

    if (data?.status === 'ok') {
      const newLayers = ConfiguratorServices.getLayersFromScratchResponse(data.data, materials);
      setConfiguratorLayersList(newLayers);
    }
  };

  const onCalculateClick = async () => {
    const errorsCount = ConfiguratorServices.checkLayersErrorsCount(configuratorLayersList, configuratorLayersErrors);
    if (errorsCount) return openInfoModal({ text: t(DICTIONARY.cannotCalculate, errorsCount) });

    const { newArr } = ConfiguratorServices.checkParentMaterialIdForTriplex({ layers: configuratorLayersList });

    setConfiguratorLayersList(newArr);

    const payload = {
      configuration_id: configuratorSingleConfiguration?.id,
      city_id: configuratorSelectedCity?.id,
      angles: angles.map((i) => i.name.slice(0, -1)),
      config: newArr.map((layer) => ({
        material_id: layer.material.id,
        parent_material_id: layer.material.parent_material_id,
        options: layer.material.selected_options,
      })),
    };

    const data = await sendRequest({
      request: Api.calculateConfiguration,
      payload,
      warnErrorText: 'while calculating',
    });

    handleCalculationResponse(data);
  };

  const handleCalculationResponse = (res) => {
    console.log(res?.data);
    if (res?.status === 'failed' && res.data) {
      // in this case we have list of indexes and errors of the layers that are not ordered properly
      const newErrors = { ...configuratorLayersErrors };
      const errorKeys = Object.keys(res.data);
      if (errorKeys.length) {
        errorKeys.forEach((errorKey) => {
          if (errorKey?.startsWith('config.')) {
            const layerIndex = errorKey.split('.')[1];
            newErrors[configuratorLayersList[layerIndex].id].bottom = res.data[errorKey];
          }
        });
        setConfiguratorLayersErrors(newErrors);
      }
    } else if (res?.status === 'ok') {
      // in this case everything is ok and we have the configuration
      setConfiguratorCalculations(res.data);
      const newObj = {
        id: res.data.id, name: res.data.name, project_id: res.data.project_id, description: res.data.description,
      };
      setConfiguratorSingleConfiguration((prev) => (prev ? ({ ...prev, ...newObj }) : res.data));
    }
  };

  useEffect(() => {
    if (configuratorGlassTypes?.length) {
      const defaultGlassType = configuratorGlassTypes.find((i) => i.selected === true);
      if (defaultGlassType) setGlassType(defaultGlassType, true);
    }
  }, [configuratorGlassTypes]);

  return (
    <div className={styles.configuratorBottomRow}>
      {isConfiguring ? (
        <div className={styles.componentsList}>
          <AngleSelect
            text={t(DICTIONARY.angleOfInclination)}
            items={configuratorAngles}
            values={angles}
            onChange={setAngles}
            hintText={t(DICTIONARY.anglesHint)}
            maxValuesCount={configuratorMaxAnglesCount}
          />
          <Button
            width={isSmallScreen ? '100%' : null}
            isDisabled={calculatingLoading}
            onClick={onCalculateClick}
            text={t(DICTIONARY.calculate)}
          />
        </div>
      ) : (
        <div className={styles.componentsList}>
          <Input
            text={t(DICTIONARY.setConfiguration)}
            value={configurationCode}
            onChange={setConfigurationCode}
            width={isSmallScreen ? '100%' : 341}
            placeholder="Например: 6-14-4-14-44.2 или 6/14/4/14/44.2"
            hintText={t(DICTIONARY.configurationCodeHint)}
            style={{ letterSpacing: configurationCode?.length ? '1px' : 'unset' }}
          />
          <Select
            text={t(DICTIONARY.mainGlass)}
            items={configuratorGlassTypes}
            valueField="id"
            labelField="name"
            value={glassType}
            onChange={setGlassType}
            width={isSmallScreen ? '100%' : 200}
            hintText={t(DICTIONARY.glassHint)}
          />
          <Button
            isDisabled={!configurationCode?.length || !glassType}
            width={isSmallScreen ? '100%' : null}
            onClick={onConfigureClick}
            text={t(DICTIONARY.configure)}
          />
        </div>
      )}
    </div>
  );
}

export default ConfiguratorBottomRow;

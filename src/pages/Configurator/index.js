import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import { useSearchParams } from 'react-router-dom';
import styles from './css/index.module.scss';
import ConfiguratorCategories from './components/ConfiguratorCategories';
import ConfiguratorMain from './components/ConfiguratorMain';
import useConfigurator from '../../hooks/useConfigurator';
import {
  configuratorCalculationsAtom,
  configuratorLayersListAtom,
  draggingPositionAtom,
} from '../../atoms/configuratorAtoms';
import ConfigurationDetails from '../../components/ConfigurationDetails';
import useConfigurations from '../../hooks/useConfigurations';
import { gettingSingleConfigurationLoadingAtom } from '../../atoms/configurationsAtoms';
import { closeModalAtom, openLoadingModalAtom } from '../../atoms/modalAtoms';
import { isInitAtom } from '../../atoms/globalAtoms';

function Configurator() {
  const {
    onDragStart, onDrag, onDragStop, onLayerClick, onRemoveLayerClick, getSingleConfiguration, refreshConfiguration,
  } = useConfigurator();
  const [searchParams, setSearchParams] = useSearchParams();
  const configurationId = searchParams.get('configuration_id');
  const onlyDetails = searchParams.get('only_details') === 'true';

  const [isInit] = useAtom(isInitAtom);
  const [configuratorCalculations] = useAtom(configuratorCalculationsAtom);
  const [configuratorLayersList] = useAtom(configuratorLayersListAtom);
  const [draggingPosition] = useAtom(draggingPositionAtom);
  const [gettingSingleConfigurationLoading] = useAtom(gettingSingleConfigurationLoadingAtom);
  const [, openLoadingModal] = useAtom(openLoadingModalAtom);
  const [, closeModal] = useAtom(closeModalAtom);

  const isOnlyConfigurator = useMemo(() => !configuratorCalculations && !gettingSingleConfigurationLoading, [configuratorCalculations, gettingSingleConfigurationLoading]);
  const isOnlyDetails = useMemo(() => (configuratorCalculations || gettingSingleConfigurationLoading) && onlyDetails, [onlyDetails, configuratorCalculations, gettingSingleConfigurationLoading]);
  const isConfiguring = useMemo(
    () => !!configuratorLayersList?.length || draggingPosition,
    [configuratorLayersList?.length, draggingPosition],
  );

  useEffect(() => {
    if (!isInit) return;
    if (configurationId) {
      getSingleConfiguration({ id: configurationId }).then();
    }
  }, [configurationId, isInit]);

  useEffect(() => {
    if (gettingSingleConfigurationLoading) openLoadingModal();
    else closeModal();
  }, [gettingSingleConfigurationLoading]);

  useEffect(() => {
    if (!configurationId) {
      refreshConfiguration();
    }
  }, [configurationId]);

  return (
    <div className={styles.configurator}>
      {!isOnlyDetails && (
        <div className={classNames(styles.topRow, isOnlyConfigurator && styles.topRowOnlyConfigurator)}>
          <ConfiguratorCategories
            isOnlyConfigurator={isOnlyConfigurator}
            draggingProps={{
              onDragStart,
              onDrag,
              onDragStop,
            }}
          />
          <ConfiguratorMain
            isConfiguring={isConfiguring}
            draggingProps={{
              onDragStart,
              onDrag,
              onDragStop,
            }}
            clickingProps={{
              onLayerClick,
              onRemoveLayerClick,
            }}
            refreshConfiguration={refreshConfiguration}
          />
        </div>
      )}

      {!isOnlyConfigurator && (
        <ConfigurationDetails withConfigurator={!isOnlyDetails} refreshConfiguration={refreshConfiguration} />
      )}
    </div>
  );
}

export default Configurator;

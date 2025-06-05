import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import DraggedFloatingLayer from '../DraggedFloatingLayer';
import ConfiguratorTopRow from '../ConfiguratorTopRow';
import ConfiguratorTemplates from '../ConfiguratorTemplates';
import ConfiguratorBottomRow from '../ConfiguratorBottomRow';
import ConfiguratorLayers from '../ConfiguratorLayers';

function ConfiguratorMain({
  isConfiguring,
  draggingProps,
  clickingProps,
  refreshConfiguration,
}) {
  return (
    <div className={styles.configuratorMain}>
      <ConfiguratorTopRow refreshConfiguration={refreshConfiguration} />
      {isConfiguring ? (
        <ConfiguratorLayers
          draggingProps={draggingProps}
          clickingProps={clickingProps}
        />
      ) : (
        <ConfiguratorTemplates />
      )}
      <ConfiguratorBottomRow isConfiguring={isConfiguring} />
      <DraggedFloatingLayer />
    </div>
  );
}

export default ConfiguratorMain;

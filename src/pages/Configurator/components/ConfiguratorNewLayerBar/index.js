import React, { useMemo } from 'react';
import { useAtom } from 'jotai/index';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import {
  configuratorCurrentLayersWidthsAtom, configuratorLayersListSizesAtom,
  draggedLayerNewIndexAtom, draggedLayerStartXAtom,
} from '../../../../atoms/configuratorAtoms';

const BAR_WIDTH = 4;

function ConfiguratorNewLayerBar() {
  const [configuratorCurrentLayersWidths] = useAtom(configuratorCurrentLayersWidthsAtom);
  const [draggedLayerNewIndex] = useAtom(draggedLayerNewIndexAtom);
  const [draggedLayerStartX] = useAtom(draggedLayerStartXAtom);
  const [configuratorLayersListSizes] = useAtom(configuratorLayersListSizesAtom);

  const isVisible = useMemo(() => draggedLayerNewIndex !== null, [draggedLayerNewIndex]);
  const transformX = useMemo(() => (
    isVisible ? draggedLayerStartX - BAR_WIDTH / 2
      : configuratorLayersListSizes?.width ? configuratorLayersListSizes.width / 2
        : 0), [isVisible, draggedLayerStartX, configuratorLayersListSizes]);

  return (
    <div
      className={classNames(
        styles.newLayerBar,
        { [styles.visible]: isVisible },
      )}
      style={{
        transform: `translateX(${transformX}px)`,
        width: `${BAR_WIDTH}px`,
      }}
    />
  );
}

export default ConfiguratorNewLayerBar;

import React, { useEffect, useMemo } from 'react';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import {
  draggableLayerMaterialAtom,
  draggedLayerNewIndexAtom,
  draggingPositionAtom,
} from '../../../../atoms/configuratorAtoms';
import LayerBody from '../LayerBody';
import { MATERIALS_INFO } from '../../../../constants/configurator';

function DraggedFloatingLayer() {
  const [draggingPosition] = useAtom(draggingPositionAtom);
  const [draggableLayerMaterial] = useAtom(draggableLayerMaterialAtom);

  const isNotMoving = useMemo(() => (
    (!draggingPosition || (draggingPosition.left === 0 && draggingPosition.top === 0))
      || !draggableLayerMaterial
  ), [draggingPosition, draggableLayerMaterial]);
  const isMoving = !isNotMoving;

  const thisMaterialInfo = MATERIALS_INFO[draggableLayerMaterial?.material_type_id];

  useEffect(() => {
    if (isMoving) {
      document.body.style.cursor = 'move';
    } else {
      document.body.style.cursor = 'unset';
    }
  }, [isMoving]);

  return (!isMoving ? null
    : (
      <div
        className={styles.floatingLayer}
        style={{
          left: draggingPosition.left - thisMaterialInfo.layerBodyWidth / 2,
          top: draggingPosition.top - thisMaterialInfo.layerBodyHeight / 2,
          width: thisMaterialInfo.layerBodyWidth,
          height: thisMaterialInfo.layerBodyHeight,
        }}
      >
        <LayerBody material={draggableLayerMaterial} />
      </div>
    )
  );
}

export default DraggedFloatingLayer;

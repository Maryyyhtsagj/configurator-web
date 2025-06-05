import React from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import PlusBlueIcon from '../../../../assets/icons/plusBlue.svg';
import Draggable from '../../../../components/Draggable';
import LayerBody from '../LayerBody';
import { configuratorLayersListAtom } from '../../../../atoms/configuratorAtoms';

function CategoriesMaterialItem({
  material,
  draggingProps: { onDragStart, onDrag, onDragStop },
  withPath = false,
  actLikeClickable = false,
}) {
  return (
    <>
      {withPath && <p className={styles.path}>{material.path.join(' / ')}</p>}
      <Draggable
        className={classNames(styles.materialItem, 'noSelection')}
        onDragStart={onDragStart({ item: material, index: null, isNewLayer: true })}
        onDrag={onDrag({ item: material, index: null, isNewLayer: true })}
        onDragEnd={onDragStop({ item: material, index: null, isNewLayer: true })}
        touchAction="pan-y"
        actLikeClickable={actLikeClickable}
      >
        <p className={styles.materialItemName}>{material.name}</p>

        <img src={PlusBlueIcon} className={styles.materialItemIcon} alt="+" draggable="false" />
      </Draggable>
    </>
  );
}

export default CategoriesMaterialItem;

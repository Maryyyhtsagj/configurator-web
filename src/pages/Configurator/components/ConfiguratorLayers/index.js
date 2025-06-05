import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai/index';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './css/index.module.scss';
import {
  configuratorLayersErrorsAtom,
  configuratorLayersListAtom, configuratorLayersListHasScrollAtom,
  configuratorLayersListRefAtom,
  draggedLayerIdAtom,
} from '../../../../atoms/configuratorAtoms';
import ConfiguratorLayer from '../ConfiguratorLayer';
import ConfiguratorNewLayerBar from '../ConfiguratorNewLayerBar';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import EmptyHeight from '../../../../components/EmptyHeight';
import useComponentSizes from '../../../../hooks/useComponentSizes';

function ConfiguratorLayersList({
  draggingProps,
  clickingProps,
}) {
  const wrapperRef = useRef(null);
  const listRef = useRef(null);
  const { t } = useTranslations();

  const { sizes: wrapperSizes } = useComponentSizes({ componentRef: wrapperRef });
  const { sizes: listSizes } = useComponentSizes({ componentRef: listRef });

  const [, setConfiguratorLayersListRef] = useAtom(configuratorLayersListRefAtom);
  const [configuratorLayersListHasScroll, setConfiguratorLayersListHasScroll] = useAtom(configuratorLayersListHasScrollAtom);
  const [configuratorLayersList] = useAtom(configuratorLayersListAtom);
  const [configuratorLayersErrors] = useAtom(configuratorLayersErrorsAtom);
  const [draggedLayerId] = useAtom(draggedLayerIdAtom);

  useEffect(() => {
    setConfiguratorLayersListRef(listRef);
  }, [listRef]);

  useEffect(() => {
    if (!configuratorLayersListHasScroll && listSizes?.width >= wrapperSizes?.width) {
      setConfiguratorLayersListHasScroll(true);
    } else if (configuratorLayersListHasScroll && listSizes?.width < wrapperSizes?.width) {
      setConfiguratorLayersListHasScroll(false);
    }
  }, [wrapperSizes?.width, listSizes?.width]);

  return (
    <div className={styles.listWrapper} ref={wrapperRef}>
      <div
        className={styles.list}
        ref={listRef}
        style={{
          overflowX: configuratorLayersListHasScroll ? 'scroll' : 'visible',
          // width: configuratorLayersListHasScroll ? 'unset' : 'fit-content',
        }}
      >
        {!configuratorLayersList?.length ? (
          <div className={styles.emptyList}>
            <p className={styles.emptyListText}>{t(DICTIONARY.emptyListText)}</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {configuratorLayersList.map((item, index) => (
              <motion.div
                key={item.id}
                layout="position"
              >
                <ConfiguratorLayer
                  layer={item}
                  layerErrors={configuratorLayersErrors[item.id]}
                  onLayerClick={clickingProps.onLayerClick({ item, index })}
                  onRemoveLayerClick={clickingProps.onRemoveLayerClick({ item, index })}
                          // dragging props
                  onDragStart={draggingProps.onDragStart({ item, index })}
                  onDrag={draggingProps.onDrag({ item, index })}
                  onDragStop={draggingProps.onDragStop({ item, index })}
                  isBeingDragged={item.id === draggedLayerId}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        <ConfiguratorNewLayerBar />
      </div>
    </div>
  );
}

export default ConfiguratorLayersList;

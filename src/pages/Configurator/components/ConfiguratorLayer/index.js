import React from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import CloseSmallIcon from '../../../../assets/icons/crossSmall.svg';
import LayerBody from '../LayerBody';
import Draggable from '../../../../components/Draggable';
import { CONFIGURATOR_ERRORS } from '../../../../constants/configurator';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';

function ConfiguratorLayer({
  layer,
  layerErrors,
  onLayerClick,
  onRemoveLayerClick,
  // dragging props
  onDragStart,
  onDrag,
  onDragStop,
  isBeingDragged,
}) {
  const { t } = useTranslations();

  return (
    <div
      className={classNames(styles.itemWrapper)}
    >
      {layerErrors?.left === CONFIGURATOR_ERRORS.missingComponent && (
        <div className={styles.missingComponent}>
          <p className={styles.missingComponentText}>{t(DICTIONARY.missingComponent)}</p>
        </div>
      )}
      <div
        onClick={onLayerClick}
        className={classNames(styles.item, {
          [styles.itemDragging]: isBeingDragged,
        })}
      >
        <div onClick={onRemoveLayerClick} className={classNames(styles.close, 'pressable')}>
          <img className={styles.closeIcon} src={CloseSmallIcon} alt="X" />
        </div>

        <Draggable
          className={classNames(styles.draggable)}
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragStop}
          touchAction="pan-x"
        >
          <LayerBody material={layer.material} />
        </Draggable>

        <div className={classNames(styles.texts)}>
          {layer.texts.map((text, textIndex) => (
            <p
              key={textIndex}
              className={classNames(styles.text, { [styles.textLight]: textIndex >= 2 })}
            >
              {text}
            </p>
          ))}
        </div>

        {layerErrors?.bottom ? (
          <div className={styles.bottomError}>
            <p className={styles.bottomErrorText}>
              {layerErrors?.bottom === CONFIGURATOR_ERRORS.invalidHeatTreatment ? t(DICTIONARY.invalidHeatTreatment)
                : layerErrors?.bottom === CONFIGURATOR_ERRORS.invalidWidth ? t(DICTIONARY.invalidWidth)
                  : layerErrors?.bottom === CONFIGURATOR_ERRORS.maxGasCount ? t(DICTIONARY.maxGasCount)
                    : layerErrors?.bottom === CONFIGURATOR_ERRORS.incompatibleCover ? t(DICTIONARY.incompatibleCover)
                      : layerErrors.bottom}
            </p>
          </div>
        ) : null}

      </div>

      {layerErrors?.right === CONFIGURATOR_ERRORS.missingComponent && (
        <div className={styles.missingComponent}>
          <p className={styles.missingComponentText}>{t(DICTIONARY.missingComponent)}</p>
        </div>
      )}

      {/* <Draggable
        className={classNames(styles.draggable, {
          [styles.draggableDragged]: isBeingDragged,
        })}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragStop}
      >
        <LayerBody material={layer.material} />
      </Draggable> */}
    </div>
  );
}

export default ConfiguratorLayer;

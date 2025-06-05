import React from 'react';
import styles from './css/index.module.scss';
import { MATERIALS_IDS } from '../../../../constants/configurator';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';

function LayerBody({ material }) {
  const { t } = useTranslations();
  return material.material_type_id === MATERIALS_IDS.glass ? <div className={styles.glass} />
    : material.material_type_id === MATERIALS_IDS.interlayer ? <div className={styles.interlayer} />
      : material.material_type_id === MATERIALS_IDS.gas ? <div className={styles.gas}><div className={styles.gasInner} /></div>
        : material.material_type_id === MATERIALS_IDS.cover ? (
          <div className={styles.cover}>
            {material.config?.visual_style === 'dotted' ? <div className={styles.coverDotted} /> : <div className={styles.coverSplash} />}
          </div>
        )
          : material.material_type_id === MATERIALS_IDS.template ? (
            <div className={styles.template}>
              {material.children?.length > 0 ? (
                <p className={styles.templateText}>
                  {material.children?.length}
                  {' '}
                  {t(DICTIONARY.components, material.children.length)}
                </p>
              ) : null}
            </div>
          ) : null;
}

export default LayerBody;

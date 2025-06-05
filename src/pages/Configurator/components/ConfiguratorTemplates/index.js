import React, { useRef } from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import ArrowLeft from '../../../../assets/icons/arrowLeftBig.svg';
import ArrowRight from '../../../../assets/icons/arrowRightBig.svg';
import { configuratorLayersListAtom, configuratorTemplatesAtom } from '../../../../atoms/configuratorAtoms';
import { initLoadingAtom } from '../../../../atoms/globalAtoms';
import Loading from '../../../../ui-kit/Loading';
import sendRequest from '../../../../helpers/sendRequest';
import Api from '../../../../api';
import ConfiguratorServices from '../../../../services/ConfiguratorServices';
import { materialsAtom } from '../../../../atoms/categoriesAtoms';

function ConfiguratorTemplates() {
  const { t } = useTranslations();
  const sliderRef = useRef(null);
  const [configuratorTemplates] = useAtom(configuratorTemplatesAtom);
  const [initLoading] = useAtom(initLoadingAtom);
  const [materials] = useAtom(materialsAtom);
  const [configuratorLayersList, setConfiguratorLayersList] = useAtom(configuratorLayersListAtom);

  const onLeftClick = () => {
    scrollByOne('left');
  };
  const onRightClick = () => {
    scrollByOne('right');
  };

  const scrollByOne = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    const itemWidth = container.firstChild
      ? (container.firstChild).offsetWidth + 8 // 8 = gap
      : 0;

    container.scrollBy({
      left: direction === 'right' ? itemWidth : -itemWidth,
      behavior: 'smooth',
    });
  };

  const onTemplateClick = async (template) => {
    const payload = {
      id: template.id,
    };

    const data = await sendRequest({
      request: Api.createConfigurationWithTemplate,
      payload,
      warnErrorText: 'while creating with template',
    });

    if (data?.status === 'ok') {
      const { newArr } = ConfiguratorServices.getLayersFromTemplateResponse(data.data.material, materials);
      setConfiguratorLayersList(newArr);
    }
  };

  return (
    <div className={styles.configuratorTemplates}>
      <p className={styles.title}>{t(DICTIONARY.configuratorTemplatesTitle)}</p>

      <div className={styles.sliderWrapper}>
        <div
          className={classNames(styles.arrow, 'pressable', 'noSelection')}
          onClick={onLeftClick}
        >
          <img src={ArrowLeft} alt="<" />
        </div>
        <div
          ref={sliderRef}
          className={classNames(styles.slider, 'noScrollBar')}
        >
          {initLoading ? <Loading /> : configuratorTemplates.map((i) => (
            <div
              key={i.id}
              className={classNames(styles.templateItem, 'pressable')}
              onClick={() => onTemplateClick(i)}
              title={i.name}
            >
              <img className={styles.templateItemIcon} src={i.pictogram} alt="icon" />
              {/* <p className={
                classNames(
                  styles.templateItemText,
                  { [styles.templateItemTextSmall]: i.name.length > 30 },
                )
}
              >
                {i.name}
              </p> */}
            </div>
          ))}
        </div>
        <div
          className={classNames(styles.arrow, 'pressable', 'noSelection')}
          onClick={onRightClick}
        >
          <img src={ArrowRight} alt=">" />
        </div>
      </div>
    </div>
  );
}

export default ConfiguratorTemplates;

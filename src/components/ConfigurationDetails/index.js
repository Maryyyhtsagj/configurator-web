import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './css/index.module.scss';
import IconButton from '../../ui-kit/IconButton';
import AddIcon from '../../assets/icons/add.svg';
import DownloadIcon from '../../assets/icons/download.svg';
import PencilIcon from '../../assets/icons/pencil.svg';
import DocumentIcon from '../../assets/icons/document.svg';
import EmailIcon from '../../assets/icons/email.svg';
import CrossDarkIcon from '../../assets/icons/crossDark.svg';
import QrImage from '../../assets/images/Qr.png';
import ReloadIcon from '../../assets/icons/reload.svg';
import CircleData from '../../ui-kit/CircleData';
import QrIcon from '../../assets/icons/qr.svg';
import useTranslations from '../../hooks/useTranslations';
import { DICTIONARY } from '../../translations/dictionary';
import { configuratorCalculationsAtom, configuratorSingleConfigurationAtom } from '../../atoms/configuratorAtoms';
import CalculationDetailsServices from '../../services/CalculationDetailsServices';
import useInputState from '../../hooks/useInputState';
import ProjectsNavigationBlocks from '../../pages/MyProjects/components/ProjectsNavigationBlocks';
import useConfigurations from '../../hooks/useConfigurations';

function ConfigurationDetails({ withConfigurator, refreshConfiguration }) {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { onAddToProjectClick, onDeleteSingleConfigurationClick, handleConfigurationDescription } = useConfigurations();
  const wrapperRef = useRef(null);
  const noteRef = useRef(null);
  const [configuratorSingleConfiguration, setConfiguratorSingleConfiguration] = useAtom(configuratorSingleConfigurationAtom);
  const [configuratorCalculations] = useAtom(configuratorCalculationsAtom);
  const [noteText, setNoteText] = useInputState();

  const shortData = useMemo(() => (
    configuratorCalculations?.short.map((i) => ({ value: CalculationDetailsServices.renderCharacteristicName(i.name), name: CalculationDetailsServices.formatNumber(i.value) }))
  ), [configuratorCalculations?.short]);

  const detailedCharacteristics = useMemo(() => (
    configuratorCalculations?.detailed.map((i) => ({
      blockTitle: i.description,
      details: i.results.map((i2) => ({ name: i2.description, value: CalculationDetailsServices.formatNumber(i2.value) })),
    }))
  ), [configuratorCalculations?.detailed]);

  const onQrClick = () => {
    window.open('https://aigrus.ru/', '_blank');
  };

  const onEditClick = () => {
    const newParams = Object.fromEntries([...searchParams.entries()]);
    newParams.only_details = 'false';
    setSearchParams(newParams, { replace: true });
  };

  const afterConfigurationEdited = (newConfiguration) => {
    const newObj = { name: newConfiguration.name, project_id: newConfiguration.project_id, description: newConfiguration.description };
    setConfiguratorSingleConfiguration((prev) => ({ ...prev, ...newObj }));
  };

  const afterConfigurationDeleted = () => {
    refreshConfiguration();
  };

  useEffect(() => {
    const textarea = noteRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto'; // reset height
    textarea.style.height = noteText?.length ? `${textarea.scrollHeight}px` : '40px'; // set new height
  }, [noteText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleConfigurationDescription(noteText).then();
    }, 1000);

    return () => clearTimeout(timer);
  }, [noteText]);

  useEffect(() => {
    setNoteText(configuratorSingleConfiguration?.description || '', true);
  }, [configuratorSingleConfiguration?.description]);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [wrapperRef, configuratorCalculations]);

  if (!configuratorCalculations) return null;
  return (
    <div className={styles.details} ref={wrapperRef}>
      {!withConfigurator && (
      <div className={styles.topPart}>
        <ProjectsNavigationBlocks className={styles.navigation} />
        {/* <SimpleHeader
          subtitle={t(DICTIONARY.confHistory)}
          className={styles.simpleHeader}
        /> */}
      </div>
      )}
      <div className={classNames('container')}>
        <div className={styles.detailsInner}>
          <div className={styles.header}>
            <p className={styles.headerTitle}>
              {configuratorSingleConfiguration?.name || configuratorCalculations?.configuration_formula}
            </p>
            <div onClick={onQrClick} className={classNames(styles.qrImage, 'pressable')}>
              <img src={QrImage} alt="qr" className={styles.qrImage} />
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            {/* <div className={styles.qrButtonMobile}>
              <IconButton
                icon={QrIcon}
                hideTextOnMobile
              />
            </div> */}
            {!configuratorSingleConfiguration?.project_id && (
              <IconButton onClick={() => onAddToProjectClick(configuratorSingleConfiguration, afterConfigurationEdited)} text={t(DICTIONARY.addToProject)} icon={AddIcon} hideTextOnMobile />
            )}
            {!withConfigurator && (
              <IconButton onClick={onEditClick} text={t(DICTIONARY.editConfiguration)} icon={PencilIcon} hideTextOnMobile />
            )}
            <IconButton text={t(DICTIONARY.saveToPdf)} icon={DownloadIcon} hideTextOnMobile />
            <IconButton text={t(DICTIONARY.saveToDocx)} icon={DocumentIcon} hideTextOnMobile />
            <IconButton text={t(DICTIONARY.sendByEmail)} icon={EmailIcon} hideTextOnMobile />
            <IconButton onClick={() => onDeleteSingleConfigurationClick(configuratorSingleConfiguration, afterConfigurationDeleted)} text={t(DICTIONARY.delete)} icon={CrossDarkIcon} hideTextOnMobile />
          </div>

          <div className={styles.note}>
            <textarea
              ref={noteRef}
              className={styles.noteInput}
              value={noteText}
              onChange={setNoteText}
              placeholder={t(DICTIONARY.notePlaceholder)}
            />
            <div className={styles.noteTitle}>
              {t(DICTIONARY.note)}
            </div>
            {noteText?.length > 0 && (
              <button onClick={() => setNoteText('', true)} className={styles.clearNote} type="button">
                <img src={ReloadIcon} alt="r" className={styles.clearIcon} />
                {t(DICTIONARY.clear)}
                {' '}
                <span className={styles.noteText}>
                  &nbsp;
                  {t(DICTIONARY.noteText)}
                </span>
              </button>
            )}
          </div>

          <div className={styles.characteristics}>
            <p className={styles.characteristicsTitle}>
              {t(DICTIONARY.mainCharacteristics)}
            </p>
            <div className={styles.characteristicsContent}>
              {shortData.map((item, index) => (
                <CircleData key={index} name={item.name} value={item.value} />
              ))}
            </div>
          </div>

          <div className={styles.modeling}>
            <p className={styles.modelingTitle}>
              {t(DICTIONARY.technicalCharacteristics)}
            </p>
            <div className={styles.modelingItems}>
              {detailedCharacteristics.map((item, index) => (
                <div key={index} className={styles.modelingItem}>
                  <p className={styles.modelingItemTitle}>{item.blockTitle}</p>
                  {item.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className={styles.modelingItemDetails}>
                      <div className={styles.modelingItemDetailsValue}>
                        {CalculationDetailsServices.renderCharacteristicName(detail.name)}
                      </div>
                      <p className={styles.modelingItemDetailsNum}>{detail.value}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

          </div>

          <div className={styles.footer}>
            <p className={styles.footerTitle}>
              {t(DICTIONARY.footerDescription)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigurationDetails;

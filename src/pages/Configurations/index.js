import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './css/index.module.scss';
import { DICTIONARY } from '../../translations/dictionary';
import useTranslations from '../../hooks/useTranslations';
import Checkbox from '../../ui-kit/Checkbox';
import AddGrayIcon from '../../assets/icons/addGray.svg';
import DeleteGrayIcon from '../../assets/icons/deleteGray.svg';
import DownloadGrayIcon from '../../assets/icons/downloadGray.svg';
import EmailGrayIcon from '../../assets/icons/emailGray.svg';
import Pagination from '../../ui-kit/Pagination';
import Button from '../../ui-kit/Button';
import useConfigurations from '../../hooks/useConfigurations';
import { isInitAtom, scrollableContentRefAtom } from '../../atoms/globalAtoms';
import { closeModalAtom, openConfirmModalAtom, openInfoModalAtom } from '../../atoms/modalAtoms';
import ProjectsNavigationBlocks from '../MyProjects/components/ProjectsNavigationBlocks';
import ProjectsSelectingButtons from '../MyProjects/components/ProjectsSelectingButtons';
import CircleData from '../../ui-kit/CircleData';
import DocumentGrayIcon from '../../assets/icons/documentGray.svg';
import ConfiguratorServices from '../../services/ConfiguratorServices';
import CalculationDetailsServices from '../../services/CalculationDetailsServices';
import EmptyHeight from '../../components/EmptyHeight';
import Loading from '../../ui-kit/Loading';
import SimpleHeader from '../../ui-kit/SimpleHeader';

function Configurations({ withProject }) {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [isInit] = useAtom(isInitAtom);
  const [scrollableContentRef] = useAtom(scrollableContentRefAtom);
  const [, openConfirmModal] = useAtom(openConfirmModalAtom);
  const [, closeModal] = useAtom(closeModalAtom);

  const [selectedItems, setSelectedItems] = useState([]);

  const [isInitLocal, setIsInitLocal] = useState(false);

  const {
    configurations,
    configurationsProject,
    gettingConfigurationsLoading,
    configurationsPagesInfo,
    getConfigurations,
    getSingleConfiguration,
    getConfigurationsOfProject,
    onAddToProjectClick,
    onDeleteConfigurationsClick,
  } = useConfigurations({ setSelectedItems });

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const projectId = withProject ? searchParams.get('project_id') : null;
  const isMobile = window.innerWidth <= 900;

  const pagesCount = useMemo(() => {
    if (!configurationsPagesInfo) return 1;
    return Math.ceil(configurationsPagesInfo.total_records / configurationsPagesInfo.items_on_page);
  }, [configurationsPagesInfo]);

  const configurationsToDisplay = useMemo(() => {
    if (isMobile) return configurations;
    return configurations.slice(0, configurationsPagesInfo?.items_on_page || 0);
  }, [configurations, isMobile, configurationsPagesInfo?.items_on_page]);

  const onShowMoreClick = () => {
    onPageChange(+page + 1);
  };

  const onSelectItem = (item) => {
    if (selectedItems.includes(item.id)) {
      setSelectedItems((prev) => prev.filter((i) => i !== item.id));
    } else {
      setSelectedItems((prev) => [...prev, item.id]);
    }
  };

  const onPageChange = (val) => {
    const newParams = Object.fromEntries([...searchParams.entries()]);
    newParams.page = val;

    if (selectedItems.length && !isMobile) {
      openConfirmModal({
        text: t(DICTIONARY.changePageWarning),
        onButtonClick: () => {
          setSearchParams(newParams, { replace: true });
          setSelectedItems([]);
          closeModal();
        },
      });
    } else {
      setSearchParams(newParams, { replace: true });
    }
  };

  const onConfigurationClick = (item) => {
    navigate(`/configurator?configuration_id=${item.id}&only_details=true`);
  };

  useEffect(() => {
    if (!isInit) return;
    if (page) {
      if (withProject) {
        getConfigurationsOfProject({ page, projectId, shouldAddToExisting: isMobile }).then();
      } else getConfigurations({ page, shouldAddToExisting: isMobile }).then();
      if (!isMobile) scrollableContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onPageChange(1);
    }

    if (!isInitLocal) setIsInitLocal(true);
  }, [page, withProject, projectId, isInit]);

  return (
    <div className={styles.configurations}>
      <ProjectsNavigationBlocks />
      {withProject && (
        <div className={styles.projectInfo}>
          <SimpleHeader
            subtitle={`${t(DICTIONARY.personalAccount)} / ${t(DICTIONARY.myProjects)}`}
            title={configurationsProject?.name}
            className={styles.projectInfoHeader}
          />
        </div>
      )}
      <div className={styles.buttons}>
        <ProjectsSelectingButtons
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>

      <div className={styles.list}>
        {(gettingConfigurationsLoading || !isInitLocal)
          ? <div className={styles.loading}><Loading height={30} width={30} /></div>
          : !configurationsToDisplay?.length
            ? <p>{t(DICTIONARY.empty)}</p>
            : configurationsToDisplay.map((item) => (
              <div className={styles.listItem} key={item.id}>
                <div className={styles.checkbox}>
                  <Checkbox
                    onClick={() => onSelectItem(item)}
                    value={selectedItems.includes(item.id)}
                  />
                </div>
                <div
                  className={classNames(styles.header, 'pressable')}
                  onClick={() => onConfigurationClick(item)}
                >
                  <p className={styles.subtitle}>{item.city}</p>
                  <p className={styles.title}>{item.name}</p>
                </div>
                <div className={styles.circlesRow}>
                  {item.results.map((i) => (
                    <CircleData
                      key={i.value}
                      name={CalculationDetailsServices.formatNumber(i.value)}
                      value={CalculationDetailsServices.renderCharacteristicName(i.name)}
                    />
                  ))}
                </div>
                <div className={styles.icons}>
                  <img src={DownloadGrayIcon} alt="Download" />
                  <img src={DocumentGrayIcon} alt="Document" />
                  <img src={EmailGrayIcon} alt="Email" />
                  {!withProject && (
                    <div
                      className={classNames('pressable')}
                      onClick={() => onAddToProjectClick(item)}
                    >
                      <img src={AddGrayIcon} alt="Add" />
                    </div>
                  )}
                  <div
                    className={classNames('pressable')}
                    onClick={() => onDeleteConfigurationsClick([item.id])}
                  >
                    <img src={DeleteGrayIcon} alt="Delete" />
                  </div>
                </div>
              </div>
            ))}
      </div>

      {isMobile
        ? configurationsPagesInfo?.last_page > configurationsPagesInfo?.current_page ? (
          <div className={styles.showMoreButton}>
            <Button
              onClick={onShowMoreClick}
              text={t(DICTIONARY.showMore)}
              width="290px"
              isDisabled={gettingConfigurationsLoading}
            />
          </div>
        ) : <EmptyHeight height={20} /> : (
          <Pagination page={+page} setPage={onPageChange} pagesCount={pagesCount} />
        )}
    </div>
  );
}

export default Configurations;

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
import BigAddIcon from '../../assets/icons/bigAdd.svg';
import DocumentIcon from '../../assets/icons/documentGray.svg';
import Pagination from '../../ui-kit/Pagination';
import Button from '../../ui-kit/Button';
import ProjectsNavigationBlocks from './components/ProjectsNavigationBlocks';
import ProjectsSelectingButtons from './components/ProjectsSelectingButtons';
import useProjects from '../../hooks/useProjects';
import { isInitAtom, scrollableContentRefAtom } from '../../atoms/globalAtoms';
import { closeModalAtom, openConfirmModalAtom, openInfoModalAtom } from '../../atoms/modalAtoms';

function MyProjects() {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [isInit] = useAtom(isInitAtom);
  const [scrollableContentRef] = useAtom(scrollableContentRefAtom);
  const [, openConfirmModal] = useAtom(openConfirmModalAtom);
  const [, closeModal] = useAtom(closeModalAtom);

  const [selectedItems, setSelectedItems] = useState([]);

  const {
    projects,
    gettingProjectsLoading,
    projectsPagesInfo,
    getProjects,
    onNewProjectClick,
    onDeleteProjectsClick,
  } = useProjects({ setSelectedItems });

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const isMobile = window.innerWidth <= 900;

  const pagesCount = useMemo(() => {
    if (!projectsPagesInfo) return 1;
    return Math.ceil(projectsPagesInfo.total_records / projectsPagesInfo.items_on_page);
  }, [projectsPagesInfo]);

  const projectsToDisplay = useMemo(() => {
    if (isMobile) return projects;
    return projects.slice(0, projectsPagesInfo?.items_on_page || 0);
  }, [projects, isMobile, projectsPagesInfo?.items_on_page]);

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
    if (selectedItems.length && !isMobile) {
      openConfirmModal({
        text: t(DICTIONARY.changePageWarning),
        onButtonClick: () => {
          setSearchParams({ page: val }, { replace: true });
          setSelectedItems([]);
          closeModal();
        },
      });
    } else {
      setSearchParams({ page: val }, { replace: true });
    }
  };

  const onProjectClick = (val) => {
    navigate(`/configurations?project_id=${val.id}&page=1`);
  };

  useEffect(() => {
    if (!isInit) return;
    if (page) {
      getProjects({ page, shouldAddToExisting: isMobile }).then();
      if (!isMobile) scrollableContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onPageChange(1);
    }
  }, [page, isInit]);

  return (
    <div className={styles.myProject}>
      <ProjectsNavigationBlocks />
      <div className={styles.buttons}>
        <ProjectsSelectingButtons
          isForProjects
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>

      <div className={styles.projectGrid}>
        <div className={styles.createProjectButton}>
          <img src={BigAddIcon} alt="Add project" className={styles.createProjectButtonAdd} />
          <Button
            text={t(DICTIONARY.createNewProject)}
            icon={AddGrayIcon}
            width="206px"
            onClick={onNewProjectClick}
          />
        </div>

        {projectsToDisplay.map((item, index) => (
          <div key={item.id} className={styles.projectCard}>
            <div className={styles.cardHeader}>
              <Checkbox onClick={() => onSelectItem(item)} value={selectedItems.includes(item.id)} />
            </div>
            <div className={classNames(styles.cardContent, 'pressable')} onClick={() => onProjectClick(item)}>
              <p className={styles.subtitle}>
                {item.configurations_count}
                {' '}
                {t(DICTIONARY.configurations, item.configurations_count)}
              </p>
              <h3 className={styles.title}>{item.name}</h3>
            </div>
            <div className={styles.cardActions}>
              <img src={DownloadGrayIcon} alt="Download" />
              <img src={DocumentIcon} alt="Document" />
              <img src={EmailGrayIcon} alt="Email" />
              <div className={classNames('pressable')} onClick={() => onDeleteProjectsClick([item.id])}>
                <img src={DeleteGrayIcon} alt="Delete" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isMobile
        ? projectsPagesInfo?.last_page > projectsPagesInfo?.current_page && (
          <div className={styles.showMoreButton}>
            <Button
              onClick={onShowMoreClick}
              text={t(DICTIONARY.showMore)}
              width="290px"
              isDisabled={gettingProjectsLoading}
            />
          </div>
        ) : (
          <Pagination page={+page} setPage={onPageChange} pagesCount={pagesCount} />
        )}
    </div>
  );
}

export default MyProjects;

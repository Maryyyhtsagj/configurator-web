import React, { useEffect, useMemo } from 'react';
import { useAtom } from 'jotai/index';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './css/index.module.scss';
import { pathnameAtom } from '../../../../atoms/globalAtoms';
import useTranslations from '../../../../hooks/useTranslations';
import { projectsCountAtom, projectsPagesInfoAtom } from '../../../../atoms/projectsAtoms';
import { DICTIONARY } from '../../../../translations/dictionary';

function ProjectsNavigationBlocks({ className }) {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [pathname] = useAtom(pathnameAtom);
  const [projectsPagesInfo] = useAtom(projectsPagesInfoAtom);
  const selectedTab = useMemo(() => (pathname === '/my-projects' ? 'projects' : pathname === '/configurations-history' ? 'history' : ''), [pathname]);

  const onProjectsClick = () => {
    navigate('/my-projects');
  };

  const onHistoryClick = () => {
    navigate('/configurations-history');
  };

  useEffect(() => {
  }, []);

  return (
    <div className={classNames(styles.navigationBlock, className)}>
      <div
        className={
          classNames(
            styles.navigationItem,
            { [styles.navigationItemSelected]: selectedTab === 'projects' },
            'pressable',
          )
      }
        style={{ width: '200px' }}
        onClick={onProjectsClick}
      >
        <p className={styles.navigationItemText}>{`${t(DICTIONARY.myProjects)}${projectsPagesInfo !== null ? ` (${projectsPagesInfo.total_records})` : ''}`}</p>
      </div>
      <div
        className={
          classNames(
            styles.navigationItem,
            { [styles.navigationItemSelected]: selectedTab === 'history' },
            'pressable',
          )
      }
        onClick={onHistoryClick}
      >
        <p className={styles.navigationItemText}>{t(DICTIONARY.configurationsHistory)}</p>
      </div>
    </div>
  );
}

export default ProjectsNavigationBlocks;

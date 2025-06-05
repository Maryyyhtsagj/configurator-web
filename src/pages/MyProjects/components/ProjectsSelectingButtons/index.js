import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import Checkbox from '../../../../ui-kit/Checkbox';
import IconButton from '../../../../ui-kit/IconButton';
import Api from '../../../../api';
import sendRequest from '../../../../helpers/sendRequest';
import { openInfoModalAtom } from '../../../../atoms/modalAtoms';

import ArchiveIcon from '../../../../assets/icons/download.svg';
import DockIcon from '../../../../assets/icons/document.svg';
import EmailIcon from '../../../../assets/icons/email.svg';
import CrossIcon from '../../../../assets/icons/crossDark.svg';
import { isAdminAtom } from '../../../../atoms/accountAtoms';
import useProjects from '../../../../hooks/useProjects';
import useConfigurations from '../../../../hooks/useConfigurations';

function ProjectsSelectingButtons({ selectedItems, setSelectedItems, isForProjects }) {
  const { t } = useTranslations();
  const navigate = useNavigate();

  const {
    onDeleteProjectsClick,
  } = useProjects({ setSelectedItems });

  const {
    onDeleteConfigurationsClick,
  } = useConfigurations({ setSelectedItems });

  const [archiveLoading, setArchiveLoading] = useState(false);
  const [dockLoading, setDockLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const [, openInfoModal] = useAtom(openInfoModalAtom);
  const [isAdmin] = useAtom(isAdminAtom);

  const onArchiveClick = async () => {
    return;
    const data = await sendRequest({
      request: isForProjects ? Api.generateProjectsArchive : Api.generateConfigurationsArchive,
      payload: selectedItems,
      setLoading: setArchiveLoading,
    });

    if (data?.status === 'ok') {
      openInfoModal({ text: 'lala' });
    }
  };

  const onDockClick = async () => {
    return;
    const data = await sendRequest({
      request: isForProjects ? Api.generateProjectsDock : Api.generateConfigurationsDock,
      payload: selectedItems,
      setLoading: setDockLoading,
    });

    if (data?.status === 'ok') {
      openInfoModal({ text: 'lala' });
    }
  };

  const onEmailClick = async () => {
    return;
    const data = await sendRequest({
      request: isForProjects ? Api.generateProjectsEmail : Api.generateConfigurationsEmail,
      payload: selectedItems,
      setLoading: setEmailLoading,
    });

    if (data?.status === 'ok') {
      openInfoModal({ text: 'lala' });
    }
  };

  const onDeleteClick = async () => {
    if (isForProjects) {
      onDeleteProjectsClick(selectedItems);
    } else {
      onDeleteConfigurationsClick(selectedItems);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div className={styles.buttonWrapper}>
      <div className={styles.checkbox}>
        <Checkbox
          onClick={() => setSelectedItems([])}
          text={`${t(DICTIONARY.selected)} ${selectedItems.length}`}
          value={selectedItems.length}
          disabled={!selectedItems.length}
        />
      </div>
      <IconButton
        onClick={onArchiveClick}
        isDisabled={archiveLoading || !selectedItems.length}
        text={t(DICTIONARY.saveToArchive)}
        icon={ArchiveIcon}
        hideTextOnMobile
      />
      {isAdmin && (
        <IconButton
          onClick={onDockClick}
          isDisabled={dockLoading || !selectedItems.length}
          text={t(DICTIONARY.saveToDocx)}
          icon={DockIcon}
          hideTextOnMobile
        />
      )}
      <IconButton
        onClick={onEmailClick}
        isDisabled={emailLoading || !selectedItems.length}
        text={t(DICTIONARY.sendByEmail)}
        icon={EmailIcon}
        hideTextOnMobile
      />
      <IconButton
        onClick={onDeleteClick}
        isDisabled={false || !selectedItems.length}
        text={t(DICTIONARY.delete)}
        icon={CrossIcon}
        hideTextOnMobile
      />
    </div>
  );
}

export default ProjectsSelectingButtons;

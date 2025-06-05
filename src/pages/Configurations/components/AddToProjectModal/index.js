import React, { useEffect, useMemo } from 'react';
import styles from './css/index.module.scss';
import Button from '../../../../ui-kit/Button';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import useInputState from '../../../../hooks/useInputState';
import Input from '../../../../ui-kit/Input';
import EmptyHeight from '../../../../components/EmptyHeight';
import useProjects from '../../../../hooks/useProjects';
import Select from '../../../../ui-kit/Select';

function AddToProjectModal({ onSave, configuration }) {
  const { t } = useTranslations();
  const { projects, getProjects, onNewProjectClick } = useProjects();
  const [name, setName, nameError, setNameError] = useInputState(configuration?.name);
  const [project, setProject, projectError, setProjectError] = useInputState('');

  const projectsToDraw = useMemo(() => {
    if (!projects?.length) return [];
    return [{ id: 'new', name: t(DICTIONARY.createNewProject) }, ...projects];
  }, [projects]);

  const onSaveClick = () => {
    if (!project) {
      return setProjectError(t(DICTIONARY.chooseProject));
    }
    if (!name) {
      // return setNameError('NO_ERROR_TEXT');
    }

    // onSave({ project, name });
    onSave({ project });
  };

  const handleProject = (val) => {
    if (val.id === 'new') {
      onNewProjectClick({ cb: (newProject) => setProject(newProject, true) });
    } else {
      setProject(val, true);
    }
  };

  useEffect(() => {
    if (!projects?.length) {
      getProjects({ page: 1, perPage: 20 }).then();
    }
  }, []);

  return (
    <div className={styles.addToProjectModal}>
      <p className={styles.title}>{t(DICTIONARY.addToProject)}</p>
      {/* <Input
        text={t(DICTIONARY.configurationName)}
        value={name}
        onChange={setName}
        width="100%"
        error={nameError}
      />
      <EmptyHeight height={10} /> */}
      <Select
        text={t(DICTIONARY.chooseProject)}
        value={project}
        onChange={handleProject}
        width="100%"
        error={projectError}
        items={projectsToDraw}
        labelField="name"
        valueField="id"
      />
      <EmptyHeight height={30} />

      <div className={styles.buttons}>
        <Button width="100%" text={t(DICTIONARY.add)} onClick={onSaveClick} />
      </div>
    </div>
  );
}

export default AddToProjectModal;

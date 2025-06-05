import React from 'react';
import styles from './css/index.module.scss';
import Button from '../../../../ui-kit/Button';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import useInputState from '../../../../hooks/useInputState';
import Input from '../../../../ui-kit/Input';
import EmptyHeight from '../../../../components/EmptyHeight';

function NewProjectModal({ onSave }) {
  const { t } = useTranslations();
  const [name, setName, nameError, setNameError] = useInputState('');

  const onSaveClick = () => {
    if (name?.length <= 1) {
      return setNameError('NO_ERROR_TEXT');
    }

    onSave(name);
  };

  return (
    <div className={styles.newProjectModal}>
      <p className={styles.title}>{t(DICTIONARY.newProject)}</p>
      <Input
        text={t(DICTIONARY.newProjectName)}
        value={name}
        onChange={setName}
        width="100%"
        error={nameError}
      />
      <EmptyHeight height={30} />

      <div className={styles.buttons}>
        <Button width="100%" text={t(DICTIONARY.add)} onClick={onSaveClick} />
      </div>
    </div>
  );
}

export default NewProjectModal;

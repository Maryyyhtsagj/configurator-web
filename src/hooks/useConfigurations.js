import { useAtom } from 'jotai/index';
import {
  deletingConfigurationLoadingAtom,
  gettingConfigurationsLoadingAtom,
  configurationsAtom,
  configurationsPagesInfoAtom,
  editingConfigurationLoadingAtom,
  configurationsProjectAtom,
  configurationsItemsOnPageAtom, gettingSingleConfigurationLoadingAtom,
} from '../atoms/configurationsAtoms';
import sendRequest from '../helpers/sendRequest';
import Api from '../api';
import {
  closeModalAtom, modalStateAtom, openConfirmModalAtom,
} from '../atoms/modalAtoms';
import useTranslations from './useTranslations';
import { DICTIONARY } from '../translations/dictionary';
import AddToProjectModal from '../pages/Configurations/components/AddToProjectModal';
import { configuratorSingleConfigurationAtom } from '../atoms/configuratorAtoms';

const useConfigurations = ({ setSelectedItems } = {}) => {
  const { t } = useTranslations();

  const [configurations, setConfigurations] = useAtom(configurationsAtom);
  const [gettingConfigurationsLoading, setGettingConfigurationsLoading] = useAtom(gettingConfigurationsLoadingAtom);
  const [editingConfigurationLoading, setEditingConfigurationLoading] = useAtom(editingConfigurationLoadingAtom);
  const [deletingConfigurationLoading, setDeletingConfigurationLoading] = useAtom(deletingConfigurationLoadingAtom);
  const [configurationsPagesInfo, setConfigurationsPagesInfo] = useAtom(configurationsPagesInfoAtom);
  const [configurationsProject, setConfigurationsProject] = useAtom(configurationsProjectAtom);
  const [configurationsItemsOnPage] = useAtom(configurationsItemsOnPageAtom);
  const [configuratorSingleConfiguration, setConfiguratorSingleConfiguration] = useAtom(configuratorSingleConfigurationAtom);

  const [, setModalState] = useAtom(modalStateAtom);
  const [, openConfirmModal] = useAtom(openConfirmModalAtom);
  const [, closeModal] = useAtom(closeModalAtom);

  const getConfigurations = async ({ page, shouldAddToExisting }) => {
    const data = await sendRequest({
      request: Api.getConfigurations,
      payload: { page, items_on_page: configurationsItemsOnPage },
      setLoading: setGettingConfigurationsLoading,
    });

    if (data?.status !== 'ok') return;

    if (page !== 1 && page !== '1' && shouldAddToExisting) setConfigurations((prev) => [...prev, ...data.data.configurations]);
    else setConfigurations(data.data.configurations);

    setConfigurationsPagesInfo(data.data.pages);
  };

  const getConfigurationsOfProject = async ({
    page, projectId, shouldAddToExisting,
  }) => {
    const data = await sendRequest({
      request: Api.getConfigurationsOfProject,
      payload: { id: projectId, params: { page, items_on_page: configurationsItemsOnPage } },
      setLoading: shouldAddToExisting ? undefined : setGettingConfigurationsLoading,
    });

    if (data?.status !== 'ok') return;

    const { project } = data.data;
    if (page !== 1 && page !== '1' && shouldAddToExisting) setConfigurations((prev) => [...prev, ...project.configurations.list]);
    else setConfigurations(project.configurations.list);

    setConfigurationsPagesInfo(project.configurations.pages);
    setConfigurationsProject({ ...project, configurations: undefined });
  };

  const editConfiguration = (configuration, cb) => async ({ project, name, description }) => {
    if (editingConfigurationLoading) return;

    const body = { id: configuration.id };
    if (project?.id) body.project_id = project.id;
    if (name) body.name = name;
    if (description) body.description = description;

    const data = await sendRequest({
      request: Api.editConfiguration,
      payload: body,
      setLoading: setEditingConfigurationLoading,
    });

    if (data?.status === 'ok') {
      const { configuration: newConfiguration } = data.data;
      cb?.(newConfiguration);
      setConfigurations((prev) => prev.map((i) => (i.id === newConfiguration.id ? ({ ...i, ...newConfiguration }) : i)));
      closeModal();
    }
  };

  const deleteConfigurations = async (listOfIds) => {
    if (deletingConfigurationLoading) return;

    const data = await sendRequest({
      request: Api.deleteConfigurations,
      payload: { ids: listOfIds },
      setLoading: setDeletingConfigurationLoading,
    });

    if (data?.status === 'ok') {
      setSelectedItems([]);
      setConfigurations((prev) => prev.filter((i) => !listOfIds.includes(i.id)));
      setConfigurationsPagesInfo((prev) => ({ ...prev, total_records: prev.total_records - listOfIds.length }));
      closeModal();
    }
  };

  const deleteSingleConfiguration = async (configuration, cb) => {
    if (deletingConfigurationLoading) return;

    const data = await sendRequest({
      request: Api.deleteConfigurations,
      payload: { ids: [configuration.id] },
      setLoading: setDeletingConfigurationLoading,
    });

    if (data?.status === 'ok') {
      cb?.();
      closeModal();
    }
  };

  const handleConfigurationDescription = async (val) => {
    if (!configuratorSingleConfiguration?.id) return;
    await editConfiguration(configuratorSingleConfiguration, (newConfiguration) => {
      const newObj = { name: newConfiguration.name, project_id: newConfiguration.project_id, description: newConfiguration.description };
      setConfiguratorSingleConfiguration((prev) => ({ ...prev, ...newObj }));
    })({ description: val });
  };

  const onAddToProjectClick = (configuration, cb) => {
    setModalState({
      isOpen: true,
      children: <AddToProjectModal configuration={configuration} onSave={editConfiguration(configuration, cb)} />,
    });
  };

  const onDeleteConfigurationsClick = (listOfIds) => {
    openConfirmModal({
      text: listOfIds.length === 1 ? t(DICTIONARY.sureToDeleteConfiguration) : t(DICTIONARY.sureToDelete, listOfIds.length),
      onButtonClick: () => deleteConfigurations(listOfIds),
    });
  };

  const onDeleteSingleConfigurationClick = (configuration, cb) => {
    openConfirmModal({
      text: t(DICTIONARY.sureToDeleteConfiguration),
      onButtonClick: () => deleteSingleConfiguration(configuration, cb),
    });
  };

  return {
    configurations,
    gettingConfigurationsLoading,
    editingConfigurationLoading,
    configurationsPagesInfo,
    configurationsProject,
    getConfigurations,
    getConfigurationsOfProject,
    onAddToProjectClick,
    onDeleteConfigurationsClick,
    onDeleteSingleConfigurationClick,
    handleConfigurationDescription,
  };
};

export default useConfigurations;

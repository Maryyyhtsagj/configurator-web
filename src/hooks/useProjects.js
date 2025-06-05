import { useAtom } from 'jotai/index';
import {
  creatingProjectLoadingAtom, deletingProjectLoadingAtom,
  gettingProjectsLoadingAtom,
  projectsAtom, projectsItemsOnPageAtom,
  projectsPagesInfoAtom,
} from '../atoms/projectsAtoms';
import sendRequest from '../helpers/sendRequest';
import Api from '../api';
import {
  closeModal2Atom,
  closeModalAtom, modal2StateAtom, modalStateAtom, openConfirmModalAtom, openInfoModalAtom,
} from '../atoms/modalAtoms';
import useTranslations from './useTranslations';
import NewProjectModal from '../pages/MyProjects/components/NewProjectModal';
import { DICTIONARY } from '../translations/dictionary';

const useProjects = ({ setSelectedItems } = {}) => {
  const { t } = useTranslations();

  const [projects, setProjects] = useAtom(projectsAtom);
  const [gettingProjectsLoading, setGettingProjectsLoading] = useAtom(gettingProjectsLoadingAtom);
  const [creatingProjectLoading, setCreatingProjectLoading] = useAtom(creatingProjectLoadingAtom);
  const [deletingProjectLoading, setDeletingProjectLoading] = useAtom(deletingProjectLoadingAtom);
  const [projectsPagesInfo, setProjectsPagesInfo] = useAtom(projectsPagesInfoAtom);
  const [projectsItemsOnPage] = useAtom(projectsItemsOnPageAtom);

  const [, setModalState] = useAtom(modalStateAtom);
  const [, setModal2State] = useAtom(modal2StateAtom);
  const [, openConfirmModal] = useAtom(openConfirmModalAtom);
  const [, closeModal] = useAtom(closeModalAtom);
  const [, closeModal2] = useAtom(closeModal2Atom);

  const getProjects = async ({ page, shouldAddToExisting }) => {
    const data = await sendRequest({
      request: Api.getProjects,
      payload: { page, items_on_page: projectsItemsOnPage },
      setLoading: setGettingProjectsLoading,
    });

    if (data?.status !== 'ok') return;

    if (page !== 1 && page !== '1' && shouldAddToExisting) setProjects((prev) => [...prev, ...data.data.projects]);
    else setProjects(data.data.projects);

    setProjectsPagesInfo(data.data.pages);
  };

  const createNewProject = (cb) => async (name) => {
    if (creatingProjectLoading) return;

    const data = await sendRequest({
      request: Api.createProject,
      payload: { name, configurations: [] },
      setLoading: setCreatingProjectLoading,
    });

    if (data?.data?.project) {
      setProjects((prev) => [data.data.project, ...prev]);
      setProjectsPagesInfo((prev) => ({ ...prev, total_records: prev.total_records + 1 }));
      cb?.(data?.data?.project);
      closeModal2();
    }
  };

  const deleteProjects = async (listOfIds) => {
    if (deletingProjectLoading) return;

    const data = await sendRequest({
      request: Api.deleteProjects,
      payload: { ids: listOfIds },
      setLoading: setDeletingProjectLoading,
    });

    if (data?.status === 'ok') {
      setSelectedItems([]);
      setProjects((prev) => prev.filter((i) => !listOfIds.includes(i.id)));
      setProjectsPagesInfo((prev) => ({ ...prev, total_records: prev.total_records - listOfIds.length }));
      closeModal();
    }
  };

  const onNewProjectClick = ({ cb } = {}) => {
    setModal2State({
      isOpen: true,
      children: <NewProjectModal onSave={createNewProject(cb)} />,
    });
  };

  const onDeleteProjectsClick = (listOfIds) => {
    openConfirmModal({
      text: listOfIds.length === 1 ? t(DICTIONARY.sureToDeleteProject) : t(DICTIONARY.sureToDelete, listOfIds.length),
      onButtonClick: () => deleteProjects(listOfIds),
    });
  };

  return {
    projects,
    gettingProjectsLoading,
    projectsPagesInfo,
    getProjects,
    onNewProjectClick,
    onDeleteProjectsClick,
  };
};

export default useProjects;

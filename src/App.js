import { useEffect } from 'react';
import './App.scss';
import { useAtom, Provider } from 'jotai/index';
import Navigation from './navigation';
import MyModal from './components/MyModal';
import useTranslations from './hooks/useTranslations';
import LocalStorageServices from './services/LocalStorageServices';
import useWindowResize from './hooks/useWindowResize';
import { isAdminAtom, tokenAtom } from './atoms/accountAtoms';
import store from './atoms';
import sendRequest from './helpers/sendRequest';
import Api from './api';
import {
  categoriesAtom, materialsAtom, materialsWithPathAtom, materialTypesAtom,
} from './atoms/categoriesAtoms';
import { initLoadingAtom, isInitAtom, languagesListAtom } from './atoms/globalAtoms';
import {
  configuratorAnglesAtom,
  configuratorCitiesAtom,
  configuratorGlassTypesAtom,
  configuratorMaxAnglesCountAtom,
  configuratorRegionsAtom,
  configuratorSelectedCityAtom,
  configuratorTemplatesAtom,
} from './atoms/configuratorAtoms';
import ConfiguratorServices from './services/ConfiguratorServices';
import {
  closeModal2Atom,
  closeModalAtom, modal2StateAtom, modalStateAtom, openLoadingModalAtom,
} from './atoms/modalAtoms';
import { configurationsItemsOnPageAtom } from './atoms/configurationsAtoms';
import { projectsItemsOnPageAtom } from './atoms/projectsAtoms';

function App() {
  useWindowResize();
  const { lang, setLang } = useTranslations();
  const [token, setToken] = useAtom(tokenAtom);
  const [, openLoadingModal] = useAtom(openLoadingModalAtom);
  const [, closeModal] = useAtom(closeModalAtom);
  const [, setIsAdmin] = useAtom(isAdminAtom);
  const [, setLanguagesList] = useAtom(languagesListAtom);
  const [, setCategories] = useAtom(categoriesAtom);
  const [, setMaterialsWithPath] = useAtom(materialsWithPathAtom);
  const [, setMaterialTypes] = useAtom(materialTypesAtom);
  const [, setMaterials] = useAtom(materialsAtom);
  const [, setConfiguratorCities] = useAtom(configuratorCitiesAtom);
  const [, setConfiguratorSelectedCity] = useAtom(configuratorSelectedCityAtom);
  const [, setConfiguratorRegions] = useAtom(configuratorRegionsAtom);
  const [, setConfiguratorTemplates] = useAtom(configuratorTemplatesAtom);
  const [, setConfiguratorGlassTypes] = useAtom(configuratorGlassTypesAtom);
  const [, setConfiguratorAngles] = useAtom(configuratorAnglesAtom);
  const [, setConfiguratorMaxAnglesCount] = useAtom(configuratorMaxAnglesCountAtom);
  const [, setProjectsItemsOnPage] = useAtom(projectsItemsOnPageAtom);
  const [, setConfigurationsItemsOnPage] = useAtom(configurationsItemsOnPageAtom);

  const [, setInitLoading] = useAtom(initLoadingAtom);
  const [, setIsInit] = useAtom(isInitAtom);

  useEffect(() => {
    setLang(LocalStorageServices.getLanguage());
    setToken(LocalStorageServices.getToken());
  }, []);

  useEffect(() => {
    if (token) {
      openLoadingModal();
      init({ lang }).then(() => {
        closeModal();
      });
    }
  }, [token, lang]);

  const init = async ({ lang: langLocal }) => {
    const data = await sendRequest({
      request: Api.init,
      payload: { lang: langLocal },
      warnErrorText: 'while init',
      showErrorInModal: false,
      setLoading: setInitLoading,
    });

    if (data?.data) {
      setIsAdmin(data.data.is_admin);
      setLanguagesList(data.data.langs);
      const injectedCategories = ConfiguratorServices.getCategoriesFullList(data.data.categories, data.data.materials);
      setCategories(injectedCategories);
      setMaterialsWithPath(ConfiguratorServices.getMaterialsWithPathList(injectedCategories));
      setMaterials(data.data.materials);
      setMaterialTypes(data.data.material_types);

      setConfiguratorRegions(data.data.areas);
      setConfiguratorCities(data.data.cities);
      setConfiguratorSelectedCity(data.data.cities.find((i) => i.selected) || data.data.cities[0]);

      setConfiguratorTemplates(data.data.configuration_templates);
      setConfiguratorGlassTypes(data.data.scratch_default_glasses);
      setConfiguratorAngles(data.data.angles.map((i, index) => ({ id: index, name: i.name + i.unit })));
      setConfiguratorMaxAnglesCount(data.data.max_angles_count);

      setProjectsItemsOnPage(data.data.projects_items_on_page);
      setConfigurationsItemsOnPage(data.data.configurations_items_on_page);

      setIsInit(true);
    }
  };

  return (
    <Provider store={store}>
      <Navigation />
      <MyModal modalAtom={modalStateAtom} closeModalAtom={closeModalAtom} />
      <MyModal modalAtom={modal2StateAtom} closeModalAtom={closeModal2Atom} />
    </Provider>
  );
}

export default App;

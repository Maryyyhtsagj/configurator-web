import { useAtom } from 'jotai/index';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  configuratorAnglesAtom, configuratorCalculationsAtom,
  configuratorCurrentLayersWidthsAtom,
  configuratorLayersErrorsAtom,
  configuratorLayersListAtom,
  configuratorLayersListHasScrollAtom,
  configuratorLayersListRefAtom,
  configuratorLayersListScrolledValueAtom,
  configuratorLayersListSizesAtom, configuratorSelectedAnglesAtom,
  configuratorSelectedCityAtom, configuratorSingleConfigurationAtom,
  draggableLayerMaterialAtom,
  draggedLayerIdAtom,
  draggedLayerIndexAtom,
  draggedLayerNewIndexAtom,
  draggedLayerStartXAtom,
  draggingPositionAtom,
  selectedLayerAtom,
} from '../atoms/configuratorAtoms';
import { CONFIGURATOR_ERRORS, MATERIALS_IDS, MATERIALS_INFO } from '../constants/configurator';
import ConfiguratorServices from '../services/ConfiguratorServices';
import { closeModalAtom, modalStateAtom } from '../atoms/modalAtoms';
import LayerOptionsModal from '../pages/Configurator/components/LayerOptionsModal';
import sleep from '../helpers/sleep';
import { materialsAtom, materialTypesAtom } from '../atoms/categoriesAtoms';
import { windowWidthAtom } from '../atoms/globalAtoms';
import sendRequest from '../helpers/sendRequest';
import Api from '../api';
import { gettingSingleConfigurationLoadingAtom } from '../atoms/configurationsAtoms';

const useConfigurator = () => {
  const instantValuesRef = useRef({});
  const navigate = useNavigate();

  const [selectedLayer, setSelectedLayer] = useAtom(selectedLayerAtom);
  const [materialTypes] = useAtom(materialTypesAtom);
  const [materials] = useAtom(materialsAtom);
  const [, setModalState] = useAtom(modalStateAtom);
  const [, closeModal] = useAtom(closeModalAtom);
  const [windowWidth] = useAtom(windowWidthAtom);

  const [configuratorLayersList, setConfiguratorLayersList] = useAtom(configuratorLayersListAtom);
  const [configuratorLayersErrors, setConfiguratorLayersErrors] = useAtom(configuratorLayersErrorsAtom);
  const [configuratorCurrentLayersWidths, setConfiguratorCurrentLayersWidths] = useAtom(configuratorCurrentLayersWidthsAtom);
  const [configuratorLayersListSizes, setConfiguratorLayersListSizes] = useAtom(configuratorLayersListSizesAtom);
  const [configuratorLayersListHasScroll, setConfiguratorLayersListHasScroll] = useAtom(configuratorLayersListHasScrollAtom);
  const [configuratorLayersListScrolledValue, setConfiguratorLayersListScrolledValue] = useAtom(configuratorLayersListScrolledValueAtom);
  const [configuratorAngles] = useAtom(configuratorAnglesAtom);

  const [configuratorLayersListRef, setConfiguratorLayersListRef] = useAtom(configuratorLayersListRefAtom);
  const [, setDraggedLayerId] = useAtom(draggedLayerIdAtom);
  const [, setDraggedLayerIndex] = useAtom(draggedLayerIndexAtom);
  const [, setDraggingPosition] = useAtom(draggingPositionAtom);
  const [, setDraggableLayerMaterial] = useAtom(draggableLayerMaterialAtom);
  const [draggedLayerNewIndex, setDraggedLayerNewIndex] = useAtom(draggedLayerNewIndexAtom);
  const [, setDraggedLayerStartX] = useAtom(draggedLayerStartXAtom);
  const [, setGettingSingleConfigurationLoading] = useAtom(gettingSingleConfigurationLoadingAtom);
  const [, setConfiguratorSelectedCity] = useAtom(configuratorSelectedCityAtom);
  const [, setConfiguratorSelectedAngles] = useAtom(configuratorSelectedAnglesAtom);
  const [, setConfiguratorCalculations] = useAtom(configuratorCalculationsAtom);
  const [, setConfiguratorSingleConfiguration] = useAtom(configuratorSingleConfigurationAtom);

  const refreshConfiguration = () => {
    setConfiguratorLayersList([]);
    setConfiguratorLayersErrors({});
    setConfiguratorLayersListHasScroll(false);
    setConfiguratorLayersListScrolledValue(0);
    setConfiguratorCurrentLayersWidths([]);
    setConfiguratorCalculations(null);
    setConfiguratorSingleConfiguration(null);
    setConfiguratorSelectedAngles([]);
    closeModal();
    navigate('/configurator', { replace: true });
  };

  const onDragStart = ({ item, index, isNewLayer }) => (ev, { actLikeClickable } = {}) => {
    // console.log('onDragStart');
    if (windowWidth <= 900) {
      if (actLikeClickable) setDraggingPosition({ left: 0, top: 0 }); // to trigger useEffect when loading it back to null at onDragStop
      else setDraggingPosition({ left: ev.pageX, top: ev.pageY });
    }

    setDraggableLayerMaterial(isNewLayer ? item : item.material);
    setDraggedLayerId(isNewLayer ? null : item.id);
    setDraggedLayerIndex(isNewLayer ? null : index);
  };

  const onDrag = ({ item, index, isNewLayer }) => (ev, { actLikeClickable } = {}) => {
    // console.log('onDrag');
    setDraggingPosition({ left: ev.pageX, top: ev.pageY });
    if (!configuratorLayersListSizes || !configuratorLayersList?.length) return;

    const { left: containerLeft, width: containerWidth } = configuratorLayersListSizes;
    const dragX = ev.clientX - containerLeft;

    const draggedItemIndex = ConfiguratorServices.getDraggedItemIndex(
      configuratorCurrentLayersWidths,
      dragX,
      containerWidth,
      instantValuesRef.current.configuratorLayersListScrolledValue,
    );
    setDraggedLayerNewIndex(draggedItemIndex);

    const draggedItemStartX = ConfiguratorServices.getNewLayerStartXByIndex(
      configuratorCurrentLayersWidths,
      draggedItemIndex,
      containerWidth,
      instantValuesRef.current.configuratorLayersListScrolledValue,
    );
    setDraggedLayerStartX(draggedItemStartX - instantValuesRef.current.configuratorLayersListScrolledValue);

    if (configuratorLayersListHasScroll) {
      const { shouldMove, coefficient } = ConfiguratorServices.shouldScrollListToMove(
        dragX,
        containerWidth,
      );

      if (shouldMove) {
        configuratorLayersListRef.current.scrollLeft += 5 * coefficient;
        setConfiguratorLayersListScrolledValue(configuratorLayersListRef.current.scrollLeft);
      }
    }
  };

  const onDragStop = ({ item, index, isNewLayer }) => (ev, { didMove, actLikeClickable } = {}) => {
    if (didMove) {
      const {
        wasChanged, shouldOpenModal, newArr, newLayer,
      } = ConfiguratorServices.onDropLayer({
        isNewLayer,
        item,
        index,
        newIndex: actLikeClickable ? 0 : instantValuesRef.current.draggedLayerNewIndex,
        configuratorLayersList,
      });

      if (wasChanged) {
        setConfiguratorLayersList(newArr);
        if (shouldOpenModal) {
          // if new layer was added we open the modal of selecting input params
          setSelectedLayer({ ...newLayer, isNewLayer: true });
        }
      }
    } else if (!isNewLayer) {
      onLayerClick({ item })();
    }

    setDraggingPosition(null);
    setDraggableLayerMaterial(null);
    setDraggedLayerId(null);
    setDraggedLayerIndex(null);

    setDraggedLayerNewIndex(null);
    setDraggedLayerStartX(null);
  };

  const onLayerClick = ({ item, index }) => (ev) => {
    setSelectedLayer(item);
  };

  const onRemoveLayerClick = ({ item, index }) => (ev) => {
    ev.stopPropagation();
    const { wasChanged, newArr } = ConfiguratorServices.removeLayer({
      item,
      configuratorLayersList,
    });

    if (wasChanged) setConfiguratorLayersList(newArr);
  };

  const openLayerOptionsModal = () => {
    setModalState({
      isOpen: true,
      children: <LayerOptionsModal
        onSave={saveSelectedLayerOptions}
        onRemove={removeSelectedLayer}
      />,
      closeFunction: closeLayerOptionsModal,
    });
  };

  const closeLayerOptionsModal = async () => {
    closeModal();
    await sleep(200);
    setSelectedLayer(null);
  };

  const saveSelectedLayerOptions = (newObj) => {
    const { wasChanged, newArr } = ConfiguratorServices.updateLayer({
      item: { ...newObj, isNewLayer: false },
      configuratorLayersList,
    });

    if (wasChanged) setConfiguratorLayersList(newArr);
    closeLayerOptionsModal().then();
  };

  const removeSelectedLayer = (newObj) => {
    const { wasChanged, newArr } = ConfiguratorServices.removeLayer({
      item: newObj,
      configuratorLayersList,
    });

    if (wasChanged) setConfiguratorLayersList(newArr);
    closeLayerOptionsModal().then();
  };

  const getSingleConfiguration = async ({ id }) => {
    const data = await sendRequest({
      request: Api.getSingleConfiguration,
      payload: { id },
      setLoading: setGettingSingleConfigurationLoading,
    });

    if (data?.status !== 'ok') return;
    const { configuration } = data.data;
    console.log(configuration);
    const newLayers = ConfiguratorServices.getLayersFromSingleConfigurationResponse(configuration.layers, materials);
    setConfiguratorLayersList(newLayers);
    setConfiguratorSelectedCity({ id: configuration.city_id, name: configuration.city });
    setConfiguratorSelectedAngles(ConfiguratorServices.getSelectedAngles(configuration.results.angles || [], configuratorAngles));
    setConfiguratorCalculations(configuration.results);
    setConfiguratorSingleConfiguration({ ...configuration, results: undefined, layers: undefined });
  };

  useEffect(() => {
    const widths = configuratorLayersList
      .map((i) => {
        let width = MATERIALS_INFO[i.material.material_type_id]?.fullContainerWidth;
        if (!width) return null;

        if (configuratorLayersErrors[i.id]?.left === CONFIGURATOR_ERRORS.missingComponent) {
          width += MATERIALS_INFO[MATERIALS_IDS.missingComponent].fullContainerWidth;
        }
        if (configuratorLayersErrors[i.id]?.right === CONFIGURATOR_ERRORS.missingComponent) {
          width += MATERIALS_INFO[MATERIALS_IDS.missingComponent].fullContainerWidth;
        }
        return width;
      })
      .filter((i) => i !== null);
    setConfiguratorCurrentLayersWidths(widths);
  }, [configuratorLayersList, configuratorLayersErrors]);

  useEffect(() => {
    // checking for errors
    const { errors } = ConfiguratorServices.checkAllLayers({
      layers: configuratorLayersList, materialTypes,
    });
    setConfiguratorLayersErrors(errors);
  }, [configuratorLayersList, materialTypes]);

  useEffect(() => {
    const el = configuratorLayersListRef?.current;
    if (!el) return setConfiguratorLayersListSizes(null);

    const handleScroll = () => {
      setConfiguratorLayersListScrolledValue(el.scrollLeft);
    };
    el.addEventListener('scroll', handleScroll);

    setConfiguratorLayersListSizes(el.getBoundingClientRect());
    const resizeObserver = new ResizeObserver(() => {
      if (el) {
        setConfiguratorLayersListSizes(el.getBoundingClientRect());
      }
    });
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener('scroll', handleScroll);
    };
  }, [configuratorLayersListRef]);

  useEffect(() => {
    instantValuesRef.current.draggedLayerNewIndex = draggedLayerNewIndex;
  }, [draggedLayerNewIndex]);

  useEffect(() => {
    instantValuesRef.current.configuratorLayersListScrolledValue = configuratorLayersListScrolledValue;
  }, [configuratorLayersListScrolledValue]);

  useEffect(() => {
    if (selectedLayer) {
      openLayerOptionsModal();
    } else {
      closeLayerOptionsModal().then();
    }
  }, [Boolean(selectedLayer)]);

  return {
    onDragStart, onDrag, onDragStop, onLayerClick, onRemoveLayerClick, getSingleConfiguration, refreshConfiguration,
  };
};

export default useConfigurator;

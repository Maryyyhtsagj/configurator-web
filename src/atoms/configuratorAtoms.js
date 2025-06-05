import { atom } from 'jotai';

const currentConfigurationAtom = atom({});
const selectedLayerAtom = atom(null);

/* Dragging Start */
const draggedLayerIndexAtom = atom(null); // index of layer that is being dragged
const draggableLayerMaterialAtom = atom(null); // type of the layer that is being dragged
const draggingPositionAtom = atom(null); // position of mouse while dragging
const draggedLayerIdAtom = atom(null); // layer that has been dragged (is null when we add new layer)
const draggedLayerNewIndexAtom = atom(null); // index of bar to show while dragging
const draggedLayerStartXAtom = atom(null); // startX of bar to show while dragging
/* Dragging End */

/* Layers List Start */
const configuratorLayersListAtom = atom([]); // array of current layers
const configuratorLayersErrorsAtom = atom({}); // object with id of every layer
const configuratorLayersListRefAtom = atom(null); // ref object of list
const configuratorLayersListHasScrollAtom = atom(false);
const configuratorLayersListScrolledValueAtom = atom(0);
const configuratorLayersListSizesAtom = atom(null); // sizes object of list
const configuratorCurrentLayersWidthsAtom = atom([]); // array of width of current layers
/* Layers List End */

/* Data Start */
const configuratorCitiesAtom = atom([]);
const configuratorAllCitiesAtom = atom([]);
const configuratorAllCitiesLoadingAtom = atom(false);
const configuratorRegionsAtom = atom([]);
const configuratorSelectedCityAtom = atom(null);
const configuratorSelectedAnglesAtom = atom([]);
const configuratorTemplatesAtom = atom([]);
const configuratorGlassTypesAtom = atom([]);
const configuratorAnglesAtom = atom([]);
const configuratorMaxAnglesCountAtom = atom(0);
/* Data End */

/* Calculations Start */
const configuratorSingleConfigurationAtom = atom(null);
const configuratorCalculationsAtom = atom(null);
/* Data Calculations */

export {
  selectedLayerAtom,
  currentConfigurationAtom,

  draggedLayerIndexAtom,
  draggingPositionAtom,
  draggedLayerIdAtom,
  draggableLayerMaterialAtom,
  configuratorLayersListRefAtom,
  draggedLayerNewIndexAtom,
  draggedLayerStartXAtom,

  configuratorLayersListSizesAtom,
  configuratorLayersErrorsAtom,
  configuratorLayersListAtom,
  configuratorCurrentLayersWidthsAtom,
  configuratorLayersListHasScrollAtom,
  configuratorLayersListScrolledValueAtom,

  configuratorCitiesAtom,
  configuratorSelectedCityAtom,
  configuratorSelectedAnglesAtom,
  configuratorTemplatesAtom,
  configuratorGlassTypesAtom,
  configuratorAnglesAtom,
  configuratorMaxAnglesCountAtom,
  configuratorAllCitiesAtom,
  configuratorAllCitiesLoadingAtom,
  configuratorRegionsAtom,

  configuratorSingleConfigurationAtom,
  configuratorCalculationsAtom,
};

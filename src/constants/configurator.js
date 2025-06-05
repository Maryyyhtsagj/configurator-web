const MATERIALS_IDS = {
  glass: 1,
  gas: 2,
  interlayer: 3,
  cover: 4, // doted or splash
  template: 5,
  missingComponent: -1,
};

const MATERIALS_INFO = {
  // material_type_id: {}
  [MATERIALS_IDS.glass]: {
    layerBodyWidth: 45,
    fullContainerWidth: 51,

    layerBodyHeight: 242,
    fullContainerHeight: 348,
  },
  [MATERIALS_IDS.gas]: {
    layerBodyWidth: 60,
    fullContainerWidth: 66,

    layerBodyHeight: 242,
    fullContainerHeight: 348,
  },
  [MATERIALS_IDS.interlayer]: {
    layerBodyWidth: 12,
    fullContainerWidth: 51,

    layerBodyHeight: 242,
    fullContainerHeight: 348,
  },
  [MATERIALS_IDS.cover]: {
    layerBodyWidth: 18,
    fullContainerWidth: 51,

    layerBodyHeight: 242,
    fullContainerHeight: 348,
  },
  [MATERIALS_IDS.template]: {
    layerBodyWidth: 45,
    fullContainerWidth: 51,

    layerBodyHeight: 242,
    fullContainerHeight: 348,
  },
  [MATERIALS_IDS.missingComponent]: {
    layerBodyWidth: 45,
    fullContainerWidth: 51,

    layerBodyHeight: 242,
    fullContainerHeight: 348,
  },
};

const CONFIGURATOR_ERRORS = {
  missingComponent: 'missingComponent',
  invalidHeatTreatment: 'invalidHeatTreatment',
  invalidWidth: 'invalidWidth',
  invalidUnknownOption: 'invalidUnknownOption',
  incompatibleCover: 'incompatibleCover',
  maxGasCount: 'maxGasCount',
};

export {
  MATERIALS_IDS,
  MATERIALS_INFO,
  CONFIGURATOR_ERRORS,
};

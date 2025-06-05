import { v4 } from 'uuid';
import { CONFIGURATOR_ERRORS, MATERIALS_IDS, MATERIALS_INFO } from '../constants/configurator';
import deepClone from '../helpers/deepClone';

class ConfiguratorServices {
  static getCategoriesFullList = (categories, materials) => {
    // in categories we have only id of material, we need to inject materials to the tree

    const getCategoryTree = (category) => ({
      ...category,
      categories: category.categories.map((i) => getCategoryTree(i)),
      materials: category.materials.map((i) => {
        const material = materials.find((j) => j.id === i.id);
        if (material?.material_type === 'template') {
          material.children = material.children.map((i) => this.getInjectedMaterial(i, materials));
        }
        return this.getInjectedMaterial(i, materials);
      }),
    });

    const injectedCategories = categories.map(getCategoryTree);
    console.log({ injectedCategories });
    return injectedCategories;
  };

  static getInjectedMaterial = (material, materials) => {
    const foundMaterial = materials.find((i) => i.id === material.id);

    return {
      ...material,
      ...foundMaterial,
      input_params: foundMaterial.input_params.map((i) => ({
        ...i,
        options: i.options.filter((j) => j.hidden !== true || material.selected_options?.includes(j.id)),
      })),
    };
  };

  static getLayersFromScratchResponse = (list, materials) => {
    const newLayers = list.map((i) => this.createLayerPayload({ material: this.getInjectedMaterial(i, materials) }));
    return newLayers;
  };

  static getLayersFromSingleConfigurationResponse = (list, materials) => {
    const newLayers = list
      .map((i) => ({ ...i, id: i.material_id, selected_options: i.options }))
      .map((i) => this.createLayerPayload({ material: this.getInjectedMaterial(i, materials) }));
    return newLayers;
  };

  static getSelectedAngles = (selectedValues, configuratorAngles) => {
    const angles = [];
    selectedValues.forEach((i) => {
      const foundAngle = configuratorAngles.find((j) => j.name.slice(0, -1) === i);
      if (foundAngle) angles.push(foundAngle);
      else angles.push({ id: 'SELF_VALUE', name: `${i}°` });
    });

    return angles;
  };

  static getLayersFromTemplateResponse = (res, materials) => {
    const droppedLayersInfo = this.onDropLayer({
      isNewLayer: true,
      item: { ...res, children: res.children.map((i) => this.getInjectedMaterial(i, materials)) },
      index: 0,
      newIndex: 0,
      configuratorLayersList: [],
    });
    return droppedLayersInfo;
  };

  static shouldScrollListToMove = (dragX, containerWidth) => {
    // checking if dragged component is at left or right of the list

    const checkingZone = 100;
    let shouldMove = false;
    let coefficient = false;

    if (dragX >= 0 && dragX <= checkingZone) {
      shouldMove = true;
      coefficient = -(1 - dragX / checkingZone);
    } else if (dragX >= containerWidth - checkingZone && dragX <= containerWidth) {
      shouldMove = true;
      coefficient = 1 - (containerWidth - dragX) / checkingZone;
    }
    return { shouldMove, coefficient };
  };

  static getDraggedItemIndex = (itemWidths, dragX, containerWidth, scrolledLeft) => {
    // const totalItemsWidth = itemWidths.reduce((a, b) => a + b, 0);
    // const paddingLeft = (containerWidth - totalItemsWidth) / 2;
    // const relativeX = (dragX + 20) - paddingLeft;
    const relativeX = (dragX + 20) + scrolledLeft;
    if (relativeX <= -300) return null;
    if (relativeX <= 0) return 0;

    let currentX = 0;
    for (let i = 0; i < itemWidths.length; i++) {
      const nextX = currentX + itemWidths[i];
      if (relativeX >= currentX && relativeX < nextX) {
        return i;
      }
      currentX = nextX;
    }

    return itemWidths.length;
  };

  static getNewLayerStartXByIndex = (itemWidths, index, containerWidth, scrolledLeft) => {
    if (index === null) return null;

    // const totalItemsWidth = itemWidths.reduce((a, b) => a + b, 0);
    // const paddingLeft = (containerWidth - totalItemsWidth) / 2;
    // let startX = paddingLeft;

    let startX = scrolledLeft;
    for (let i = 0; i < index; i++) {
      startX += itemWidths[i];
    }

    return startX;
  };

  static getLayerAllOptions = ({ item }) => item.material.input_params.reduce((acc, i) => {
    const thisParamOptions = i.options.reduce((acc2, i2) => ({ ...acc2, [i2.id]: (i2.short_name || i2.name) + (i.unit ? ` ${i.unit}` : '') }), {});

    return { ...acc, ...thisParamOptions };
  }, {});

  static appendLayerTexts = ({ item }) => {
    const texts = [item.material.name];
    const allOptions = this.getLayerAllOptions({ item });

    item.material.selected_options
      ?.sort((a, b) => (a > b ? 1 : -1))
      .forEach((optionId) => {
        if (allOptions[optionId]) {
          texts.push(allOptions[optionId]);
        }
      });
    item.texts = texts;
  };

  static updateLayer = ({ item, configuratorLayersList }) => {
    const index = configuratorLayersList.findIndex((i) => i.id === item.id);
    if (index === -1) {
      return { wasChanged: false };
    }
    const newArr = [...configuratorLayersList];
    this.appendLayerTexts({ item });
    newArr[index] = { ...newArr[index], ...item };
    return { wasChanged: true, newArr };
  };

  static removeLayer = ({ item, configuratorLayersList }) => {
    const index = configuratorLayersList.findIndex((i) => i.id === item.id);
    if (index === -1) {
      return { wasChanged: false };
    }
    const newArr = [...configuratorLayersList];
    newArr.splice(index, 1);
    return { wasChanged: true, newArr };
  };

  static moveItemInArray = (arr, fromIndex, toIndex) => {
    const newArr = [...arr];
    if (toIndex < fromIndex) toIndex += 1;
    const [movedItem] = newArr.splice(fromIndex, 1);
    newArr.splice(toIndex, 0, movedItem);
    return newArr;
  };

  static getLayerDefaultSelectedOptions = ({ material }) => {
    if (!material.input_params?.length) return [];

    return material.selected_options?.length ? material.selected_options : material.input_params.map((i) => i.options[0]?.id);
  };

  static createLayerPayload = ({ material }) => {
    const newLayer = {
      id: v4(),
      material: {
        ...material,
        selected_options: this.getLayerDefaultSelectedOptions({ material }),
      },
    };
    this.appendLayerTexts({ item: newLayer });
    return newLayer;
  };

  static checkAllLayers = ({ layers, materialTypes }) => {
    const errors = layers.reduce((acc, i) => ({ ...acc, [i.id]: { name: i.material.name } }), {});

    const gasCount = layers.filter((i) => i.material.material_type_id === MATERIALS_IDS.gas).length;

    for (let index = 0; index < layers.length; index++) {
      const layer = layers[index];
      const prevLayer = layers[index - 1];
      const nextLayer = layers[index + 1];
      const materialTypeOfLayer = materialTypes.find((i) => i.id === layer.material.material_type_id);
      if (!materialTypeOfLayer) continue;

      // checking left component
      if (index === 0) {
        if (materialTypeOfLayer.minimum_elements_around === 1) {
          if (!layers[index + 1]) {
            errors[layer.id].left = CONFIGURATOR_ERRORS.missingComponent;
          }
        } else if (materialTypeOfLayer.minimum_elements_around === 2) {
          errors[layer.id].left = CONFIGURATOR_ERRORS.missingComponent;
        }
      } else if (index > 0) {
        // not adding if previous layer has error from right
        if (!errors[prevLayer.id]?.right) {
          if (!materialTypeOfLayer.types_allowed.includes(prevLayer.material.material_type)) {
            errors[layer.id].left = CONFIGURATOR_ERRORS.missingComponent;
          }
        }
      }

      // checking right component
      if (index === layers.length - 1) {
        if (materialTypeOfLayer.minimum_elements_around === 1) {
          if (!layers[index - 1]) {
            errors[layer.id].right = CONFIGURATOR_ERRORS.missingComponent;
          }
        } else if (materialTypeOfLayer.minimum_elements_around === 2) {
          errors[layer.id].right = CONFIGURATOR_ERRORS.missingComponent;
        }
      } else if (index < layers.length - 1) {
        if (!materialTypeOfLayer.types_allowed.includes(nextLayer.material.material_type)) {
          errors[layer.id].right = CONFIGURATOR_ERRORS.missingComponent;
        }
      }

      // checking glass for cover
      if (layer.material.material_type_id === MATERIALS_IDS.cover) {
        let isAnyGlassNextToCover = false;

        if (prevLayer?.material.material_type_id === MATERIALS_IDS.glass) {
          const allowedOptionsOfThisGlass = layer.material.children.find((i) => i.id === prevLayer.material.id)?.options;

          if (allowedOptionsOfThisGlass) {
            const notIncludedValue = prevLayer.material.selected_options?.find((i) => !allowedOptionsOfThisGlass.includes(i));
            if (notIncludedValue) {
              // we sort input params by priority to know which error to show if there are many
              const sortedInputParams = prevLayer.material.input_params.sort((a, b) => b.error_priority - a.error_priority);
              // param name of the option that is missing
              const notIncludedParamName = sortedInputParams.find((i) => i.options.find((j) => j.id === notIncludedValue))?.name;

              if (notIncludedParamName === 'width') errors[prevLayer.id].bottom = CONFIGURATOR_ERRORS.invalidWidth;
              else if (notIncludedParamName === 'thermal_treatment') errors[prevLayer.id].bottom = CONFIGURATOR_ERRORS.invalidHeatTreatment;
              else errors[prevLayer.id].bottom = CONFIGURATOR_ERRORS.invalidUnknownOption;
            }
          } else {
            // this glass is not allowed to this cover
            errors[prevLayer.id].bottom = CONFIGURATOR_ERRORS.incompatibleCover;
          }

          isAnyGlassNextToCover = true;
        }
        if (nextLayer?.material.material_type_id === MATERIALS_IDS.glass) {
          const allowedOptionsOfThisGlass = layer.material.children.find((i) => i.id === nextLayer.material.id)?.options;
          if (allowedOptionsOfThisGlass) {
            const notIncludedValue = nextLayer.material.selected_options?.find((i) => !allowedOptionsOfThisGlass.includes(i));
            if (notIncludedValue) {
              // we sort input params by priority to know which error to show if there are many
              const sortedInputParams = nextLayer.material.input_params.sort((a, b) => b.error_priority - a.error_priority);
              // param name of the option that is missing
              const notIncludedParamName = sortedInputParams.find((i) => i.options.find((j) => j.id === notIncludedValue))?.name;

              if (notIncludedParamName === 'width') errors[nextLayer.id].bottom = CONFIGURATOR_ERRORS.invalidWidth;
              else if (notIncludedParamName === 'thermal_treatment') errors[nextLayer.id].bottom = CONFIGURATOR_ERRORS.invalidHeatTreatment;
              else errors[nextLayer.id].bottom = CONFIGURATOR_ERRORS.invalidUnknownOption;
            }
          } else {
            // this glass is not allowed to this cover
            errors[nextLayer.id].bottom = CONFIGURATOR_ERRORS.incompatibleCover;
          }

          isAnyGlassNextToCover = true;
        }

        if (!isAnyGlassNextToCover) {
          // cover must have one glass next to it
          errors[layer.id].right = CONFIGURATOR_ERRORS.missingComponent;
        }
      }

      // checking count of gas, max is 2
      if (layer.material.material_type_id === MATERIALS_IDS.gas) {
        if (gasCount > 2) {
          errors[layer.id].bottom = CONFIGURATOR_ERRORS.maxGasCount;
        }
      }

      // checking if there is any layer between glasses besides cover
      if (layer.material.material_type_id === MATERIALS_IDS.cover) {
        if (prevLayer?.material.material_type_id === MATERIALS_IDS.glass
          && nextLayer?.material.material_type_id === MATERIALS_IDS.glass) {
          if (errors[layer.id]?.right !== CONFIGURATOR_ERRORS.missingComponent) {
            errors[layer.id].left = CONFIGURATOR_ERRORS.missingComponent;
          }
        }
      }
    }

    return { errors };
  };

  static checkParentMaterialIdForTriplex = ({ layers }) => {
    let newArr = [...layers];
    // let wasChanged = false;

    const triplexPackIdsToReset = [];
    const triplexPackIdsToKeep = [];

    newArr.forEach((layer, index) => {
      if (layer.pack_count > 0 && index <= layers.length - layer.pack_count) {
        const thisPackPossibleLayers = layers
          .slice(index, index + layer.pack_count).map((i) => i.material)
          .map((i, ind) => {
            if (ind > 0) {
              const newObj = { ...i };
              delete newObj.parent_material_id;
              return newObj;
            }

            return i;
          });

        if (layer.pack_init !== JSON.stringify(thisPackPossibleLayers)) {
          triplexPackIdsToReset.push(layer.pack_id);
        } else {
          triplexPackIdsToKeep.push(layer.pack_id);
        }
      }
    });

    newArr = newArr.map((layer) => {
      if (triplexPackIdsToReset.includes(layer.pack_id)
          || !triplexPackIdsToKeep.includes(layer.pack_id)) {
        // if (!wasChanged) wasChanged = true;
        delete layer.pack_id;
        delete layer.pack_init;
        delete layer.pack_count;
        delete layer.material.parent_material_id;
      }

      return layer;
    });

    return { newArr };
  };

  static onDropLayer = ({
    isNewLayer,
    item,
    index,
    newIndex,
    configuratorLayersList,
  }) => {
    if (configuratorLayersList?.length && newIndex === null) {
      return { wasChanged: false };
    }

    if (isNewLayer) {
      const newArr = [...configuratorLayersList];
      let shouldOpenModal = false;
      let newLayer = null;

      if (item.material_type_id === MATERIALS_IDS.template) {
        const packId = v4();

        item.children.forEach((childMaterial, indexToAdd) => {
          newLayer = this.createLayerPayload({ material: childMaterial });
          newLayer.material.parent_material_id = item.id;

          newLayer.pack_id = packId;
          if (indexToAdd === 0) {
            newLayer.pack_init = JSON.stringify(item.children);
            newLayer.pack_count = item.children.length;
          }

          newArr.splice(newIndex + indexToAdd, 0, newLayer);
        });
        newLayer = null;
      } else {
        newLayer = this.createLayerPayload({ material: item });
        newArr.splice(newIndex, 0, newLayer);
        shouldOpenModal = newLayer.material.input_params?.length > 0;
      }

      return {
        wasChanged: true, shouldOpenModal, newArr, newLayer,
      };
    }

    if (index === newIndex || index + 1 === newIndex) {
      return { wasChanged: false };
    }

    const newArr = this.moveItemInArray(configuratorLayersList, index, newIndex - 1);
    return { wasChanged: true, newArr };
  };

  static getMaterialsWithPathList = (allCategoriesTree) => {
    // getting all nested materials of categories with "path" array for every material
    const getCategoriesMaterials = (categories, path = []) => {
      const categoryAllMaterials = [];

      categories.forEach((category) => {
        const materials = category.materials.map((i) => ({ ...i, path: [...path, category.name] }));
        const allNestedMaterials = getCategoriesMaterials(category.categories, [...path, category.name]);

        categoryAllMaterials.push(...materials);
        categoryAllMaterials.push(...allNestedMaterials);
      });

      return categoryAllMaterials;
    };

    const injectedMaterials = getCategoriesMaterials(allCategoriesTree);

    return injectedMaterials;
  };

  static getFilteredMaterials = (materials, query) => {
    const queryList = query.trim().replaceAll('  ', ' ').split(' ');

    const filteredMaterials = materials.filter((material) => {
      const listToSearch = [material.name.toLowerCase(), ...material.path.map((i) => i.toLowerCase())];

      for (const queryItem of queryList) {
        const isIncluded = listToSearch.some((listItem) => listItem.includes(queryItem.toLowerCase()));
        if (!isIncluded) return false;
      }

      return true;
    });

    return filteredMaterials;
  };

  static getFilteredCategoriesTree = (categoriesTree, filteredMaterials) => {
    const newTree = deepClone(categoriesTree);
    const filterCategoriesMaterials = (categories) => {
      for (const category of categories) {
        category.materials = category.materials.filter((i) => filteredMaterials.some((i2) => i2.id === i.id));

        if (category.categories?.length) {
          filterCategoriesMaterials(category.categories);
        }

        const shouldShowCategory = category.materials.length || category.categories.some((i) => i.materials.length || i.shouldShowCategory);
        category.shouldShowCategory = shouldShowCategory;
      }
    };

    filterCategoriesMaterials(newTree);

    return newTree;
  };

  static checkLayersErrorsCount = (layers, errors) => {
    let count = 0;

    layers.forEach((layer) => {
      if (errors[layer.id]?.bottom) {
        count++;
      } if (errors[layer.id]?.left) {
        count++;
      } if (errors[layer.id]?.right) {
        count++;
      } if (errors[layer.id]?.top) {
        count++;
      }
    });

    return count;
  };
}

export default ConfiguratorServices;

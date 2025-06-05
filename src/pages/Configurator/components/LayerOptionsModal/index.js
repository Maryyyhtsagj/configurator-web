import React, { useMemo } from 'react';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import { selectedLayerAtom } from '../../../../atoms/configuratorAtoms';
import Select from '../../../../ui-kit/Select';
import Button from '../../../../ui-kit/Button';
import useTranslations from '../../../../hooks/useTranslations';
import { DICTIONARY } from '../../../../translations/dictionary';
import EmptyHeight from '../../../../components/EmptyHeight';
import UnderlinedButton from '../../../../ui-kit/UnderlinedButton';

function SelectItem({
  param, selectedOptions = [], setSelectedLayer, selectedLayer,
}) {
  const options = useMemo(() => param.options.map((i) => ({
    id: i.id, name: i.name + (param.unit ? ` ${param.unit}` : ''),
  })), [param]);

  const selectedVal = useMemo(() => {
    const selected = options.find((i) => selectedOptions.includes(i.id));
    return selected || null;
  }, [options, selectedOptions]);

  const handleChange = (val) => {
    const optionsOfThisParam = param.options.map((i) => i.id);
    const newSelectedOptions = selectedOptions
      .filter((i) => !optionsOfThisParam.includes(i)); // removing selected option of this param
    newSelectedOptions.push(val.id); // adding new option of this param;

    const newSelectedLayer = {
      ...selectedLayer,
      material: { ...selectedLayer.material, selected_options: newSelectedOptions },
    };
    setSelectedLayer(newSelectedLayer);
  };

  return (
    <Select
      text={param.description}
      value={selectedVal}
      onChange={handleChange}
      items={options}
      valueField="id"
      labelField="name"
      width="100%"
    />
  );
}

function LayerOptionsModal({ onSave, onRemove }) {
  const { t } = useTranslations();
  const [selectedLayer, setSelectedLayer] = useAtom(selectedLayerAtom);

  const onSaveClick = () => {
    onSave(selectedLayer);
  };
  const onDeleteClick = () => {
    onRemove(selectedLayer);
  };

  if (!selectedLayer) return null;
  return (
    <div className={styles.layerOptionsModal}>
      <p className={styles.title}>{selectedLayer.material.name}</p>
      <div className={styles.selectsList}>
        {selectedLayer.material.input_params.map((param, index) => (
          <SelectItem
            key={index}
            param={param}
            selectedOptions={selectedLayer.material.selected_options}
            selectedLayer={selectedLayer}
            setSelectedLayer={setSelectedLayer}
          />
        ))}
      </div>

      <div className={styles.buttons}>
        {selectedLayer.isNewLayer ? (
          <Button width="100%" text={t(DICTIONARY.add)} onClick={onSaveClick} />
        ) : (
          <>
            {!!selectedLayer.material.input_params?.length && (
              <Button width="100%" text={t(DICTIONARY.edit)} onClick={onSaveClick} />
            )}
            <UnderlinedButton text={t(DICTIONARY.delete)} onClick={onDeleteClick} />
          </>
        )}
      </div>
    </div>
  );
}

export default LayerOptionsModal;

import React, { useState } from 'react';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import EmptyHeight from '../../components/EmptyHeight';
import Button, { BUTTON_VARIANTS } from '../../ui-kit/Button';
import RadioButton from '../../ui-kit/RadioButton';
import Checkbox from '../../ui-kit/Checkbox';
import useInputState from '../../hooks/useInputState';
import Input from '../../ui-kit/Input';
import SearchIcon from '../../assets/icons/search.svg';
import DownloadIcon from '../../assets/icons/download.svg';
import { modalStateAtom, openConfirmModalAtom, openInfoModalAtom } from '../../atoms/modalAtoms';
import Select from '../../ui-kit/Select';
import IconButton from '../../ui-kit/IconButton';

const selectArray = [
  { value: 'auth', label: 'Авторизация и регистрация' },
  { value: 'configurator', label: 'Конфигуратор' },
  { value: 'partners', label: 'Сотрудничество' },
  { value: 'other', label: 'Другой вопрос' },
  { value: 'au2th', label: 'Jjakdsnsa askjd' },
  { value: 'conf2igurator', label: 'Jsjdas' },
  { value: 'pa2rtners', label: 'Ueedwewe' },
  { value: 'ot2her', label: 'Aasd asldas' },
];

function UiKit() {
  // const [modalState, setModalState] = useAtom(modalStateAtom);
  const [, openConfirmModal] = useAtom(openConfirmModalAtom);
  const [, openInfoModal] = useAtom(openInfoModalAtom);

  const [radio1, setRadio1] = useState(true);
  const [radio2, setRadio2] = useState(false);
  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(false);

  const [inputText, setInputText] = useInputState();
  const [inputText2, setInputText2] = useInputState();
  const [selectVal, setSelectVal] = useInputState();

  const onConfirmModalButtonClick = () => {
    openConfirmModal({
      text: 'Заменить текущую конфигурацию или создать новую?',
      buttonText: 'Заменить',
      secondButtonText: 'Оставить',
    });
  };

  const onInfoModalButtonClick = () => {
    openInfoModal({
      text: 'У вас лалал саклдсад садлкса дсда. Чтобы решить надо дакф йск фдйскф',
    });
  };

  return (
    <div style={{ padding: '30px' }}>
      <EmptyHeight height={50} />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, itaque?
      <EmptyHeight height={50} />
      <Button text="Узнать подробнее" />
      <EmptyHeight height={50} />
      <Button text="Узнать подробнее" variant={BUTTON_VARIANTS.secondary} />
      <EmptyHeight height={50} />
      <Button text="Узнать подробнее" variant={BUTTON_VARIANTS.inverse} />
      <EmptyHeight height={50} />
      <Button text="Узнать подробнее" isDisabled />
      <EmptyHeight height={50} />
      <IconButton text="Сохранить в архив" icon={DownloadIcon} />
      <EmptyHeight height={50} />
      <EmptyHeight height={50} />
      <Button
        text="Открыть окно подтверждения"
        width={null}
        onClick={onConfirmModalButtonClick}
      />
      <EmptyHeight height={50} />
      <EmptyHeight height={50} />
      <Button
        text="Открыть окно информации"
        width={null}
        onClick={onInfoModalButtonClick}
      />
      <EmptyHeight height={50} />
      <EmptyHeight height={50} />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, itaque?
      <EmptyHeight height={50} />
      <RadioButton
        text="Значение"
        value={radio1}
        onClick={() => setRadio1((prev) => !prev)}
      />
      <EmptyHeight height={50} />
      <RadioButton
        text="Значение"
        value={radio2}
        onClick={() => setRadio2((prev) => !prev)}
      />
      <EmptyHeight height={50} />
      <Checkbox
        text="Значение"
        value={checkbox1}
        onClick={() => setCheckbox1((prev) => !prev)}
      />
      <EmptyHeight height={50} />
      <Checkbox
        text="Значение"
        value={checkbox2}
        onClick={() => setCheckbox2((prev) => !prev)}
      />
      <EmptyHeight height={50} />

      <Input
        text="Заголовок"
        value={inputText}
        onChange={setInputText}
        isRequired
        hintText="лсамд садлисад сдйклса дасйд асй дйкас дкайсд ксай"
        placeholder="Подсказка для ввода"
        rightIcon={SearchIcon}
      />
      <EmptyHeight height={100} />
      <Input
        text="Заголовок для ошибки"
        value={inputText2}
        onChange={setInputText2}
        isRequired
        placeholder="Подсказка для ввода"
        error="Заполните это поле"
      />
      <EmptyHeight height={200} />

      <Select
        text="Тема"
        isRequired
        hintText="лсамд садлисад сдйклса дасйд асй дйкас дкайсд ксай"
        placeholder="Выберите тему"
        items={selectArray}
        value={selectVal}
        onChange={setSelectVal}
      />
      <EmptyHeight height={200} />
    </div>
  );
}

export default UiKit;

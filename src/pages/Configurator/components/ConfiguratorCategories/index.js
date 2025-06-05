import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import Input from '../../../../ui-kit/Input';
import {
  categoriesAtom,
  categoriesInnerListMaxHeightAtom, categoriesTreeFilteredAtom,
  materialsFilteredAtom,
  materialsQueryAtom, materialsWithPathAtom,
} from '../../../../atoms/categoriesAtoms';
import SearchIcon from '../../../../assets/icons/search.svg';
import { initLoadingAtom, windowHeightAtom, windowWidthAtom } from '../../../../atoms/globalAtoms';
import Loading from '../../../../ui-kit/Loading';
import CategoriesMaterialItem from '../CategoriesMaterialItem';
import CategoryItem from '../CategoryItem';
import tStatic from '../../../../translations';
import { DICTIONARY } from '../../../../translations/dictionary';
import Button from '../../../../ui-kit/Button';
import useTranslations from '../../../../hooks/useTranslations';
import useComponentSizes from '../../../../hooks/useComponentSizes';
import EmptyHeight from '../../../../components/EmptyHeight';
import useBlocker from '../../../../hooks/useBlocker';
import { draggingPositionAtom } from '../../../../atoms/configuratorAtoms';
import ConfiguratorServices from '../../../../services/ConfiguratorServices';

const CHILD_ITEM_HEIGHT = 43;

function List({
  categoriesList = [],
  materialsList = [],
  shouldCountMaxHeight = false, // counting height only for the first level
  draggingProps,

  isParentOpened,
  actLikeClickable,
}) {
  const [openedCategory, setOpenedCategory] = useState(null);

  return (
    <>
      {categoriesList.map((item) => (
        <CategoryItem
          key={item.id}
          category={item}
          openedCategory={openedCategory}
          setOpenedCategory={setOpenedCategory}
          List={List}
          shouldCountMaxHeight={shouldCountMaxHeight}
          draggingProps={draggingProps}
          isParentOpened={isParentOpened}
          actLikeClickable={actLikeClickable}
        />
      ))}
      {materialsList.map((item) => (
        <CategoriesMaterialItem
          key={item.id}
          material={item}
          draggingProps={draggingProps}
          actLikeClickable={actLikeClickable}
        />
      ))}
      {!categoriesList.length && !materialsList.length
          && <p className={styles.emptyText}>{tStatic(DICTIONARY.emptyText)}</p>}
    </>
  );
}

function FilteredList({
  categoriesList = [],
  materialsList = [],
  draggingProps,
  actLikeClickable,
}) {
  return (
    <>
      {categoriesList.map((item) => (
        item.shouldShowCategory && (
          <CategoryItem
            key={item.id}
            category={item}
            allOpened
            List={FilteredList}
            draggingProps={draggingProps}
            actLikeClickable={actLikeClickable}
          />
        )
      ))}
      {materialsList.map((item) => (
        <CategoriesMaterialItem
          key={item.id}
          material={item}
          draggingProps={draggingProps}
          actLikeClickable={actLikeClickable}
        />
      ))}
      {!categoriesList.length && !materialsList.length
            && <p className={styles.emptyText}>{tStatic(DICTIONARY.emptyText)}</p>}
    </>
  );
}

function ConfiguratorCategories({ isOnlyConfigurator, draggingProps }) {
  const { t } = useTranslations();
  const listRef = useRef(null);
  const [initLoading] = useAtom(initLoadingAtom);
  const [categories] = useAtom(categoriesAtom);
  const [, setCategoriesInnerListMaxHeight] = useAtom(categoriesInnerListMaxHeightAtom);
  const [windowWidth] = useAtom(windowWidthAtom);
  const [windowHeight] = useAtom(windowHeightAtom);
  const [draggingPosition] = useAtom(draggingPositionAtom);
  const [materialsWithPath] = useAtom(materialsWithPathAtom);
  const [materialsQuery, setMaterialsQuery] = useAtom(materialsQueryAtom);
  const [materialsFiltered, setMaterialsFiltered] = useAtom(materialsFilteredAtom);
  const [categoriesTreeFiltered, setCategoriesTreeFiltered] = useAtom(categoriesTreeFilteredAtom);

  const [isCategoriesOverlayVisible, setIsCategoriesOverlayVisible] = useState(false);
  const [isCategoriesOverlayTransparent, setIsCategoriesOverlayTransparent] = useState(false);
  const isSmallScreen = useMemo(() => windowWidth <= 900, [windowWidth]);
  const shouldShowFiltered = useMemo(() => Boolean(materialsQuery?.length), [materialsQuery]);

  const onButtonClick = () => {
    setIsCategoriesOverlayVisible(true);
    setIsCategoriesOverlayTransparent(false);
  };

  const onBackClick = () => {
    setIsCategoriesOverlayVisible(false);
    setIsCategoriesOverlayTransparent(false);
  };

  useComponentSizes({
    componentRef: listRef,
    onEntryChange: (entry) => {
      const fullListHeight = isSmallScreen ? windowHeight - 160 : entry.contentRect.height;
      const allFirstLevelChildrenHeight = categories.length * CHILD_ITEM_HEIGHT;

      setCategoriesInnerListMaxHeight(fullListHeight - allFirstLevelChildrenHeight);
    },
  }, [categories.length, isSmallScreen, windowHeight]);

  useEffect(() => {
    if (!materialsQuery?.length) {
      return setMaterialsFiltered([]);
    }

    if (windowWidth <= 900 && !isCategoriesOverlayVisible) {
      onButtonClick();
    }

    const timer = setTimeout(() => {
      const filteredMaterialsTmp = ConfiguratorServices.getFilteredMaterials(materialsWithPath, materialsQuery);
      setMaterialsFiltered(filteredMaterialsTmp);
      setCategoriesTreeFiltered(ConfiguratorServices.getFilteredCategoriesTree(categories, filteredMaterialsTmp));
    }, 300);

    return () => clearTimeout(timer);
  }, [materialsQuery]);

  useEffect(() => {
    // making overlay transparent while dragging
    if (draggingPosition && isSmallScreen && isCategoriesOverlayVisible) {
      setIsCategoriesOverlayTransparent(true);
    }
  }, [draggingPosition]);

  useEffect(() => {
    // close overlay when dropped
    if (!draggingPosition && isSmallScreen) {
      setIsCategoriesOverlayVisible(false);
      setIsCategoriesOverlayTransparent(false);
    }
  }, [draggingPosition]);

  return (
    <div className={classNames(styles.categories, { [styles.configuratorOnly]: isOnlyConfigurator })}>
      <Input
        withClean
        placeholder={t(DICTIONARY.searchComponents)}
        width="100%"
        rightIcon={SearchIcon}
        value={materialsQuery}
        onChange={(ev) => setMaterialsQuery(ev?.target?.value || '')}
      />
      <div className={classNames(styles.categoriesList, 'noScrollBar')} ref={listRef}>
        {initLoading
          ? <Loading />
          : !isSmallScreen ? (
            shouldShowFiltered ? (
              <FilteredList
                categoriesList={categoriesTreeFiltered}
                draggingProps={draggingProps}
              />
            ) : (
              <List
                categoriesList={categories}
                shouldCountMaxHeight
                draggingProps={draggingProps}
              />
            )
          ) : (
            <div className={styles.button}>
              <Button
                width="100%"
                text={t(DICTIONARY.selectComponents)}
                onClick={onButtonClick}
              />
            </div>
          )}
      </div>

      {(isCategoriesOverlayVisible) && (
        <div
          className={classNames(styles.categoriesOverlay, 'noScrollBar')}
          style={{
            opacity: isCategoriesOverlayTransparent ? 0 : 1,
          }}
        >
          <Button
            width="100%"
            text={t(DICTIONARY.backToConfigurator)}
            onClick={onBackClick}
          />
          <EmptyHeight height={11} />
          <Input
            withClean
            placeholder={t(DICTIONARY.searchComponents)}
            width="100%"
            rightIcon={SearchIcon}
            value={materialsQuery}
            onChange={(ev) => setMaterialsQuery(ev?.target?.value || '')}
          />
          <EmptyHeight height={11} />
          {shouldShowFiltered ? (
            <FilteredList
              categoriesList={categoriesTreeFiltered}
              draggingProps={draggingProps}
              actLikeClickable
            />
          ) : (
            <List
              categoriesList={categories}
              draggingProps={draggingProps}
              actLikeClickable
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ConfiguratorCategories;

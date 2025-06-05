import classNames from 'classnames';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import ArrowRightIcon from '../../../../assets/icons/arrowRight.svg';
import { categoriesInnerListMaxHeightAtom } from '../../../../atoms/categoriesAtoms';
import CachedSvg from '../../../../components/CachedSvg';
import sleep from '../../../../helpers/sleep';

function CategoryItem({
  category,
  openedCategory,
  setOpenedCategory,
  List,
  shouldCountMaxHeight,
  draggingProps,
  allOpened,
  isParentOpened,
  actLikeClickable,
}) {
  const [categoriesInnerListMaxHeight] = useAtom(categoriesInnerListMaxHeightAtom);
  const [shouldShowFullList, setShouldShowFullList] = useState(false);
  const [isOpenedDelayed, setIsOpenedDelayed] = useState(false);
  const isOpened = useMemo(() => allOpened || openedCategory?.id === category.id, [openedCategory, category.id, allOpened]);

  const onItemClick = () => {
    if (allOpened) return;

    if (isOpened) {
      setOpenedCategory(null);
    } else {
      setOpenedCategory(category);
    }
  };

  useEffect(() => {
    let timer;
    if (!isParentOpened) {
      // when we close parent we also close all nested categories
      timer = setTimeout(() => {
        setOpenedCategory?.(null);
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [isParentOpened]);

  useEffect(() => {
    let timer;
    if ((!shouldCountMaxHeight && isOpened) || allOpened) {
      // when setting fit-content to max-height there is no animation
      timer = setTimeout(() => {
        setShouldShowFullList(true);
      }, 400);
    } else {
      setShouldShowFullList(false);
    }

    return () => clearTimeout(timer);
  }, [shouldCountMaxHeight, isOpened, allOpened]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpenedDelayed(isOpened);
    }, isOpened ? 0 : 200);
    return () => clearTimeout(timer);
  }, [isOpened]);

  return (
    <>
      <div
        className={classNames(
          styles.categoryItem,
          { [styles.categoryItemPressable]: !allOpened, [styles.categoryItemOpened]: isOpened },
          'noSelection',
        )}
        onClick={onItemClick}
      >
        <div className={styles.categoryItemLeft}>
          {category.pictogram && (
            <CachedSvg className={styles.categoryItemIcon} src={category.pictogram} alt="" draggable="false" />
          )}
          <p className={styles.categoryItemName}>{category.name}</p>
        </div>
        <div
          className={classNames(
            styles.categoryItemArrow,
            { [styles.categoryItemArrowOpened]: isOpened },
          )}
        >
          <img src={ArrowRightIcon} alt=">" draggable="false" />
        </div>
      </div>
      <div
        className={classNames(
          styles.categoryItemList,
          { [styles.categoryItemListOpened]: isOpenedDelayed },
          'noScrollBar',
        )}
        style={{
          maxHeight: isOpened
            ? (shouldCountMaxHeight ? `${categoriesInnerListMaxHeight}px`
              : shouldShowFullList ? 'fit-content' : '500px')
            : 0,
          overflowY: isOpened
            ? (shouldCountMaxHeight ? 'auto' : 'hidden')
            : 'hidden',
        }}
      >
        <List
          categoriesList={category.categories}
          materialsList={category.materials}
          draggingProps={draggingProps}
          isParentOpened={isOpened}
          actLikeClickable={actLikeClickable}
        />
      </div>
    </>
  );
}

export default CategoryItem;

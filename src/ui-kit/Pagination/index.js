import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import LeftIcon from '../../assets/icons/left.svg';
import RightIcon from '../../assets/icons/right.svg';

function getPagesArray(page, pagesCount) {
  [page, pagesCount] = [page || 1, pagesCount || 1];
  const totalVisible = 6;
  const pages = new Set();

  pages.add(1);
  pages.add(pagesCount);
  pages.add(page);
  if (page > 1) pages.add(page - 1);
  if (page < pagesCount) pages.add(page + 1);

  let offset = 2;
  while (pages.size < totalVisible) {
    const before = page - offset;
    const after = page + offset;

    if (before > 1) pages.add(before);
    if (pages.size < totalVisible && after < pagesCount) pages.add(after);

    if (before <= 1 && after >= pagesCount) break;
    offset++;
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);

  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    result.push(sorted[i]);
    if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
      result.push(null);
    }
  }

  return result;
}

function Pagination({ page, setPage, pagesCount }) {
  const pages = useMemo(() => getPagesArray(page, pagesCount), [page, pagesCount]);

  const onLeftClick = () => {
    if (page > 1) setPage(page - 1);
  };

  const onRightClick = () => {
    if (page < pagesCount) setPage(page + 1);
  };

  return (
    <div className={styles.paginationWrapper}>
      <div
        className={classNames(styles.paginationButton, styles.paginationButtonLeft, 'pressable')}
        onClick={onLeftClick}
      >
        <img src={RightIcon} alt="Previous" />
      </div>

      <div className={styles.paginationPageRow}>
        {pages.map((item, idx) => (item === null ? (
          <div key={`dots-${idx}`} className={classNames(styles.paginationItem, styles.ellipsis)}>…</div>
        ) : (
          <div
            key={idx}
            className={classNames(styles.paginationItem, item === page ? styles.selected : 'pressable')}
            onClick={() => setPage(item)}
          >
            {item}
          </div>
        )))}
      </div>

      <div
        className={classNames(styles.paginationButton, styles.paginationButtonRight, 'pressable')}
        onClick={onRightClick}
      >
        <img src={LeftIcon} alt="Next" />
      </div>
    </div>
  );
}

export default Pagination;

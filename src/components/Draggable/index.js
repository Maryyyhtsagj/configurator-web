import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import sleep from '../../helpers/sleep';

function Draggable({
  onDrag, onDragStart, onDragEnd, className, children, touchAction, actLikeClickable,
}) {
  const isDragging = useRef(false);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const timerRef = useRef(null);

  const LONG_PRESS_DELAY = actLikeClickable ? 0 : 200; // ms

  // Touch start (finger down)
  const handleTouchStart = (e) => {
    if (actLikeClickable) return;

    // console.log('handleTouchStart');
    timerRef.current = setTimeout(() => {
      const touchEvent = e.touches[0];
      isDragging.current = true;
      setIsDraggingState(true);
      onDragStart(touchEvent, { actLikeClickable });
      navigator.vibrate?.(10);
    }, LONG_PRESS_DELAY);
  };

  // Cancel if finger moves too soon or lifts early
  const handleTouchMove = (e) => {
    if (actLikeClickable) return;

    // console.log('handleTouchMove');
    if (!actLikeClickable) {
      if (isDragging.current) {
        // e.preventDefault();

        const touchEvent = e.touches[0];
        onDrag(touchEvent, {});
      } else {
        handleTouchEnd(e);
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (actLikeClickable) return;

    // console.log('handleTouchEnd');
    clearTimeout(timerRef.current);
    if (isDragging) {
      isDragging.current = false;
      setIsDraggingState(false);
      onDragEnd(e, { didMove: true, actLikeClickable });
    }
  };

  // Support mouse for desktop
  const handleMouseDown = (e) => {
    if (actLikeClickable) return;
    onDragStart(e);

    const startX = e.clientX;
    const startY = e.clientY;
    let didMove = false;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (!didMove && distance > 15) {
        didMove = true;
      }

      if (didMove) {
        onDrag(e);
      }
    };

    const handleMouseUp = (e) => {
      onDragEnd(e, { didMove }); // call if moved
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const onClick = async (e) => {
    if (!actLikeClickable) return;
    onDragStart({}, { actLikeClickable });
    await sleep(50);
    onDragEnd(e, { didMove: true, actLikeClickable });
  };

  return (
    <div
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      className={classNames(
        className,
        styles.draggable,
      )}
      style={{ touchAction }}
    >
      {children}
    </div>
  );
}

export default Draggable;

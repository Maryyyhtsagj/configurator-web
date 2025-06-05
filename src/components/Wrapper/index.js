import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router';
import { useAtom } from 'jotai/index';
import styles from './css/index.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import usePathnameChange from '../../hooks/usePathnameChange';
import {
  pathnameAtom, scrollableContentRefAtom, windowHeightAtom, wrapperRefAtom,
} from '../../atoms/globalAtoms';
import useBlocker from '../../hooks/useBlocker';

function Wrapper() {
  const [pathname] = useAtom(pathnameAtom);
  const [, setWrapperRef] = useAtom(wrapperRefAtom);
  const [, setScrollableContentRef] = useAtom(scrollableContentRefAtom);
  const [windowHeight] = useAtom(windowHeightAtom);
  const wrapperRef = useRef(null);
  const scrollableContentRef = useRef(null);
  usePathnameChange();

  useEffect(() => {
    setWrapperRef(wrapperRef);
  }, [wrapperRef]);

  useEffect(() => {
    setScrollableContentRef(scrollableContentRef);
  }, [scrollableContentRef]);

  useEffect(() => {
    if (pathname && scrollableContentRef.current?.scrollTo) {
      scrollableContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  useEffect(() => {
    const vh = windowHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [windowHeight]);

  // useBlocker(() => true);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <Header />
      <div className={styles.scrollableContent} ref={scrollableContentRef}>
        <div className={styles.main}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Wrapper;

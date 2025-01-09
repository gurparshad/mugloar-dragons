import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './mainLayout.module.scss';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './footer/Footer';
import Header from './header/Header';

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

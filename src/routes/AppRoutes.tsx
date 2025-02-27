import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import MainLayout from '../layouts/mainLayout/MainLayout';
import Ads from '../pages/ads/Ads';
import GameOver from '../pages/gameOver/GameOver';
import Home from '../pages/home/Home';
import Shop from '../pages/shop/Shop';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/ads" element={<PrivateRoute element={<Ads />} />} />
        <Route path="shop" element={<PrivateRoute element={<Shop />} />} />
        <Route path="game-over" element={<PrivateRoute element={<GameOver />} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

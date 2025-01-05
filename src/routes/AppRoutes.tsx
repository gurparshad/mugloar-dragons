import React from "react";
import {Route, Routes} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Ads from "../pages/Ads";
import Shop from "../pages/Shop";
import PrivateRoute from "./PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/ads" element={<PrivateRoute element={<Ads />} />} />
        <Route path="shop" element={<PrivateRoute element={<Shop />} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

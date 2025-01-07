import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const gameData = localStorage.getItem('gameState');

  if (!gameData) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;

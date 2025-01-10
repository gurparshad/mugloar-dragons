import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useErrorHandler from './useErrorHandler';
import { useStartGameMutation } from '../features/apiSlice';
import { setGame } from '../features/gameSlice';
import { ApplicationRoutes } from '../utils/constants';

const useStartGame = () => {
  const [startGame] = useStartGameMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  const startGameHandler = async () => {
    try {
      const result = await startGame().unwrap();
      dispatch(
        setGame({
          gameId: result.gameId,
          score: 0,
          gold: 0,
          lives: 3,
          level: 0,
        })
      );
      navigate(ApplicationRoutes.ADS);
    } catch (err) {
      const errorMessage = 'Failed to start the game. Please try again';
      handleError(errorMessage, err, 'useStartGame - startGameHandler');
    }
  };

  return startGameHandler;
};

export default useStartGame;

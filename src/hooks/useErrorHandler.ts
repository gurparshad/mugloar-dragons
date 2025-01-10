import { useDispatch } from 'react-redux';

import { setError } from '../features/errorSlice';
import { logError } from '../utils/logger';

const useErrorHandler = () => {
  const dispatch = useDispatch();

  const handleError = (errorMessage: string, errorDetails: unknown, context: string) => {
    logError(errorMessage, errorDetails, context);
    dispatch(setError(errorMessage));
  };

  return handleError;
};

export default useErrorHandler;

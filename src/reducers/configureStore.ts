import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import isLoadingReducer from './isLoading/isLoading';
import loginReducer from './login/login';

const rootReducer = combineReducers({
  isLoadingReducer,
  loginReducer,
});

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    loggerMiddleware,
  ),
);

export type storeTypes = ReturnType<typeof rootReducer>;

export default store;

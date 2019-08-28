import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import isLoadingReducer from './isLoading/isLoading';
import loginReducer from './login/login';
import chatRoomsReducer from './chatRooms/chatRooms';

const rootReducer = combineReducers({
  isLoadingReducer,
  loginReducer,
  chatRoomsReducer,
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

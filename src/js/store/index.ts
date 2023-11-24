//@ts-ignore
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appSettingsReducer } from './appSettings/reducers';
import { appStateReducer } from './appState/reducers';
import { mapviewReducer } from './mapview/reducers';
import { createLogger } from 'redux-logger';

const rootReducer = combineReducers({
  appSettings: appSettingsReducer,
  appState: appStateReducer,
  mapviewState: mapviewReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const middlewares: any[] = [];
// Environment specific middlewares configuration
if (process.env.NODE_ENV === 'development' && process.env.DEBUG) {
  // eslint-disable-line no-undef
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;

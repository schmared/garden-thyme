import {
  createStore, combineReducers, compose,
} from 'redux';
import settings from './components/Settings/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => createStore(
  combineReducers({
    settings,
  }),
  undefined,
  composeEnhancers(),
);

export default configureStore;

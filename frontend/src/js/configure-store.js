import {
  createStore, combineReducers, compose,
} from 'redux';
import settings from './components/User/reducer';
import modals from './modal-reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => createStore(
  combineReducers({
    settings,
    modals,
  }),
  undefined,
  composeEnhancers(),
);

export default configureStore;

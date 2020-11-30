import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import UiReducer from './ui';


const store = createStore(combineReducers({
   UI: UiReducer
}), composeWithDevTools());

export default store;

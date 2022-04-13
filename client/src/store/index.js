import { createStore, applyMiddleware, compose } from 'redux';
import data from './states/states';
import rootReducer from './Reducers';

const initialState = {
    data: data,
};
const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);

export default store;
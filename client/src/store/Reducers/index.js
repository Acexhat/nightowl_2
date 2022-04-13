import { combineReducers } from 'redux';

// Import reducers
import mainReducer from './mainReducer';

// Combine all reducers to one
const rootReducer = combineReducers({
    data: mainReducer,
});

export default rootReducer;
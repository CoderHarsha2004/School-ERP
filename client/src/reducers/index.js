import { combineReducers } from 'redux';
import authReducer from './authReducer';
import feesReducer from './feesReducer';
import facultyReducer from './facultyReducer';
import studentReducer from './studentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  fees: feesReducer,
  faculty: facultyReducer,
  student: studentReducer,
});

export default rootReducer;

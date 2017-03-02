import { combineReducers } from 'redux';
import firebaseReducer from './firebase_ducks.jsx';
import drumReducer from './drum_ducks.jsx';
import userReducer from './user_ducks';
import {synthReducer} from './synth_ducks.jsx';

export default combineReducers({
  drums: drumReducer,
  synth: synthReducer,
  firebase: firebaseReducer,
  user: userReducer
});

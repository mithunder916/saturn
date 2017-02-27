import { combineReducers } from 'redux';
import reducer from './reducer.jsx';
import drumReducer from './drum_ducks.jsx';
import {synthReducer} from './synth_ducks.jsx';

export default combineReducers({
  reducer,
  // drums: drumReducer,
  synth: synthReducer
});

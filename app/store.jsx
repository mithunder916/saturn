import { createStore, applyMiddleware } from 'redux'
import rootReducer from './ducks'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const logger = createLogger()

const store = createStore(rootReducer, applyMiddleware(logger, thunkMiddleware));

export default store;

// write reducers for some of these params
// divide by instrument
// have effects be individual dumb components with stateful containers that pass down props; give containers local state storing whether or not they're on
// let audioSettings = {
//   hihat: "0",
//   snare: "0",
//   kick: "0",
//   hihatvol: 5,
//   snarevol: 5,
//   kickvol: 5,
//   bassvol: 3,
//   rootFreq: 220.0,
//   bassFreq: 55.0,
//   currentOctave: 3,
//   effects: {
//     bitcrusher: "off",
//     freeverb: "off",
//     autofilter: "off",
//     phaser: "off",
//     chorus: "off"
//   }
// }

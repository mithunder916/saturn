/* -----------------    ACTIONS     ------------------ */
export const SET_WAVEFORM = 'SET_WAVEFORM';
export const SET_ATTACK = 'SET_ATTACK';
export const SET_DECAY = 'SET_DECAY';
export const SET_SUSTAIN = 'SET_SUSTAIN';
export const SET_RELEASE = 'SET_RELEASE';

/* ------------   ACTION CREATORS     ----------------- */
// oscNum denotes which oscillator should be modified
export const setWaveform = (shape, oscNum) => ({
  type: SET_WAVEFORM,
  oscNum,
  shape
})

export const setAttack = attack => {
  return {
    type: SET_ATTACK,
    attack
  }
}

export const setDecay = decay => {
  return {
    type: SET_DECAY,
    decay
  }
}

export const setSustain = sustain => ({
    type: SET_SUSTAIN,
    sustain
})

export const setRelease = release => {
  return {
    type: SET_RELEASE,
    release
  }
}

/* -------------       REDUCER     ------------------- */
// initial synth settings go here
const initialState = {
  attack: 0.8,
  decay: 0.1,
  sustain: 0.5,
  release: 3,
  oscillator1: {
    'shape': "triangle"
  },
  oscillator2: {
    'shape': "custom"
  },
  oscillator3: {
    'shape': "square"
  }
}

export const synthReducer = (state = initialState, action) => {
  // this variable must be accessed using bracket notation in order to be interpreted
  switch (action.type) {
    case SET_WAVEFORM:
      let oscillator = `oscillator${action.oscNum}`;
      return Object.assign({}, state, {[oscillator]:
        Object.assign({}, state[oscillator], {shape: action.shape})
      });
    case SET_ATTACK:
      return Object.assign({}, state, {attack: action.attack});
    case SET_DECAY:
      return Object.assign({}, state, {decay: action.decay});
    case SET_SUSTAIN:
      return Object.assign({}, state, {sustain: action.sustain});
    case SET_RELEASE:
      return Object.assign({}, state, {release: action.release});
    default:
      return state;
  }
}
// export const synthReducer = (state = initialState, action) => {
//   let oscillator = `oscillator${action.oscNum}`;
//   // this variable must be accessed using bracket notation in order to be interpreted
//   switch (action.type) {
//     case SET_WAVEFORM:
//       return Object.assign({}, state, {[oscillator]:
//         Object.assign({}, state[oscillator], {shape: action.shape})
//       });
//     case SET_ATTACK:
//       return Object.assign({}, state, {[oscillator]:
//         Object.assign({}, state[oscillator], {attack: action.attack})
//       });
//     case SET_DECAY:
//       return Object.assign({}, state, {[oscillator]:
//         Object.assign({}, state[oscillator], {decay: action.decay})
//       });
//     case SET_SUSTAIN:
//       return Object.assign({}, state, {[oscillator]:
//         Object.assign({}, state[oscillator], {sustain: action.sustain})
//       });
//     case SET_RELEASE:
//       return Object.assign({}, state, {[oscillator]:
//           Object.assign({}, state[oscillator], {release: action.release})
//         });
//     default:
//       return state;
//   }
// }

/* -----------------    ACTIONS     ------------------ */
export const SET_WAVEFORM = 'SET_WAVEFORM';
export const SET_ATTACK = 'SET_ATTACK';
export const SET_DECAY = 'SET_DECAY';
export const SET_SUSTAIN = 'SET_SUSTAIN';
export const SET_RELEASE = 'SET_RELEASE';
export const SET_FREQUENCY = 'SET_FREQUENCY';
export const SET_RESONANCE = 'SET_RESONANCE';
export const SET_OSC_VOLUMES = 'SET_OSC_VOLUMES';
export const SET_MASTER_VOLUME = 'SET_MASTER_VOLUME';
export const SET_PRESET = 'SET_PRESET';


/* ------------   ACTION CREATORS     ----------------- */
// oscNum denotes which oscillator should be modified
export const setWaveform = (shape, oscNum) => ({
  type: SET_WAVEFORM,
  oscNum,
  shape
})

export const setAttack = attack => ({
  type: SET_ATTACK,
  attack
})

export const setDecay = decay => ({
  type: SET_DECAY,
  decay
})

export const setSustain = sustain => ({
    type: SET_SUSTAIN,
    sustain
})

export const setRelease = release => ({
  type: SET_RELEASE,
  release
})

export const setFrequency = frequency => ({
  type: SET_FREQUENCY,
  frequency
})

export const setResonance = resonance => ({
  type: SET_RESONANCE,
  resonance
})

export const setOscVolume = volumeArray => ({
  type: SET_OSC_VOLUMES,
  volumeArray
})

export const setMasterVolume = volume => ({
  type: SET_MASTER_VOLUME,
  volume
})

export const setPreset = preset => ({
  type: SET_PRESET,
  preset
})

/* -------------       REDUCER     ------------------- */
// initial synth settings go here
const initialState = {
  attack: 0.8,
  decay: 0.1,
  sustain: 0.5,
  release: 3,
  frequency: 1000,
  resonance: 1,
  volume: 1,
  oscillator1: {
    'shape': "triangle",
    volume: -60
  },
  oscillator2: {
    'shape': "custom",
    volume: -60
  },
  oscillator3: {
    'shape': "square",
    volume: -60
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
    case SET_FREQUENCY:
      return Object.assign({}, state, {frequency: action.frequency});
    case SET_RESONANCE:
      return Object.assign({}, state, {resonance: action.resonance});
    case SET_OSC_VOLUMES:
      return Object.assign({}, state,
        {oscillator1: Object.assign({}, state['oscillator1'], {volume: action.volumeArray[0]})},
        {oscillator2: Object.assign({}, state['oscillator2'], {volume: action.volumeArray[1]})},
        {oscillator3: Object.assign({}, state['oscillator3'], {volume: action.volumeArray[2]})});
    case SET_MASTER_VOLUME:
      return Object.assign({}, state, {volume: action.volume});
    case SET_PRESET:
      return Object.assign({}, action.preset)
    default:
      return state;
  }
}

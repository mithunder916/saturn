// object within which settings are stored
let audioSettings = {
  hihat: "0",
  snare: "0",
  kick: "0",
  hihatvol: 5,
  snarevol: 5,
  kickvol: 5,
  bassvol: 3,
  rootFreq: 220.0,
  bassFreq: 55.0,
  // currentScale: modeFunctions.major,
  currentOctave: 3,
  effects: {
    bitcrusher: "off",
    freeverb: "off",
    autofilter: "off",
    phaser: "off",
    chorus: "off"
  }
}

export default audioSettings;

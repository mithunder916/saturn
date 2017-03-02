import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import Dial from './Dial.jsx';
import Slider from './Slider.jsx';
import { Selector } from './Selector.jsx';
import MultiSlider from './MultiSlider.jsx';
import { setWaveform, setAttack, setDecay, setSustain, setRelease, setFrequency, setResonance, setOscVolume, setMasterVolume } from '../ducks/synth_ducks.jsx';

// is there a better place to declare this? I didn't want to put it on state bc changing it would cause a re-render
let keysAllowed = {},
    polySynth, polySynth2, polySynth3, synthFilter, synthGain,
    polySynths = [polySynth, polySynth2, polySynth3];

class Synth extends Component {
  constructor(props){
    super(props)
    const { synth } = this.props;
    // initializes Tone synths
    polySynth = new Tone.PolySynth(6, Tone.Synth, {
      "oscillator" : {
        "partials" : [0, 2, 3, 4],
        "type": synth.oscillator1.shape
      },
      "envelope": {
        'attack': synth.attack,
        'decay': synth.decay,
        'sustain': synth.sustain,
        'release': synth.release
      },
      "volume": -60
    });

    polySynth2 = new Tone.PolySynth(6, Tone.Synth, {
      "oscillator" : {
        "partials" : [0, 2, 3, 4],
        "type": synth.oscillator2.shape
      },
      "envelope": {
        'attack': synth.attack,
        'decay': synth.decay,
        'sustain': synth.sustain,
        'release': synth.release
      },
      "volume": -60
    });

    polySynth3 = new Tone.PolySynth(6, Tone.Synth, {
      "oscillator" : {
        "partials" : [0, 2, 3, 4],
        "type": synth.oscillator3.shape
      },
      "envelope": {
        'attack': synth.attack,
        'decay': synth.decay,
        'sustain': synth.sustain,
        'release': synth.release
      },
      "volume": -60
    });

    polySynths = [polySynth, polySynth2, polySynth3]

    synthFilter = new Tone.Filter({
      type: 'highpass',
      frequency: synth.frequency,
      rolloff: -12,
      Q: synth.resonance
    })

    synthGain = new Tone.Volume(1)

    polySynths.forEach(synth => synth.chain(synthFilter, synthGain, Tone.Master));

    this.playOrReleaseNote = this.playOrReleaseNote.bind(this);
    this.changeRouter = this.changeRouter.bind(this);
  }

  // work into loadPreset functionality?
  updateSynths(){
    let time3 = performance.now()
    const { synth } = this.props;
    // call set here
    polySynth.set({
      "oscillator" : {
        "partials" : [0, 2, 3, 4],
        "type": synth.oscillator1.shape
      },
      "envelope": {
        'attack': synth.attack,
        'decay': synth.decay,
        'sustain': synth.sustain,
        'release': synth.release
      },
      "volume": -60
    })

    polySynth2.set({
      "oscillator" : {
        "partials" : [0, 2, 3, 4],
        "type": synth.oscillator2.shape
      },
      "envelope": {
        'attack': synth.attack,
        'decay': synth.decay,
        'sustain': synth.sustain,
        'release': synth.release
      },
      "volume": -60
    })

    polySynth3.set({
      "oscillator" : {
        "partials" : [0, 2, 3, 4],
        "type": synth.oscillator3.shape
      },
      "envelope": {
        'attack': synth.attack,
        'decay': synth.decay,
        'sustain': synth.sustain,
        'release': synth.release
      },
      "volume": -60
    })

    polySynths = [polySynth, polySynth2, polySynth3]
    let time4 = performance.now()
    console.log('TIME', time4 - time3);
  }

  // module: oscillator, envelope (might not be necessary)
  // param: attack, type, partials
  // value: number, etc. depends on param
  changeAllOsc(module, param, value){
    // let time1 = performance.now();
    polySynths.forEach(synth => synth.set({[module]: {[param]: value}}))
    // console.log(polySynths)
    // let time2 = performance.now()
    // console.log('TIME', time2 - time1);
  }

  // for controls that only modify one synth; NOT CURRENTLY USING, possible unneeded
  changeOneOsc(synthNum, module, param, value){
    if (synthNum === 1) polySynth.set({[module]: {[param]: value}})
    else if (synthNum === 2) polySynth2.set({[module]: {[param]: value}})
    else polySynth3.set({[module]: {[param]: value}})
  }

  // param: frequency, Q, or type(hi/lowpass, etc.)
  changeFilter(param, value){
    // synthFilter.set({[module]: value})
    synthFilter[param].value = value
  }

  changeVolume(value){
    synthGain.volume.value = value;
  }

  // since Selector components are set to only pass event to their function, they can't use a change router function
  changeOscWave(event){
    if (event.target.name === 'Osc1') polySynth.set({oscillator: {type: event.target.value}});
    else if (event.target.name === 'Osc2') polySynth2.set({oscillator: {type: event.target.value}});
    else if (event.target.name === 'Osc3') polySynth3.set({oscillator: {type: event.target.value}})
  }

  //RENAME TO AVOID CONFUSION W/ DISPATCH METHOD
  changeOscVolume(volumeArray){
    polySynths.forEach((synth, index) => synth.set({volume: volumeArray[index]}))
  }

  // based on type, calls a different function
  // arguments are sequenced in order of most -> least essential, since they will be spread later on
  changeRouter(value, type, param, module, synthNum){
    if (type === 'multi') this.changeAllOsc(module, param, value);
    else if (type === 'single') this.changeOneOsc(synthNum, module, param, value);
    else if (type === 'filter') this.changeFilter(param, value);
    else if (type === 'volume') this.changeVolume(value)
  }

  playOrReleaseNote(note, action, visualKey){
    if (action === 'attack') {
      polySynths.forEach(synth => synth.triggerAttack(note, null, 30));
    }
    else if (action === 'release') {
      polySynths.forEach(synth => synth.triggerRelease(note));
    }
    synth.toggle(synth.keys[visualKey]);
  }

  playNote(event){
    // use for computer keyboard - do keyDown events measure velocity?
    // prevents Tab from shifting focus
    if (event.key === 'Tab') event.preventDefault();
    // since keyDown events eventually re-trigger when a key is held down, storing them in an object and using this check will prevent the note from interrupting/replaying
    if (keysAllowed[event.key] === false) return;
    keysAllowed[event.key] = false;
    // based on event.key => toggle a certain synth.key (visual), and play a certain note using Tone
    switch (event.key){
      case 'Tab': this.playOrReleaseNote('C3', 'attack', 0)
                  break;
      case 'q': this.playOrReleaseNote('D3', 'attack', 2)
                break;
      case 'w': this.playOrReleaseNote('E3', 'attack', 4)
                break;
      case 'e': this.playOrReleaseNote('F3', 'attack', 5)
                break;
      case 'r': this.playOrReleaseNote('G3', 'attack', 7)
                break;
      case 't': this.playOrReleaseNote('A3', 'attack', 9)
                break;
      case 'y': this.playOrReleaseNote('B3', 'attack', 11)
                break;
      case 'u': this.playOrReleaseNote('C4', 'attack', 12)
                break;
      case 'i': this.playOrReleaseNote('D4', 'attack', 14)
                break;
      case 'o': this.playOrReleaseNote('E4', 'attack', 16)
                break;
      case 'p': this.playOrReleaseNote('F4', 'attack', 17)
                break;
      case '[': this.playOrReleaseNote('G4', 'attack', 19)
                break;
      case ']': this.playOrReleaseNote('A4', 'attack', 21)
                break;
      case '\\': this.playOrReleaseNote('B4', 'attack', 23)
                break;
      case '1': this.playOrReleaseNote('Db3', 'attack', 1)
                break;
      case '2': this.playOrReleaseNote('Eb3', 'attack', 3)
                break;
      case '4': this.playOrReleaseNote('Gb3', 'attack', 6)
                break;
      case '5': this.playOrReleaseNote('Ab3', 'attack', 8)
                break;
      case '6': this.playOrReleaseNote('Bb3', 'attack', 10)
                break;
      case '8': this.playOrReleaseNote('Db4', 'attack', 13)
                break;
      case '9': this.playOrReleaseNote('Eb4', 'attack', 15)
                break;
      case '-': this.playOrReleaseNote('Gb4', 'attack', 18)
                break;
      case '=': this.playOrReleaseNote('Ab4', 'attack', 20)
                break;
      case 'Backspace': this.playOrReleaseNote('Bb4', 'attack', 22)
                break;
      default: console.log(event.key)
    }
  }

  releaseNote(event){
    switch (event.key){
      case 'Tab': this.playOrReleaseNote('C3', 'release', 0)
                  break;
      case 'q': this.playOrReleaseNote('D3', 'release', 2)
                break;
      case 'w': this.playOrReleaseNote('E3', 'release', 4)
                break;
      case 'e': this.playOrReleaseNote('F3', 'release', 5)
                break;
      case 'r': this.playOrReleaseNote('G3', 'release', 7)
                break;
      case 't': this.playOrReleaseNote('A3', 'release', 9)
                break;
      case 'y': this.playOrReleaseNote('B3', 'release', 11)
                break;
      case 'u': this.playOrReleaseNote('C4', 'release', 12)
                break;
      case 'i': this.playOrReleaseNote('D4', 'release', 14)
                break;
      case 'o': this.playOrReleaseNote('E4', 'release', 16)
                break;
      case 'p': this.playOrReleaseNote('F4', 'release', 17)
                break;
      case '[': this.playOrReleaseNote('G4', 'release', 19)
                break;
      case ']': this.playOrReleaseNote('A4', 'release', 21)
                break;
      case '\\': this.playOrReleaseNote('B4', 'release', 23)
                break;
      case '1': this.playOrReleaseNote('Db3', 'release', 1)
                break;
      case '2': this.playOrReleaseNote('Eb3', 'release', 3)
                break;
      case '4': this.playOrReleaseNote('Gb3', 'release', 6)
                break;
      case '5': this.playOrReleaseNote('Ab3', 'release', 8)
                break;
      case '6': this.playOrReleaseNote('Bb3', 'release', 10)
                break;
      case '8': this.playOrReleaseNote('Db4', 'release', 13)
                break;
      case '9': this.playOrReleaseNote('Eb4', 'release', 15)
                break;
      case '-': this.playOrReleaseNote('Gb4', 'release', 18)
                break;
      case '=': this.playOrReleaseNote('Ab4', 'release', 20)
                break;
      case 'Backspace': this.playOrReleaseNote('Bb4', 'release', 22)
                break;
      default: console.log(event.key)
    }
    // resets key so that it can be played again
    keysAllowed[event.key] = true;
  }

  // gives nx keyboard focus, so that it can register keydown/keyup events
  attachFocus(element){
    if (element){
      element.setAttribute("tabIndex", '1');
      element.focus()
    }
  }

// refactor ASDR into multislider?
// refactor by mapping through arrays for Selectors and Dials?
  render(){
    const { nxDefine } = this.props;
    return (
      <div className='synthContainer'>
        <div className='waveFormSelectors'>
          <Selector
          name='Osc1'
          changeOption={this.changeOscWave}
          options={['square', 'triangle', 'sawtooth', 'sine', 'custom']}
          defaultValue={'triangle'}
          dispatcher={this.props.changeWaveform} />
          <Selector
          name='Osc2'
          changeOption={this.changeOscWave}
          options={['square', 'triangle', 'sawtooth', 'sine', 'custom']}
          defaultValue={'custom'}
          dispatcher={this.props.changeWaveform} />
          <Selector
          name='Osc3'
          changeOption={this.changeOscWave}
          options={['square', 'triangle', 'sawtooth', 'sine', 'custom']}
          defaultValue={'square'}
          dispatcher={this.props.changeWaveform} />
          <MultiSlider
          nxDefine={nxDefine}
          id='oscVolume'
          dispatcher={this.props.changeOscVolumes}
          change={this.changeOscVolume}
           />
        </div>
        <div className='envelopeContainer'>
          <Dial nxDefine={nxDefine}
                dispatcher={this.props.changeAttack}
                changeRouter={this.changeRouter}
                args={['multi', 'attack', 'envelope']}
                range={[0.3, 4]}
                id='attackMod' />
          <Dial nxDefine={nxDefine}
                dispatcher={this.props.changeDecay}
                changeRouter={this.changeRouter}
                args={['multi', 'decay', 'envelope']}
                range={[0.3, 4]}
                id='decayMod' />
          <Dial nxDefine={nxDefine}
                dispatcher={this.props.changeSustain}
                changeRouter={this.changeRouter}
                args={['multi', 'sustain', 'envelope']}
                range={[0.1, 1]}
                id='sustainMod' />
          <Dial nxDefine={nxDefine}
                dispatcher={this.props.changeRelease}
                changeRouter={this.changeRouter}
                args={['multi', 'release', 'envelope']}
                range={[0.3, 8]}
                id='releaseMod' />
        </div>
        <div className='filterContainer'>
          <Dial nxDefine={nxDefine}
                dispatcher={this.props.changeFrequency}
                changeRouter={this.changeRouter}
                args={['filter', 'frequency']}
                range={[100, 1200]}
                id='frequencyMod' />
          <Dial nxDefine={nxDefine}
                dispatcher={this.props.changeResonance}
                changeRouter={this.changeRouter}
                args={['filter', 'Q']}
                range={[0.1, 6]}
                id='resonanceMod' />
        </div>
          <canvas
          data-type="keyboard"
          id="synth"
          ref={(canvas) => {
            nxDefine(canvas);
            this.attachFocus(canvas)
            }}
          onKeyDown={(e) => this.playNote(e)}
          onKeyUp={(e) => this.releaseNote(e)}>
        </canvas>
        <Slider nxDefine={nxDefine}
                dispatcher={this.props.changeMasterVolume}
                changeRouter={this.changeRouter}
                args={['volume']}
                range={[0, 20]}
                id='synthVolume' />
      </div>
    )
  }
}

/* REDUX CONTAINER */
// remove mapStateToProps? since redux isn't controlling Tone.Synths, do I want this component to re-render upon dispatches?
const mapStateToProps = ({ synth }) => ({ synth })

const mapDispatchToProps = dispatch => ({
  changeAttack: attack => dispatch(setAttack(attack)),
  changeDecay: decay => dispatch(setDecay(decay)),
  changeSustain: sustain => dispatch(setSustain(sustain)),
  changeRelease: release => dispatch(setRelease(release)),
  changeWaveform: (shape, oscNum) => dispatch(setWaveform(shape, oscNum)),
  changeFrequency: frequency => dispatch(setFrequency(frequency)),
  changeResonance: resonance => dispatch(setResonance(resonance)),
  changeOscVolumes: volumeArray => dispatch(setOscVolume(volumeArray)),
  changeMasterVolume: volume => dispatch(setMasterVolume(volume))
})

export default connect(mapStateToProps, mapDispatchToProps)(Synth);

export { polySynth, polySynth2, polySynth3, Synth };

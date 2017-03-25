import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import { adjustToScale } from '../audio_scripts/utils';
import Dial from './Dial.jsx';
import Slider from './Slider.jsx';
import { Selector } from './Selector.jsx';
import MultiSlider from './MultiSlider.jsx';
import Presets from './Presets.jsx';
import { setWaveform, setAttack, setDecay, setSustain, setRelease, setFrequency, setResonance, setOscVolume, setMasterVolume, setPreset } from '../ducks/synth_ducks.jsx';

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
      type: 'lowpass',
      frequency: synth.frequency,
      rolloff: -12,
      Q: synth.resonance
    })

    synthGain = new Tone.Volume(1)

    polySynths.forEach(synth => synth.chain(synthFilter, synthGain, Tone.Master));

    // this.playOrReleaseNote = this.playOrReleaseNote.bind(this);
    this.changeRouter = this.changeRouter.bind(this);
    this.updateSynths = this.updateSynths.bind(this);
  }

  // called by Preset component's loadPreset function
  updateSynths(){
    const { synth } = this.props;

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

    synthFilter.set({
      type: 'lowpass',
      frequency: synth.frequency,
      rolloff: -12,
      Q: synth.resonance
    });

    synthGain.volume.value = synth.volume;

    polySynths = [polySynth, polySynth2, polySynth3]
  }

  // module: oscillator, envelope (might not be necessary)
  // param: attack, type, partials
  // value: number, etc. depends on param
  changeAllOsc(module, param, value){
    polySynths.forEach(synth => synth.set({[module]: {[param]: value}}))
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
    synthGain.volume.value = adjustToScale(value, [-10, 8]);
  }

  // since Selector components are set to only pass event to their function, they can't use a change router function
  changeOscWave(event){
    if (event.target.name === 'Osc1') polySynth.set({oscillator: {type: event.target.value}});
    else if (event.target.name === 'Osc2') polySynth2.set({oscillator: {type: event.target.value}});
    else if (event.target.name === 'Osc3') polySynth3.set({oscillator: {type: event.target.value}})
  }

  //RENAME TO AVOID CONFUSION W/ DISPATCH METHOD
  changeOscVolume(volumeArray){
    polySynths.forEach((synth, index) => {
      let newVol = adjustToScale(volumeArray[index], [-88, -48])
      synth.set({volume: newVol})
    })
  }

  // based on type, calls a different function
  // arguments are sequenced in order of most -> least essential, since they will be spread later on
  changeRouter(value, type, param, module, synthNum){
    if (type === 'multi') this.changeAllOsc(module, param, value);
    else if (type === 'single') this.changeOneOsc(synthNum, module, param, value);
    else if (type === 'filter') this.changeFilter(param, value);
    else if (type === 'volume') this.changeVolume(value)
  }

  static playOrReleaseNote(note, action, visualKey){
    if (action === 'attack') {
      polySynths.forEach(synth => synth.triggerAttack(note, null, 30));
    }
    else if (action === 'release') {
      polySynths.forEach(synth => synth.triggerRelease(note));
    }
    synth.toggle(synth.keys[visualKey]);
  }

  // gives nx keyboard focus, so that it can register keydown/keyup events
  attachFocus(element){
    if (element){
      element.setAttribute("tabIndex", '1');
    }
  }

  render(){
    const { nxDefine, firebase, synth } = this.props;
    return (
      <div className='synthHolder'>
        <div className='synthContainer'>
          <div className='optionsPanel'>
            <div className='waveContainer section'>
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
          <div className='filterContainer section'>
            <box><p>Filter:</p><Dial nxDefine={nxDefine}
                  width='60'
                  dispatcher={this.props.changeFrequency}
                  changeRouter={this.changeRouter}
                  args={['filter', 'frequency']}
                  range={[100, 20000]}
                  id='frequencyMod' /></box>
            <box><p>Res:</p><Dial nxDefine={nxDefine}
                  width='60'
                  dispatcher={this.props.changeResonance}
                  changeRouter={this.changeRouter}
                  args={['filter', 'Q']}
                  range={[0.1, 7]}
                  id='resonanceMod' /></box>
          </div>
          <div className='envelopeContainer section'>
            <quarter><p>A</p><Dial nxDefine={nxDefine}
                  width='40'
                  dispatcher={this.props.changeAttack}
                  changeRouter={this.changeRouter}
                  args={['multi', 'attack', 'envelope']}
                  range={[0.3, 6]}
                  id='attackMod' /></quarter>
            <quarter><p>D</p><Dial nxDefine={nxDefine}
                  width='40'
                  dispatcher={this.props.changeDecay}
                  changeRouter={this.changeRouter}
                  args={['multi', 'decay', 'envelope']}
                  range={[0.3, 6]}
                  id='decayMod' /></quarter>
            <quarter><p>S</p><Dial nxDefine={nxDefine}
                  width='40'
                  dispatcher={this.props.changeSustain}
                  changeRouter={this.changeRouter}
                  args={['multi', 'sustain', 'envelope']}
                  range={[0.1, 1]}
                  id='sustainMod' /></quarter>
            <quarter><p>R</p><Dial nxDefine={nxDefine}
                  width='40'
                  dispatcher={this.props.changeRelease}
                  changeRouter={this.changeRouter}
                  args={['multi', 'release', 'envelope']}
                  range={[0.3, 8]}
                  id='releaseMod' /></quarter>
          </div>
          <div className='volumeContainer section'>
            <p>VOL:</p>
            <Slider nxDefine={nxDefine}
                    dispatcher={this.props.changeMasterVolume}
                    changeRouter={this.changeRouter}
                    args={['volume']}
                    range={[0, 1]}
                    id='synthVolume' />
          </div>
        </div>
        <canvas
          data-type="keyboard"
          id="synth"
          ref={(canvas) => {
            nxDefine(canvas);
            this.attachFocus(canvas)
            }}>
        </canvas>
        </div>
        <Presets firebase={firebase}
            synth={synth}
            updateSynths={this.updateSynths}
            changePreset={this.props.changePreset}
            />
        <div className="help-tip">
	        <p>Use your keyboard to play the synth. The QWERTY row plays the white keys, while the numbers above it control the black keys. Or plug in a MIDI USB controller and reload the page!</p>
        </div>
      </div>
    )
  }
}

/* REDUX CONTAINER */
// remove mapStateToProps? since redux isn't controlling Tone.Synths, do I want this component to re-render upon dispatches?
const mapStateToProps = ({ synth, firebase }) => ({ synth, firebase })

const mapDispatchToProps = dispatch => ({
  changeAttack: attack => dispatch(setAttack(attack)),
  changeDecay: decay => dispatch(setDecay(decay)),
  changeSustain: sustain => dispatch(setSustain(sustain)),
  changeRelease: release => dispatch(setRelease(release)),
  changeWaveform: (shape, oscNum) => dispatch(setWaveform(shape, oscNum)),
  changeFrequency: frequency => dispatch(setFrequency(frequency)),
  changeResonance: resonance => dispatch(setResonance(resonance)),
  changeOscVolumes: volumeArray => dispatch(setOscVolume(volumeArray)),
  changeMasterVolume: volume => dispatch(setMasterVolume(volume)),
  changePreset: preset => dispatch(setPreset(preset))
})

export default connect(mapStateToProps, mapDispatchToProps)(Synth);

export { polySynth, polySynth2, polySynth3, Synth };

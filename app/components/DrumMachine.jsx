import React, { Component } from 'react';
import Tone from 'tone';
import { connect } from 'react-redux';
import Dial from './Dial.jsx';
import Slider from './Slider.jsx';
import { Selector } from './Selector.jsx';
import loop, { realignView } from '../audio_scripts/loop';
import { setTempo, setVolume, setColumns, addRow } from '../ducks/drum_ducks.jsx';
import { adjustToScale } from '../audio_scripts/utils';

let drum, drumGain, rowNum = 3;

class DrumMachine extends Component {
  constructor(props){
    super(props)

    this.state = {
      columns: props.drums.numColumns,
      loop: loop,
      rows: props.drums.rows,
      types: props.drums.types,
      patterns: []
    }

    drum = new Tone.MultiPlayer({
    urls : {
      "hihat0" : "samples/hihat.wav",
      "hihat1" : "samples/hihat2.wav",
      "hihat2" : "samples/hihat3.wav",
      "snare0": "samples/snare.wav",
      "snare1" : "samples/snare2.wav",
      "snare2" : "samples/snare3.wav",
      "kick0": "samples/kick.wav",
      "kick1" : "samples/kick2.wav",
      "kick2" : "samples/kick3.wav",
      "clap0": "samples/clap1.wav",
      "crash0" : "samples/crash1.wav",
      "ride0" : "samples/ride1.wav",
      "rimshot0": "samples/rimshot1.wav",
      "shaker0" : "samples/shaker1.wav",
      "tom0" : "samples/tom1.wav"
    },
    volume : -48,
    fadeOut : 0.1,
  }).toMaster();

    Tone.Transport.bpm.value = this.props.drums.tempo;

    drumGain = new Tone.Volume(1);
    drum.chain(drumGain, Tone.Master);

    this.removeRow = this.removeRow.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  // make local state params for selecting sample and volume
  triggerDrums(drumMatrix, time, col){
    const { columns, types } = this.state;
    let column = drumMatrix.matrix[col];
    for (let i = 0; i < columns; i++) {
      // modify to include sample select and accents
      console.log('TYPEs', types)
      column.forEach((box, i) => {
        if (box === 1){
          drum.start(types[i] + '0', time, 0, '16n', 0, 5);
        }
      })
    }
    drumMatrix.place = col;
  }

  changeTempo(tempo){
    Tone.Transport.bpm.value = tempo;
  }

  changeVolume(volume){
    drumGain.volume.value = adjustToScale(volume, [-10, 8]);
  }

  newLoop(cols){
    // can't adjust events array inside existing loop. must create a new one?
    // refactor using .set?
    this.setState({loop: new Tone.Sequence((time, col) => {
      this.triggerDrums(drumMatrix, time, col);

      if (col === cols - 1) {
          realignView(drumMatrix);
      }
    }, [...Array(Number(cols)).keys()], "16n")
  })
  }

  updateRows(add, type){
    if (add && this.state.rows < 9) {
      this.setState({rows: this.state.rows + 1, types: [...this.state.types, type]});
      // console.log(this.state.types)
    } else if (!add && this.state.rows > 3) {
      let newTypes = this.state.types.filter((el, i) => i !== type);
      // console.log(newTypes);
      this.setState({rows: this.state.rows - 1, types: newTypes})
    }
  }

  // creates new icon and svg and appends to DOM
  addRow(e){
    // let rowNum = this.state.rows;
    e.preventDefault();
    let newType = e.target.drumType.value;

    if (this.state.rows < 9) {
      let newRow = document.createElement('iconRow'),
          newIcon = document.createElement('object'),
          newButton = document.createElement('removeButton');
      newIcon.setAttribute('type', 'image/svg+xml');
      newIcon.setAttribute('data', 'public/style/svgs/' + newType + '.svg');
      newButton.innerHTML = 'X';
      newButton.setAttribute('id', 'icon' + (++rowNum).toString())
      newButton.addEventListener('click', (e) => {this.removeRow(e)})
      newRow.appendChild(newIcon);
      newRow.appendChild(newButton);
      document.getElementById('drumIcons').appendChild(newRow);
    }

    this.updateRows(true, newType);
  }

// finds index of current row and passes it to updateRows, which uses it to remove the matching type
  removeRow(e){
    let iconRows = document.getElementById('drumIcons').childNodes,
        currentRow = e.target.parentNode,
        typeIndex = [...iconRows].findIndex((row) => row === currentRow);

    e.target.removeEventListener('click', (e) => {this.removeRow(e)});
    currentRow.remove();

    this.updateRows(false, typeIndex);
  }

  // ref callback on drumIcons container; sets width for all icons
  adjustWidth(element){
    if (element){
      // sets width of icons to two-thirds of iconRow size, which is inside a flex box
      let iconWidth = (260 / (this.state.rows)) * (2/3);

      [...element.children].forEach(iconRow => {
        iconRow.firstChild.setAttribute('width', iconWidth);
      })
    }
  }

  // add firebase
  savePattern(){
    this.setState({patterns: [...this.state.patterns, drumMatrix.matrix]});
    console.log(this.state.patterns)
  }

  updateColumns(event){
    // updates columns on the matrix, and calls newLoop, which creates a new loop with a corresponding number of events (steps)
    this.stopSequence();
    this.setState({columns: event.target.value});
    this.newLoop(event.target.value);
  }

  componentDidUpdate(){
    drumMatrix.col = this.state.columns;
    drumMatrix.row = this.state.rows;
    drumMatrix.init();
  }

  startSequence(){
    Tone.Transport.start();
    this.state.loop.start()
  }

  stopSequence(){
    Tone.Transport.stop();
    // without this next line, multiple loops will trigger when the loop starts again; how to delete the old loops
    this.state.loop.stop();
    drumMatrix.stop();
  }

// add selectors for what type of row to add
  render(){
    const { nxDefine } = this.props;
    const options = ['hihat', 'snare', 'kick', 'tom', 'ride', 'crash', 'shaker', 'rimshot', 'clap']

    console.log(drum)
    return (
      <div className='drumContainer'>
        <div className='drumRow'>
          <div id='iconContainer'>
            <div
            id='drumIcons'
            ref={(el) => {this.adjustWidth(el)}}>
              <iconRow>
                <object
                type="image/svg+xml"
                data="public/style/svgs/hihat.svg"
                 />
              </iconRow>
              <iconRow>
                <object
                type="image/svg+xml" data="public/style/svgs/snare.svg"  />
              </iconRow>
              <iconRow>
                <object
                type="image/svg+xml" data="public/style/svgs/kick.svg"
                 />
              </iconRow>
            </div>
          </div>
          <div id='drumMatrixContainer'>
            <canvas
              data-type="matrix"
              id="drumMatrix"
              height="260"
              width="600"
              ref={(canvas) => {nxDefine(canvas)}}>
            </canvas>
          </div>
          <div id='drumControls'>
            <p>TEMPO:</p>
            <Dial nxDefine={nxDefine}
                  width='60'
                  changeRouter={this.changeTempo}
                  dispatcher={this.props.setTempo}
                  range={['60', '200']}
                  args={[]}
                  id='tempoMod'
                  />
            <p>VOL:</p>
            <Slider nxDefine={nxDefine}
                    args={['volume']}
                    range={[0, 1]}
                    changeRouter={this.changeVolume}
                    dispatcher={this.props.setVolume}
                    id='drumVolume' />
          </div>
        </div>
        <div className='drumRow'>
          <div id='loopControls'>
            <Selector
              name='Beats'
              value={this.state.columns}
              changeOption={(e) => this.updateColumns(e)}
              options={['4','8','12','16','24','32']} />
            <form
              onSubmit={(e) => this.addRow(e)}
              id='addRow'
              >
              <input
                type="submit"
                value="ADD ROW" />
              <select name="drumType" form="addRow">
                {options && options.map(type => {
                  return (
                    <option
                    value={type}
                    key={type.toString()}>{type}</option>
                  )
                })}
              </select>
            </form>
            <div className='controlButtons'>
              <button onClick={() => this.startSequence()}>START</button>
              <button onClick={() => this.stopSequence()}>STOP</button>
            </div>
          </div>
          <div id='accents'>

          </div>
        </div>
      </div>
    )
  }
}

// make tempo set function and dispatch/redux for drums

/* REDUX CONTAINER */
const mapStateToProps = ({ drums }) => ({ drums });
const mapDispatchToProps = dispatch => ({
  setTempo: tempo => dispatch(setTempo(tempo)),
  setVolume: volume => dispatch(setVolume(volume))
 })

export default connect(mapStateToProps, mapDispatchToProps)(DrumMachine);

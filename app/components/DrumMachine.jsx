import React, { Component } from 'react';
import Tone from 'tone';
import { connect } from 'react-redux';
import Dial from './Dial.jsx';
import loop, { realignView } from '../audio_scripts/loop';
import { setTempo, setColumns, addRow } from '../ducks/drum_ducks.jsx';
import { Selector } from './Selector.jsx';

let drum;

class DrumMachine extends Component {
  constructor(props){
    super(props)

    this.state = {
      columns: props.drums.numColumns,
      loop: loop,
      rows: props.drums.rows,
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
      "kick2" : "samples/kick3.wav"
    },
    volume : -48,
    fadeOut : 0.1,
  }).toMaster();

    Tone.Transport.bpm.value = this.props.drums.tempo;
  }

  // function must change to handle multiple rows
  // make local state params for selecting sample and volume
  triggerDrums(drumMatrix, time, col){
    const { columns } = this.state;
    let column = drumMatrix.matrix[col];
    for (let i = 0; i < columns; i++) {
      if (column[0] === 1) {
        drum.start('hihat' + '0', time, 0, "16n", 0, 5)
      }
      if (column[1] === 1) {
        drum.start('snare' + '0', time, 0, "16n", 0, 5)
      }
      if (column[2] === 1) {
        drum.start('kick' + '0', time, 0, "16n", 0, 5)
      }
    }
    drumMatrix.place = col;
  }

  changeTempo(tempo){
    Tone.Transport.bpm.value = tempo;
  }

  newLoop(cols){
    // can't adjust events array inside existing loop. must create a new one?
    // refactor using .set?
    this.setState({loop: new Tone.Sequence((time, col) => {
      // console.log('COL', col)
      this.triggerDrums(drumMatrix, time, col);

      if (col === cols - 1) {
          realignView(drumMatrix);
      }
    }, [...Array(Number(cols)).keys()], "16n")
  })
  }

  updateRows(add){
    let rowNum = this.state.rows;
    if (add) this.setState({rows: rowNum++})
    else if (!add && rowNum > 2) this.setState({rows: rowNum--})
  }

  // add firebase
  savePattern(){
    this.setState({patterns: [...this.state.patterns, drumMatrix.matrix]});
    console.log(this.state.patterns)
  }

  componentDidUpdate(){
    drumMatrix.col = this.state.columns;
    drumMatrix.init();
  }

  updateColumns(event){
    // updates columns on the matrix, and calls newLoop, which creates a new loop with a corresponding number of events (steps)
    this.stopSequence();
    this.setState({columns: event.target.value});
    this.newLoop(event.target.value);
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
//
  render(){
    const { nxDefine } = this.props;
    return (
      <div>
        <canvas
          data-type="matrix"
          id="drumMatrix"
          height="260"
          width="600"
          ref={(canvas) => {nxDefine(canvas)}}>
          </canvas>
        <Dial nxDefine={nxDefine}
              changeRouter={this.changeTempo}
              dispatcher={this.props.setTempo}
              range={['60', '200']}
              args={[]}
              id='tempoMod'
               />
        <Selector
          name='Subdivision'
          value={this.state.columns}
          changeOption={(e) => this.updateColumns(e)}
          options={['4','8','16','24','32']} />
        <div className='controlButtons'>
          <button onClick={() => this.startSequence()}>START</button>
          <button onClick={() => this.stopSequence()}>STOP</button>
          <button onClick={()=> this.savePattern()}>SAVE LOOP</button>
        </div>
      </div>
    )
  }
}

// make tempo set function and dispatch/redux for drums

/* REDUX CONTAINER */
const mapStateToProps = ({ drums }) => ({ drums });
const mapDispatchToProps = dispatch => ({
  setTempo: tempo => dispatch(setTempo(tempo))
 })

export default connect(mapStateToProps, mapDispatchToProps)(DrumMachine);

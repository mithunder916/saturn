import React, { Component } from 'react';
import Tone from 'tone';
import { connect } from 'react-redux';
import Dial from './Dial.jsx';
import { setTempo, setColumns, addRow } from '../ducks/drum_ducks.jsx';
import { Selector } from './Selector.jsx';

let drums;

class DrumMachine extends Component {
  constructor(props){
    super(props)

    this.state = {
      columns: drums.columns,
      loop: loop,
      rows: drums.rows,
      patterns: drums.patterns
    }

    drums = new Tone.MultiPlayer({
    urls : {
      "hihat0" : "../samples/hihat.wav",
      "hihat1" : "../samples/hihat2.wav",
      "hihat2" : "../samples/hihat3.wav",
      "snare0": "../samples/snare.wav",
      "snare1" : "../samples/snare2.wav",
      "snare2" : "../samples/snare3.wav",
      "kick0": "../samples/kick.wav",
      "kick1" : "../samples/kick2.wav",
      "kick2" : "../samples/kick3.wav"
    },
    volume : -48,
    fadeOut : 0.1,
  }).toMaster();

    Tone.Transport.bpm.value = drums.tempo;
  }

  // function must change to handle multiple rows
  triggerDrums(drumMatrix, time, col){
    const { tempo, numColumns} = this.props;
    let column = drumMatrix.matrix[col];
    for (let i = 0; i < numColumns; i++) {
      if (column[0] === 1) {
        drums.start('hihat' + audioSettings.hihat, time, 0, "16n", 0, audioSettings.hihatvol)
      }
      if (column[1] === 1) {
        drums.start('snare' + audioSettings.snare, time, 0, "16n", 0, audioSettings.snarevol)
      }
      if (column[2] === 1) {
        drums.start('kick' + audioSettings.kick, time, 0, "16n", 0, audioSettings.kickvol)
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
    this.setState({loop: new Tone.Sequence(function(time, col) {
      // console.log('COL', col)
      triggerDrums(drumMatrix, time, col);

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
    drumMatrix.init()
  }

  updateColumns(event){
    // updates columns on the matrix, and calls newLoop, which creates a new loop with a corresponding number of events (steps)
    this.stopSequence();
    this.setState({columns: event.target.value});
    this.newLoop(event.target.value);
    // console.log(this.state.columns) this executes before setState is finished
  }

// add selectors for what type of row to add
//
  render(){
    const { nxDefine } = this.props;
    return (
      <div>
        <canvas
          data-type="matrix"
          id="drumMatrix2"
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

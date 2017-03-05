import React, { Component } from 'react';
import Tone from 'tone';
import { triggerDrums } from '../audio_scripts/drums';
import loop, { realignView } from '../audio_scripts/loop';
import { connect } from 'react-redux';
import Synth from './Synth.jsx';
import { DrumMachine } from './DrumMachine.jsx';
import { MyRecorder } from './Recorder.jsx';
import { Selector } from './Selector.jsx';
import Login from './Login.jsx';
import { midiFunctionality } from '../audio_scripts/midi';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: 16,
      loop: loop,
      patterns: []
    }

    this.nxDefine = this.nxDefine.bind(this);
    this.nxLoad = this.nxLoad.bind(this);
    this.updateColumns = this.updateColumns.bind(this);
    this.savePattern = this.savePattern.bind(this);
  }

  // called by refs' callbacks: sets nx attributes to DOM elements
  nxDefine(element){
    // console.log('nxDefine called on:', element)
    // when re-rendering, the ref callback gets called once with null before getting called with the canvas element
    if (element){
      element.setAttribute("nx", element.dataset.type);
    }
  }

  nxLoad(){
    let columns = this.state.columns;
    nx.onload = function() {
      // console.log('inside nx.onload', drumMatrix)
      oscVolume.setNumberOfSliders(3)
      oscVolume.init()
      drumMatrix.col = columns;
      drumMatrix.row = 3;
      drumMatrix.colors.accent = "#87DEFF";
      drumMatrix.init()
    }
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

  // add loadPattern; how to save data? by database? per user?
  savePattern(){
    this.setState({patterns: [...this.state.patterns, drumMatrix.matrix]});
    console.log(this.state.patterns)
  }

  updateColumns(event){
    // updates columns on the matrix, and calls newLoop, which creates a new loop with a corresponding number of events (steps)
    this.stopSequence();
    this.setState({columns: event.target.value});
    this.newLoop(event.target.value);
    // console.log(this.state.columns) this executes before setState is finished
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

  componentDidMount(){
    this.nxLoad();
    // allows MIDI keyboard functionality
    midiFunctionality();
  }

  componentDidUpdate(){
    // console.log('inside did update, LOOP:', this.state.loop)
    drumMatrix.col = this.state.columns;
    drumMatrix.init()
  }

  render() {
    // console.log("MASTER", Tone.Master.context)
    // console.log("SECOND", Tone.Master.context.destination)

    return (
      <div>
        <Login />
        <div className='drumContainer'>
          <canvas
          data-type="matrix"
          id="drumMatrix"
          label="Drum Machine"
          ref={(canvas) => {this.nxDefine(canvas)}}>
          </canvas>
          {/*<DrumMachine nxDefine={this.nxDefine}/>*/}
          <div className='controlButtons'>
            <button onClick={() => this.startSequence()}>START</button>
            <button onClick={() => this.stopSequence()}>STOP</button>
            <button onClick={()=> this.savePattern()}>SAVE LOOP</button>
          </div>
          <Selector
          name='Subdivision'
          value={this.state.columns}
          changeOption={(e)=>this.updateColumns(e)}
          options={['4','8','16','24','32']} />
        </div>
        <Synth nxDefine={this.nxDefine} />
        <MyRecorder />
      </div>
    )
  }
}
/* REDUX CONTAINER */

// const mapStateToProps = ({ }) => ({ })

// const mapDispatchToProps = dispatch => ({
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;

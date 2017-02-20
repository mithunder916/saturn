import React, { Component } from 'react';
import Tone from 'tone';
import { triggerDrums } from '../drums';
import { realignView } from '../loop';
import loop from '../loop.js';
import { connect } from 'react-redux';
import { exampleUpdate } from '../ducks/rename';
import { Synth } from './Synth.jsx';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: 16,
      loop: loop
    }

    this.nxDefine = this.nxDefine.bind(this);
    this.nxLoad = this.nxLoad.bind(this);
    this.updateColumns = this.updateColumns.bind(this)
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
    [drumMatrix].forEach(matrix => matrix.stop())
  }

  updateColumns(event){
    // updates columns on the matrix, and calls newLoop, which creates a new loop with a corresponding number of events (steps)
    this.stopSequence();
    this.setState({columns: event.target.value});
    this.newLoop(event.target.value);
    // console.log(this.state.columns) this executes before setState is finished, I think
  }

  newLoop(cols){
    // can't adjust events array inside existing loop. must create a new one?
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
  }

  componentDidUpdate(){
    // console.log('inside did update, LOOP:', this.state.loop)
    drumMatrix.col = this.state.columns;
    drumMatrix.init()
  }

  render() {
    const { example, update, clear } = this.props

    return (
      <div>
        <div className='drumContainer'>
          <canvas
          data-type="matrix"
          id="drumMatrix"
          label="Drum Machine"
          ref={(canvas) => {this.nxDefine(canvas)}}>
          </canvas>
        </div>
        <div className='controlButtons'>
          <button onClick={() => this.startSequence()}>START</button>
          <button onClick={() => this.stopSequence()}>STOP</button>
        </div>
        <select name="Subdivisions" value={this.state.columns} onChange={(e) => this.updateColumns(e)}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
        </select>
        <Synth nxDefine={this.nxDefine}/>
        {/*<canvas data-type="slider" ref={(canvas) => {this.nxDefine(canvas)}}></canvas>
        <canvas data-type="slider" ref={(canvas) => {this.nxDefine(canvas)}}></canvas>*/}


      </div>
    )
  }
}

/* REDUX CONTAINER */

const mapStateToProps = ({ example }) => ({ example })

const mapDispatchToProps = dispatch => ({
  update: () => dispatch(exampleUpdate())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

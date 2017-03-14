import React, { Component } from 'react';
import Tone from 'tone';
import { triggerDrums } from '../audio_scripts/drums';
import loop, { realignView } from '../audio_scripts/loop';
import { connect } from 'react-redux';
import Synth from './Synth.jsx';
import DrumMachine from './DrumMachine.jsx';
import { MyRecorder } from './Recorder.jsx';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import { midiFunctionality } from '../audio_scripts/midi';

class Home extends Component {
  constructor(props) {
    super(props);

    this.nxDefine = this.nxDefine.bind(this);
    this.nxLoad = this.nxLoad.bind(this);
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
    nx.onload = function() {
      // console.log('inside nx.onload', drumMatrix)
      nx.colorize('#24D5FF')
      nx.colorize('fill', '#222222')
      oscVolume.setNumberOfSliders(3)
      oscVolume.init()
      drumMatrix.col = 16;
      drumMatrix.row = 3;
      drumMatrix.colors.accent = "#3AFFCD";
      drumMatrix.colors.fill = "#DDDCED";
      drumMatrix.init()
      synth.octaves = 2;
      synth.colors.fill = "#DDDCED";
      synth.init()
    }
  }

  componentDidMount(){
    this.nxLoad();
    // allows MIDI keyboard functionality
    midiFunctionality();
  }

  componentDidUpdate(){
    // drumMatrix.init()
  }

  render() {
    // console.log("MASTER", Tone.Master.context)
    // console.log("SECOND", Tone.Master.context.destination)

    return (
      <div>
        <Navbar />
        <DrumMachine nxDefine={this.nxDefine}/>
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

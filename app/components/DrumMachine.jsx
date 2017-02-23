import React, { Component } from 'react';
import { drums, triggerDrums } from '../audio_scripts/drums';

export class DrumMachine extends Component {
  constructor(){
    super()
    // this.state = {
    //   drums: {}
    // }
  }
  render(){
    return (
      <div>
        <canvas
          data-type="matrix"
          id="drumMatrix2"
          label="Drum Machine"
          ref={(canvas) => {this.props.nxDefine(canvas)}}>
          </canvas>
      </div>
    )
  }
}

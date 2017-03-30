import React, { Component } from 'react';
import Tone from 'tone';

let mediaRecorder, recorder;

export class MyRecorder extends Component {
  startRecording(){
    recorder && recorder.record();
    // console.log("recorder started");
  }

  // refactor this into a component rather than directly manipulating the DOM
  stopRecording(){
    recorder && recorder.stop();
    let newTrack;
    recorder.exportWAV(function(blob){
      let url = window.URL.createObjectURL(blob),
          audio = document.createElement('audio'),
          clipContainer = document.createElement('article'),
          downloadLink = document.createElement('a')


      audio.setAttribute('controls', 'download');
      downloadLink.setAttribute('href', url)
      downloadLink.setAttribute('download', 'saturnbeat')
      downloadLink.innerHTML = 'Download'

      clipContainer.appendChild(audio)
      clipContainer.appendChild(downloadLink);
      document.body.appendChild(clipContainer);

      audio.src = url

      newTrack = blob;

      //Tone.Master.context
    })

  }

  componentDidMount(){
    recorder = new Recorder(Tone.Master, {
      bufferLen: 16384
    })
    // console.log(recorder, Tone.Master.context.sampleRate)
  }

  render(){
    const { nxDefine } = this.props;
    return (
      <div id='recorderContainer'>
        <button id='recordButton' onClick={()=> this.startRecording()}>Record</button>
        <button id='stopRecording' onClick={()=> this.stopRecording()}>Stop</button>
        {/*<canvas
          data-type='waveform'
          ref={(canvas) => {nxDefine(canvas)}} />*/}
      </div>
    )
  }
}

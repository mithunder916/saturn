import React, { Component } from 'react';
import Tone from 'tone';

let mediaRecorder, recorder;

export class MyRecorder extends Component {
  startRecording(){
    recorder && recorder.record();
    console.log("recorder started");
  }

  stopRecording(){
    recorder && recorder.stop();
    let newTrack;
    recorder.exportWAV(function(blob){
      let url = window.URL.createObjectURL(blob);
      let audio = document.createElement('audio')
      var clipContainer = document.createElement('article');

      audio.setAttribute('controls', '');
      clipContainer.appendChild(audio)
      document.body.appendChild(clipContainer);

      audio.src = url

      newTrack = blob;
    })

  }

  componentDidMount(){
    recorder = new Recorder(Tone.Master, {
      bufferLen: 16384
    })
    console.log(recorder, Tone.Master.context.sampleRate)
  }

  render(){
    recorder && console.log(recorder);
    return (
      <div>
        <button id='recordButton' onClick={()=> this.startRecording()}>Record</button>
        <button id='stopRecording' onClick={()=> this.stopRecording()}>Stop</button>
      </div>
    )
  }
}

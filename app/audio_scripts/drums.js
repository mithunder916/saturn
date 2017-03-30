import Tone from 'tone';
import audioSettings from './audioSettings';

Tone.Transport.bpm.value = 90;

export let drums = new Tone.MultiPlayer({
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

// save the values of the columns as a way of saving the loop
export function triggerDrums(drumMatrix, time, col) {
    let column = drumMatrix.matrix[col];
    for (let i = 0; i < column.length; i++) {
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

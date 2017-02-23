import Tone from 'tone';
import { triggerDrums } from './drums';

// refactor numSeqPasses later if you think it might be useful
// let numSeqPasses = 0;

let loop = new Tone.Sequence(function(time, col) {
  // console.log('loop function started')
  triggerDrums(drumMatrix, time, col);

  if (col === 31) {
      // numSeqPasses++;
      realignView(drumMatrix);
  }
}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

export function realignView(matrix) {
  matrix.sequence(Tone.Transport.bpm.value * 4)
}

//some overall compression to keep the levels in check
// var masterCompressor = new Tone.Compressor({
// 	"threshold" : -35,
// 	"ratio" : 10,
// 	"attack" : 0.5,
// 	"release" : 0.1
// });
// //give a little boost to the lows
// var lowBump = new Tone.Filter(200, "lowshelf");
// //route everything through the filter
// //and compressor before going to the speakers
// Tone.Master.chain(lowBump, masterCompressor);

export default loop;

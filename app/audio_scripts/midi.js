import {polySynth, polySynth2, polySynth3} from '../components/Synth.jsx';
let data, cmd, channel, type, note, midi, frequency, velocity;

// request MIDI access
export function midiFunctionality(){
  if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
          sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
      }).then(onMIDISuccess, onMIDIFailure);
  } else {
      alert("No MIDI support in your browser.");
  }
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a successful response, run this code
    console.log('MIDI Access Object', midiAccess);
    midi = midiAccess;
    var inputs = midi.inputs.values();
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(e) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

function onMIDIMessage(event) {
  data = event.data; // this gives us our [command/channel, note, velocity] data.

  cmd = data[0] >> 4,
  channel = data[0] & 0xf,
  type = data[0] & 0xf0, // channel agnostic message type.
  note = data[1],
  frequency = frequencyFromNoteNumber(note)
  velocity = data[2];
  // with pressure and tilt off
  // note off: 128, cmd: 8
  // note on: 144, cmd: 9
  // pressure / tilt on
  // pressure: 176, cmd 11:
  // bend: 224, cmd: 14
  console.log('MIDI data', data); // MIDI data [144, 63, 73]

  switch (type) {
      case 144: // noteOn message
       noteOn(note, velocity, frequency);
       break;
      case 128: // noteOff message
        noteOff(note, velocity, frequency);
        break;
  }
}

function noteOn(midiNote, velocity, frequency) {
  polySynth.triggerAttack(frequency, null, velocity);
  polySynth2.triggerAttack(frequency, null, velocity);
  polySynth3.triggerAttack(frequency, null, velocity)
}

// rewrite to have noteOff measure duration note is held? could require longer notes to be sustained for longer; allow a generous margin of error
function noteOff(midiNote, velocity, frequency) {
  polySynth.triggerRelease(frequency)
  polySynth2.triggerRelease(frequency);
  polySynth3.triggerRelease(frequency)
}

function frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
}

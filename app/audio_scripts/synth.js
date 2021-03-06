import Synth from '../components/Synth';

let keysAllowed = {};

export const playNote = event => {
  // use for computer keyboard - do keyDown events measure velocity?
  // prevents Tab from shifting focus
  if (event.key === 'Tab') event.preventDefault();
  // since keyDown events eventually re-trigger when a key is held down, storing them in an object and using this check will prevent the note from interrupting/replaying
  if (keysAllowed[event.key] === false) return;
  keysAllowed[event.key] = false;
  // based on event.key => toggle a certain synth.key (visual), and play a certain note using Tone
  switch (event.key){
    case 'Tab': Synth.playOrReleaseNote('C3', 'attack', 0)
                break;
    case 'q': Synth.playOrReleaseNote('D3', 'attack', 2)
              break;
    case 'w': Synth.playOrReleaseNote('E3', 'attack', 4)
              break;
    case 'e': Synth.playOrReleaseNote('F3', 'attack', 5)
              break;
    case 'r': Synth.playOrReleaseNote('G3', 'attack', 7)
              break;
    case 't': Synth.playOrReleaseNote('A3', 'attack', 9)
              break;
    case 'y': Synth.playOrReleaseNote('B3', 'attack', 11)
              break;
    case 'u': Synth.playOrReleaseNote('C4', 'attack', 12)
              break;
    case 'i': Synth.playOrReleaseNote('D4', 'attack', 14)
              break;
    case 'o': Synth.playOrReleaseNote('E4', 'attack', 16)
              break;
    case 'p': Synth.playOrReleaseNote('F4', 'attack', 17)
              break;
    case '[': Synth.playOrReleaseNote('G4', 'attack', 19)
              break;
    case ']': Synth.playOrReleaseNote('A4', 'attack', 21)
              break;
    case '\\': Synth.playOrReleaseNote('B4', 'attack', 23)
              break;
    case '1': Synth.playOrReleaseNote('Db3', 'attack', 1)
              break;
    case '2': Synth.playOrReleaseNote('Eb3', 'attack', 3)
              break;
    case '4': Synth.playOrReleaseNote('Gb3', 'attack', 6)
              break;
    case '5': Synth.playOrReleaseNote('Ab3', 'attack', 8)
              break;
    case '6': Synth.playOrReleaseNote('Bb3', 'attack', 10)
              break;
    case '8': Synth.playOrReleaseNote('Db4', 'attack', 13)
              break;
    case '9': Synth.playOrReleaseNote('Eb4', 'attack', 15)
              break;
    case '-': Synth.playOrReleaseNote('Gb4', 'attack', 18)
              break;
    case '=': Synth.playOrReleaseNote('Ab4', 'attack', 20)
              break;
    case 'Backspace': Synth.playOrReleaseNote('Bb4', 'attack', 22)
              break;
    default: return;
  }
}

export const releaseNote = event => {
  switch (event.key){
    case 'Tab': Synth.playOrReleaseNote('C3', 'release', 0)
                break;
    case 'q': Synth.playOrReleaseNote('D3', 'release', 2)
              break;
    case 'w': Synth.playOrReleaseNote('E3', 'release', 4)
              break;
    case 'e': Synth.playOrReleaseNote('F3', 'release', 5)
              break;
    case 'r': Synth.playOrReleaseNote('G3', 'release', 7)
              break;
    case 't': Synth.playOrReleaseNote('A3', 'release', 9)
              break;
    case 'y': Synth.playOrReleaseNote('B3', 'release', 11)
              break;
    case 'u': Synth.playOrReleaseNote('C4', 'release', 12)
              break;
    case 'i': Synth.playOrReleaseNote('D4', 'release', 14)
              break;
    case 'o': Synth.playOrReleaseNote('E4', 'release', 16)
              break;
    case 'p': Synth.playOrReleaseNote('F4', 'release', 17)
              break;
    case '[': Synth.playOrReleaseNote('G4', 'release', 19)
              break;
    case ']': Synth.playOrReleaseNote('A4', 'release', 21)
              break;
    case '\\': Synth.playOrReleaseNote('B4', 'release', 23)
              break;
    case '1': Synth.playOrReleaseNote('Db3', 'release', 1)
              break;
    case '2': Synth.playOrReleaseNote('Eb3', 'release', 3)
              break;
    case '4': Synth.playOrReleaseNote('Gb3', 'release', 6)
              break;
    case '5': Synth.playOrReleaseNote('Ab3', 'release', 8)
              break;
    case '6': Synth.playOrReleaseNote('Bb3', 'release', 10)
              break;
    case '8': Synth.playOrReleaseNote('Db4', 'release', 13)
              break;
    case '9': Synth.playOrReleaseNote('Eb4', 'release', 15)
              break;
    case '-': Synth.playOrReleaseNote('Gb4', 'release', 18)
              break;
    case '=': Synth.playOrReleaseNote('Ab4', 'release', 20)
              break;
    case 'Backspace': Synth.playOrReleaseNote('Bb4', 'release', 22)
              break;
    default: return;
  }
  // resets key so that it can be played again
  keysAllowed[event.key] = true;
}

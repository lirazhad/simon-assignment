import Sound from 'react-native-sound';
import SoundYellow from '../assets/sounds/yellow.mp3';
import SoundRed from '../assets/sounds/red.mp3';
import SoundBlue from '../assets/sounds/blue.mp3';
import SoundGreen from '../assets/sounds/green.mp3';
import SoundGameOver from '../assets/sounds/error.wav';
import {playColors} from '../constants/AppStyle';

const playSound = (soundName: string) => {
  const sound = new Sound(soundColor(soundName), error => {
    if (error) {
      console.log('error');
    } else {
      sound.play(() => sound.release());
    }
  });
};

const soundColor = (color: string) => {
  switch (color) {
    case playColors.YELLOW:
      return SoundYellow;
    case playColors.GREEN:
      return SoundGreen;
    case playColors.BLUE:
      return SoundBlue;
    case playColors.RED:
      return SoundRed;
    default:
      return SoundGameOver;
  }
};

export default playSound;

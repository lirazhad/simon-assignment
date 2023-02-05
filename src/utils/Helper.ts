import {playColors} from '../constants/AppStyle';

export default function getRandomColor() {
  const colors = [
    playColors.YELLOW,
    playColors.RED,
    playColors.BLUE,
    playColors.GREEN,
  ];
  const colorIndex = Math.floor(Math.random() * colors.length);
  return colors[colorIndex];
}

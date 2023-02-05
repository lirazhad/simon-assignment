import {Dimensions} from 'react-native';

export const SCREEN_WIDTH: number = Dimensions.get('window').width;
export const SCREEN_HEIGHT: number = Dimensions.get('window').height;

export const appStyle = {
  LARGE_FONT: 20,
  SMALL_FONT: 14,
  STANDARD_PADDING: 8,
  LARGE_PADDING: 12,
  STANDARD_MARGIN: 8,
  LARGE_MARGIN: 12,
  BORDER_WIDTH: 1,
  BUTTON_RADIUS: 22,
  BUTTON_HORIZONTAL_MARGIN: 16,
  PLAY_BUTTON_SIZE: (SCREEN_WIDTH - 60) / 2,
  SCORE_ITEM_HEIGHT: 40,
  HEADER_HEIGHT: 80,
  MAIN_BUTTON_SIZE: 80,
  MAIN_BUTTON_RADIUS: 40,
  BOARD_GAME_SIZE: SCREEN_WIDTH - 60,
  TEXT_INPUT_HEIGHT: 40,
  TEXT_INPUT_RADIUS: 18,
  INPUT_WIDTH: 300,
};

export const colors = {
  MAIN: '#AEB4FE',
  ACCENT: '#F46DA7',
  RED: '#FF5747',
  BLUE: '#7BC1E8',
  GREEN: '#95FF8D',
  YELLOW: '#FEFB94',
  GRAY: '#D2D8D9',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
};

export const playColors = {
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green',
  YELLOW: 'yellow',
};

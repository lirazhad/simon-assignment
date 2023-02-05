import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {SharedValue} from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes';
import {RootStackParamList} from '../navigation/RootNavigator';
import {colors, appStyle, playColors} from '../constants/AppStyle';
import {GameState} from '../constants/GameState';
import PlayButton from '../components/PlayButton';
import getRandomColor from '../utils/Helper';
import playSound from '../utils/SoundManager';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Game'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;
type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const GameScreen: React.FC<Props> = ({navigation, route}) => {
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState(GameState.START);
  const [steps, setSteps] = useState<string[]>([]);
  const [moveIndex, setMoveIndex] = useState(0);

  const [disableUI, setDisableUI] = useState(true);
  const [disableMainButton, setDisableMainButton] = useState(false);

  const yellowScale = useSharedValue(1);
  const blueScale = useSharedValue(1);
  const redScale = useSharedValue(1);
  const greenScale = useSharedValue(1);

  const pressButtonAnimation = (scale: SharedValue<number>) => {
    scale.value = withSequence(
      withTiming(1.1, {duration: 50}),
      withTiming(1, {duration: 50}),
    );
  };

  const blueStyle = useAnimatedStyle(() => ({
    transform: [{scale: blueScale.value}],
  }));

  const redStyle = useAnimatedStyle(() => ({
    transform: [{scale: redScale.value}],
  }));

  const greenStyle = useAnimatedStyle(() => ({
    transform: [{scale: greenScale.value}],
  }));

  const yellowStyle = useAnimatedStyle(() => ({
    transform: [{scale: yellowScale.value}],
  }));

  const nextMove = () => {
    setDisableUI(true);
    setDisableMainButton(true);

    const newStep = getRandomColor();
    const updatedSteps = [...steps, newStep];

    setMoveIndex(0);
    setGameState(GameState.PLAYING);
    setSteps(updatedSteps);

    preformAction(0, updatedSteps);
  };

  const preformAction = (counter: number, updatedSteps: string[]) => {
    if (counter < updatedSteps.length) {
      setTimeout(function () {
        playSound(updatedSteps[counter]);
        switch (updatedSteps[counter]) {
          case playColors.RED:
            pressButtonAnimation(redScale);
            break;

          case playColors.BLUE:
            pressButtonAnimation(blueScale);
            break;

          case playColors.GREEN:
            pressButtonAnimation(greenScale);
            break;

          case playColors.YELLOW:
            pressButtonAnimation(yellowScale);
            break;
        }

        counter++;
        if (counter === updatedSteps.length) {
          setTimeout(() => {
            setDisableUI(false);
            setGameState(GameState.TAP);
          }, 1000);
        }
        preformAction(counter, updatedSteps);
      }, 900);
    }
  };

  const onPressButton = (color: string) => {
    console.log(color);
    if (color === steps[moveIndex]) {
      playSound(color);
      setMoveIndex(moveIndex + 1);
      if (moveIndex === steps.length - 1) {
        setScore(steps.length);
        nextMove();
      }
    } else {
      playSound('game over');
      Alert.alert(
        'Game Over',
        'you lost!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.replace('Score', {
                userName: route.params.userName,
                score,
              });
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{route.params.userName}</Text>
        <Text style={styles.headerText}>{'Score: ' + score}</Text>
      </View>
      <View style={styles.boardPlay}>
        <PlayButton
          style={styles.red}
          disabled={disableUI}
          animation={redStyle}
          onPressButton={() => onPressButton(playColors.RED)}
        />
        <PlayButton
          style={styles.blue}
          disabled={disableUI}
          animation={blueStyle}
          onPressButton={() => onPressButton(playColors.BLUE)}
        />
        <PlayButton
          style={styles.green}
          disabled={disableUI}
          animation={greenStyle}
          onPressButton={() => onPressButton(playColors.GREEN)}
        />
        <PlayButton
          style={styles.yellow}
          disabled={disableUI}
          animation={yellowStyle}
          onPressButton={() => onPressButton(playColors.YELLOW)}
        />
        <View style={styles.mainButtonContainer}>
          <TouchableOpacity disabled={disableMainButton} onPress={nextMove}>
            <View style={styles.mainButton}>
              <Text style={styles.mainButtonText}>{gameState}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  header: {
    width: '100%',
    height: appStyle.HEADER_HEIGHT,
    position: 'absolute',
    top: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    backgroundColor: colors.MAIN,
    flexDirection: 'row',
  },
  headerText: {
    color: colors.WHITE,
    fontSize: appStyle.LARGE_FONT,
    margin: appStyle.LARGE_MARGIN,
  },
  boardPlay: {
    width: appStyle.BOARD_GAME_SIZE,
    height: appStyle.BOARD_GAME_SIZE,
    borderRadius: appStyle.PLAY_BUTTON_SIZE,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: (appStyle.BOARD_GAME_SIZE - appStyle.MAIN_BUTTON_SIZE) / 2,
    right: (appStyle.BOARD_GAME_SIZE - appStyle.MAIN_BUTTON_SIZE) / 2,
  },
  mainButton: {
    width: appStyle.MAIN_BUTTON_SIZE,
    height: appStyle.MAIN_BUTTON_SIZE,
    borderRadius: appStyle.MAIN_BUTTON_RADIUS,
    backgroundColor: colors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainButtonText: {
    color: colors.WHITE,
  },
  yellow: {
    borderBottomRightRadius: appStyle.PLAY_BUTTON_SIZE,
    backgroundColor: colors.YELLOW,
  },
  red: {
    borderTopLeftRadius: appStyle.PLAY_BUTTON_SIZE,
    backgroundColor: colors.RED,
  },
  blue: {
    borderTopRightRadius: appStyle.PLAY_BUTTON_SIZE,
    backgroundColor: colors.BLUE,
  },
  green: {
    borderBottomLeftRadius: appStyle.PLAY_BUTTON_SIZE,
    backgroundColor: colors.GREEN,
  },
});

export default GameScreen;

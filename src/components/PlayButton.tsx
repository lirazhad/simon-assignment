import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {appStyle} from '../constants/AppStyle';
import Animated from 'react-native-reanimated';

interface Props {
  style: ViewStyle;
  disabled: boolean;
  animation: any;
  onPressButton: () => void;
}

const PlayButton: React.FC<Props> = ({
  style,
  onPressButton,
  disabled,
  animation,
}: Props) => {
  return (
    <Animated.View
      style={[
        {
          width: appStyle.PLAY_BUTTON_SIZE,
          height: appStyle.PLAY_BUTTON_SIZE,
        },
        animation,
      ]}>
      <TouchableOpacity onPress={onPressButton} disabled={disabled}>
        <View style={[styles.container, style]} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: appStyle.PLAY_BUTTON_SIZE,
    height: appStyle.PLAY_BUTTON_SIZE,
  },
});

export default PlayButton;

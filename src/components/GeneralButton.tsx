import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, appStyle} from '../constants/AppStyle';

type Props = {
  onPress: () => void;
  title: string;
};

const GeneralButton: React.FC<Props> = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: appStyle.BORDER_WIDTH,
    borderRadius: appStyle.BUTTON_RADIUS,
    borderColor: colors.MAIN,
    padding: appStyle.LARGE_PADDING,
    marginVertical: appStyle.LARGE_MARGIN,
  },
  text: {
    fontSize: appStyle.LARGE_FONT,
    color: colors.MAIN,
    marginHorizontal: appStyle.BUTTON_HORIZONTAL_MARGIN,
  },
});

export default GeneralButton;

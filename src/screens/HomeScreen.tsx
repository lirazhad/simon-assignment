import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, ScreensNames} from '../navigation/RootNavigator';
import GeneralButton from '../components/GeneralButton';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {colors, appStyle} from '../constants/AppStyle';
import {getAsyncStorageItem, setStorageItem} from '../storage/asyncStorage';
import {USER_NAME_KEY} from '../constants/Constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ScreensNames.Home
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [value, onChangeText] = useState('');
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    getAsyncStorageItem(USER_NAME_KEY).then((name: string | null) => {
      if (name !== null) {
        setUserName(name);
      }
    });
  }, []);

  const onPressSetName = () => {
    if (value !== '') {
      setStorageItem(USER_NAME_KEY, value);
      setUserName(value);
    }
  };

  return (
    <View style={styles.mainView}>
      {userName ? (
        <Text style={styles.text}>{`Hello ${userName}`}</Text>
      ) : (
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>{'Enter your name: '}</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => onChangeText(text)}
              value={value}
            />
            <View style={styles.inputName}>
              <TouchableOpacity onPress={onPressSetName}>
                <View style={styles.setNameButton}>
                  <Text>{'Set'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <GeneralButton
        onPress={() => {
          navigation.navigate(ScreensNames.Game, {userName: userName});
        }}
        title={'Start Game'}
      />
      <GeneralButton
        onPress={() => {
          navigation.replace(ScreensNames.Score, {userName: userName});
        }}
        title={'Show Scores'}
      />
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
  text: {
    fontSize: appStyle.LARGE_FONT,
    margin: appStyle.LARGE_MARGIN,
    color: colors.ACCENT,
  },
  inputWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: appStyle.INPUT_WIDTH,
    borderColor: colors.GRAY,
    borderRadius: appStyle.TEXT_INPUT_RADIUS,
    borderWidth: appStyle.BORDER_WIDTH,
    height: appStyle.TEXT_INPUT_HEIGHT,
    margin: appStyle.LARGE_MARGIN,
    paddingHorizontal: appStyle.LARGE_PADDING,
  },
  textInputWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputName: {
    position: 'absolute',
    right: 0,
    height: appStyle.TEXT_INPUT_HEIGHT,
  },
  setNameButton: {
    width: appStyle.TEXT_INPUT_HEIGHT,
    height: appStyle.TEXT_INPUT_HEIGHT,
    borderRadius: appStyle.TEXT_INPUT_HEIGHT / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.MAIN,
  },
});

export default HomeScreen;

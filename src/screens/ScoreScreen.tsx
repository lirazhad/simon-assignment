import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {RouteProp} from '@react-navigation/native';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import ScoreListItem from '../components/ScoreListItem';
import GeneralButton from '../components/GeneralButton';
import {colors, appStyle} from '../constants/AppStyle';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {addNewScore, editScore, getAllScores} from '../network/scoreActionsAPI';
import {QueryAPIEnum} from '../network/querriesKeys.types';
import {Score} from '../models/Score';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Score'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Score'>;
};

const ScoreScreen: React.FC<Props> = ({navigation, route}) => {
  const [showScore, setShowScore] = useState(
    (route?.params?.score && route?.params?.userName) || false,
  );
  const queryClient = useQueryClient();

  const {data} = useQuery({
    queryKey: [QueryAPIEnum.GetAllRecords],
    queryFn: getAllScores,
  });

  const addScoreMutation = useMutation({
    mutationFn: addNewScore,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QueryAPIEnum.GetAllRecords]});
      setShowScore(false);
    },
  });

  const editScoreMutation = useMutation({
    mutationFn: editScore,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QueryAPIEnum.GetAllRecords]});
      setShowScore(false);
    },
  });

  const onPressInsertRecord = async (newScore: number) => {
    const scores: Score[] | undefined = queryClient.getQueryData([
      QueryAPIEnum.GetAllRecords,
    ]);

    const id = route.params.userName;

    if (id === undefined || route.params.userName === undefined) {
      return;
    }

    const oldScore = scores?.find((score: Score) => score.id === id);

    if (oldScore !== undefined && id !== undefined) {
      editScoreMutation.mutate({scoreId: id, newScore: newScore});
    } else {
      const score: Score = {
        id,
        name: route.params.userName,
        score: newScore,
      };

      addScoreMutation.mutate(score);
    }
  };

  const goToGameScreen = () => {
    navigation.navigate('Game', {userName: route.params.userName});
  };

  const goToHomeScreen = () => {
    navigation.navigate('Home');
  };

  const insertRecord = () => {
    return (
      <View>
        <Text style={styles.score}>
          {`Your Score is: ${route.params.score}`}
        </Text>
        <GeneralButton
          onPress={() => onPressInsertRecord(route.params.score || 0)}
          title={'Set your record'}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.header}>
        {showScore && insertRecord()}
        <GeneralButton onPress={goToGameScreen} title={'START NEW GAME'} />
        <GeneralButton onPress={goToHomeScreen} title={'GO HOME'} />
      </View>
      <View style={styles.body}>
        <FlatList
          data={data}
          bounces={false}
          renderItem={({item}: {item: Score}) => (
            <ScoreListItem
              userName={item.name}
              score={item.score}
              id={item.id}
              canDelete={item.id === route?.params?.userName}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: appStyle.LARGE_PADDING,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.WHITE,
  },
  header: {
    margin: appStyle.LARGE_MARGIN,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    margin: appStyle.STANDARD_MARGIN,
    fontSize: appStyle.LARGE_FONT,
    color: colors.ACCENT,
  },
  body: {
    width: '100%',
    marginVertical: appStyle.LARGE_MARGIN,
  },
});

export default ScoreScreen;

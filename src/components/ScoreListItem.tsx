import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useMutation, useQueryClient} from 'react-query';
import {colors, appStyle} from '../constants/AppStyle';
import {QueryAPIEnum} from '../network/querriesKeys.types';
import {deleteScore} from '../network/scoreActionsAPI';

type Props = {
  userName: string;
  score: number;
  id: string;
  canDelete: boolean;
};

const ScoreListItem: React.FC<Props> = ({
  userName,
  score,
  id,
  canDelete,
}: Props) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteScore,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QueryAPIEnum.GetAllRecords]});
    },
    onError(error) {
      console.log(error);
    },
  });

  const onPressDelete = () => {
    deleteMutation.mutate(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.names}>
        <Text style={styles.text}>{userName}</Text>
        <Text style={styles.text}>{score}</Text>
      </View>
      {canDelete && (
        <TouchableOpacity onPress={onPressDelete}>
          <View style={styles.deleteButton}>
            <Text>{' x '}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: appStyle.SCORE_ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: appStyle.BORDER_WIDTH,
    borderBottomColor: colors.MAIN,
    paddingHorizontal: appStyle.STANDARD_PADDING,
    marginVertical: appStyle.LARGE_MARGIN,
  },
  names: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: appStyle.LARGE_FONT,
    color: colors.MAIN,
    margin: appStyle.STANDARD_MARGIN,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: colors.ACCENT,
    padding: appStyle.STANDARD_PADDING,
    marginHorizontal: appStyle.STANDARD_MARGIN,
  },
});

export default ScoreListItem;

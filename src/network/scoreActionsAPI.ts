import {Score} from '../models/Score';
import {mockApi} from './axios.service';

export const getAllScores = async (): Promise<Score[]> => {
  try {
    const result = await mockApi.get('/scores');
    console.log('getScores ==>', result?.data);
    return result?.data;
  } catch (error) {
    console.log('Error occurred while getting scores:', error);
    throw error;
  }
};

export const addNewScore = async (newScore: Score): Promise<Response> => {
  try {
    const result = await mockApi.post('/scores', newScore);
    console.log('createNewScore ==>', result?.data);
    return result?.data;
  } catch (error) {
    console.log('Error occurred while adding scores:', error);
    throw error;
  }
};

export const deleteScore = async (scoreId: string): Promise<Response> => {
  try {
    const result = await mockApi.delete(`/scores/${scoreId}`);
    console.log('deleteScore ==>', result?.data);
    return result?.data;
  } catch (error) {
    console.log('Error occurred while deleting score:', error);
    throw error;
  }
};

interface Props {
  scoreId: string;
  newScore: number;
}

export const editScore = async ({
  scoreId,
  newScore,
}: Props): Promise<Response> => {
  try {
    const result = await mockApi.put(`/scores/${scoreId}`, {score: newScore});
    console.log('editScore ==>', result?.data);
    return result?.data;
  } catch (error) {
    // eslint-disable-next-line prettier/prettier
    console.log('Error occurred while editing scores:', error);
    throw error;
  }
};

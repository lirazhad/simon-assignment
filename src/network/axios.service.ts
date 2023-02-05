import axios from 'axios';
import {MOCK_BASE_URL} from '../constants/serverConfig';

const mockApi = axios.create({
  baseURL: MOCK_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
});

export {mockApi};

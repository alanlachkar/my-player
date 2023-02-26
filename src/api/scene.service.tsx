// API imports
import api from './api';
import { AxiosResponse } from 'axios';
// Utils imports
import { SceneInterface } from '../types';

// Get a specific scene according to the given parameter
const getScene = (timecode: number): Promise<SceneInterface> => {
  return api
    .get(`/scene/${timecode}`)
    .then(async (response: AxiosResponse<SceneInterface>) => {
      return response.data;
    });
};

export default {
  getScene
};

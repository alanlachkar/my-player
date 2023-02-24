// API imports
import api from './api';
import { AxiosResponse } from 'axios';
// Utils imports
import { PostInterface } from '../types';

// Get all posts
const getAllPosts = (): Promise<PostInterface[]> => {
  return api.get(`/posts`).then(async (response: AxiosResponse<PostInterface[]>) => {
    return response.data;
  });
};

export default {
  getAllPosts
};

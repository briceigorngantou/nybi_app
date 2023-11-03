/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import axios from 'axios';
import { BASE_URL } from 'constants/baseUrl';

const getPostById = async (userId: string, postId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const userFound = await axios
      .get(`${BASE_URL}/posts/findOne/${userId}/${postId}`, config)
      .then((res: any) => res?.data);
    console.log('userFound :', userFound);
    return userFound;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllPosts = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const allPosts = await axios
      .get(`${BASE_URL}/posts/getAll/`, config)
      .then((res: any) => res?.data);
    console.log('allPosts :', allPosts);
    return allPosts;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllUserPosts = async (userId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const getUserPosts = await axios
      .get(`${BASE_URL}/posts/getAll/${userId}/`, config)
      .then((res: any) => res?.data);
    console.log('getUserPosts :', getUserPosts);
    return getUserPosts;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const userSavePost = async (values: any) => {
  const { userId, description, picturePath, picture } = values;
  const body = {
    userId,
    description,
    picturePath,
    picture
  };
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(body);
    const postSaved = await axios
      .post(`${BASE_URL}/post/save`, body, config)
      .then((res: any) => res?.data);
    console.log('postSaved:', postSaved);
    return postSaved;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getPostById, getAllPosts, getAllUserPosts, userSavePost };

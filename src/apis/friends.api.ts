/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import axios from 'axios';
import { BASE_URL } from 'constants/baseUrl';

const getFriendById = async (userId: string, postId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const userFound = await axios
      .get(`${BASE_URL}/friend/findOne/${userId}/${postId}`, config)
      .then((res: any) => res?.data);
    console.log('userFound :', userFound);
    return userFound;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllFriends = async (userId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const allFriends = await axios
      .get(`${BASE_URL}/friend/${userId}/getAll/`, config)
      .then((res: any) => res?.data);
    console.log('allFriends :', allFriends);
    return allFriends;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const patchLikeApi = async (postId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const getUserFriends = await axios
      .get(`${BASE_URL}/friend/getAll/${postId}/`, config)
      .then((res: any) => res?.data);
    console.log('getUserFriends :', getUserFriends);
    return getUserFriends;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const patchFriend = async (userId: any, friendId: any, token: any) => {
  const body = { userId, friendId };
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    console.log(body);
    const postSaved = await axios
      .post(`${BASE_URL}/friend/save`, body, config)
      .then((res: any) => res?.data);
    console.log('postSaved:', postSaved);
    return postSaved;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getFriendById, getAllFriends, patchLikeApi, patchFriend };

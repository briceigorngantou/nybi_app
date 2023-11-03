/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import axios from 'axios';
import { BASE_URL } from 'constants/baseUrl';

const getUserById = async (userId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const userFound = await axios
      .get(`${BASE_URL}/users/findOne/${userId}`, config)
      .then((res: any) => res?.data);
    console.log('userFound :', userFound);
    return userFound;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getUserById };

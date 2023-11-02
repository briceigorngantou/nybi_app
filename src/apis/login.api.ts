/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import axios from 'axios';
import { BASE_URL } from 'constants/baseUrl';

const userLogin = async (userName: string, password: string) => {
  const body = {
    userName,
    password
  };
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(body);
    const userLog = await axios
      .post(`${BASE_URL}/users/login`, body, config)
      .then((res: any) => res?.data);
    console.log('user log:', userLog);
    return userLog;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { userLogin };

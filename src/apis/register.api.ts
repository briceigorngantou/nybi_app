/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import axios from 'axios';
import { BASE_URL } from 'constants/baseUrl';

const userRegister = async (values: any) => {
  const {
    firstName,
    lastName,
    userName,
    phone,
    email,
    password,
    location,
    occupation,
    picture
  } = values;
  const body = {
    firstName,
    lastName,
    userName,
    email,
    phone,
    password,
    location,
    occupation,
    picture
  };
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(body);
    const userSignUp = await axios
      .post(`${BASE_URL}/users/signup`, body, config)
      .then((res: any) => res?.data);
    console.log('user sign Up:', userSignUp);
    return userSignUp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const emailVerification = async (userId: string, code: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const verificationResult = await axios
      .get(`${BASE_URL}/users/verify-email/${userId}/${code}`, config)
      .then((res: any) => res?.data);
    console.log('verificationResult : ', verificationResult);
    return verificationResult;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export { emailVerification, userRegister };

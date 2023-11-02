/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from 'react';
import {
  Box,
  Button,
  useMediaQuery,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import { setLogin } from 'state';

import FlexBetween from 'components/FlexBetween';
import { userLogin } from 'apis/login.api';
import { userRegister } from 'apis/register.api';

const registerSchema = Yup.object().shape({
  lastName: Yup.string().required('lastName is required'),
  email: Yup.string().email().required('email is required'),
  phone: Yup.string().required('phone is required'),
  userName: Yup.string().required('username is required'),
  password: Yup.string()
    .required('password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and include at least one uppercase letter,' +
        'one lowercase letter, one digit, and one special character.'
    ),
  confirmPassword: Yup.string()
    .required('confirm password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and include at least one uppercase letter,' +
        'one lowercase letter, one digit, and one special character.'
    )
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  location: Yup.string().required('location is required'),
  occupation: Yup.string().required('occupation is required'),
  picture: Yup.string(),
  firstName: Yup.string().required('firstName is required')
});

const loginSchema = Yup.object().shape({
  userName: Yup.string().required('userName is required'),
  password: Yup.string().required('password is required')
});

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  userName: '',
  confirmPassword: '',
  location: '',
  occupation: '',
  picture: File
};

const initialValuesLogin = {
  email: undefined,
  password: '',
  confirmPassword: undefined,
  firstName: undefined,
  userName: '',
  lastName: undefined,
  location: undefined,
  phone: undefined,
  occupation: undefined,
  picture: undefined
};

const Form = () => {
  const [pageType, setPageType] = useState('login');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';
  const acceptedFiles = {
    'image/jpeg': ['.png', '.jpeg', '.jpg']
  };

  const register = async (values: any, onSubmitProps: any) => {
    // api call here
    const result = await userRegister(values);
    console.log('result register api core:', result);
    onSubmitProps.resetForm();
    if (result?.status === 201 || result?.status === 200) {
      setPageType('login');
    }
  };

  const login = async (values: any, onSubmitProps: any) => {
    // api call here
    const result = await userLogin(values.userName, values.password);
    console.log('result login api core:', result);
    onSubmitProps.resetForm();
    if (result?.status === 200 || result?.status === 201) {
      dispatch(
        setLogin({
          user: result.data,
          token: result.data.token
        })
      );
      navigate('/home');
    }
  };

  const handleFormSubmit = async (values: any, onSubmitProps: any) => {
    console.log(values);
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Box
              display={'grid'}
              gap={'30px'}
              gridTemplateColumns="repeat(4,minmax(0,1fr))"
              sx={{
                '&>div': { gridColumn: isNonMobile ? undefined : 'span 4' }
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label="Last Name"
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label="Email"
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    label="Phone Number"
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    name="phone"
                    error={Boolean(touched.phone) && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    label="Location"
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    required
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <Box
                    gridColumn={'span 4'}
                    border={`1px solid ${palette.secondary.main}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      accept={acceptedFiles}
                      multiple={false}
                      onDrop={(acceptedFile) =>
                        setFieldValue('picture', acceptedFile[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ '&:hover': { cursor: 'pointer' } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlined />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}
              <TextField
                label="Username"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={Boolean(touched.userName) && Boolean(errors.userName)}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label="Password"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 4' }}
              />
              {isRegister && (
                <TextField
                  label="Confirm Password"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={
                    Boolean(touched.confirmPassword) &&
                    Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: 'span 4' }}
                />
              )}
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: '2rem 0',
                  p: '1rem',
                  backgroundColor: palette.primary.main,
                  color: palette.background.paper
                }}
              >
                {isLogin ? 'LOGIN' : 'REGISTER'}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? 'register' : 'login');
                  resetForm();
                }}
                sx={{
                  textDecoration: 'underline',
                  color: palette.primary.main
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : 'Already have an account? Login here.'}
              </Typography>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default Form;

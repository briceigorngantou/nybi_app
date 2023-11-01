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

const registerSchema = Yup.object().shape({
  lastName: Yup.string().required('lastName is required'),
  email: Yup.string().email().required('email is required'),
  password: Yup.string().required('password is required'),
  location: Yup.string().required('location is required'),
  occupation: Yup.string().required('occupation is required'),
  picture: Yup.string().required('picture is required'),
  firstName: Yup.string().required('firstName is required')
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('email is required'),
  password: Yup.string().required('password is required')
});

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: File
};

const initialValuesLogin = {
  email: '',
  password: '',
  firstName: undefined,
  lastName: undefined,
  location: undefined,
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
    console.log(values);
  };

  const login = async (values: any, onSubmitProps: any) => {
    // api call here
    console.log(values);
  };

  const handleFormSubmit = async (values: any, onSubmitProps: any) => {
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
                    label="Location"
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
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 4' }}
              />
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
                  color: palette.background.paper,
                  '&:hover': { color: palette.primary.main }
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
                  color: palette.primary.main,
                  '&:hover': {
                    cursor: 'pointer',
                    color: palette.primary.light
                  }
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

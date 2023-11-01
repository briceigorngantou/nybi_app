/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  PlayLesson
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';

const UserWidget = ({ userId = '', picturePath = '' }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.token);
  const { dark, main } = palette.secondary;
  const medium = palette.secondary.contrastText;

  const getUser = async () => {
    // api call here
  };
};

export default UserWidget;

/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';
import { patchFriend } from 'apis/friends.api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import { setFriends } from 'state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';

const Friend = ({
  friendId = '',
  name = '',
  subtitle = '',
  userPicturePath = ''
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);
  const friends = useSelector((state: any) => state.user.friends) || [];

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const { main } = palette.secondary;
  const medium = palette.secondary.dark;

  const isFriend = friends.find((friend: any) => friend.id === friendId);

  const patchFriendResult = async () => {
    const result = await patchFriend(id, friendId, token);
    if (result.status === 200 || result.status === 201) {
      dispatch(setFriends({ friends: result.data }));
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant={'h5'}
            fontWeight={'500'}
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer'
              }
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriendResult()}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;

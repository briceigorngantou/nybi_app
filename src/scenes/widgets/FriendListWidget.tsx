/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getAllFriends } from 'apis/friends.api';
import { setFriends } from 'state';
import WidgetWrapper from 'components/WidgetWrapper';
import Friend from 'components/Friend';

const FriendListWidget = ({ userId = '' }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state: any) => state.token);
  const friends = useSelector((state: any) => state.user.friends) || [];

  const getFriends = async () => {
    const result = await getAllFriends(userId, token);
    if (result.status === 200 || result.status === 201) {
      dispatch(setFriends({ friends: result.data }));
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.secondary.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Friend List
      </Typography>
      <Box display={'flex'} flexDirection="column" gap="1.5rem">
        {friends.map((friend: any) => (
          <Friend
            key={friend.id}
            friendId={friend.id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;

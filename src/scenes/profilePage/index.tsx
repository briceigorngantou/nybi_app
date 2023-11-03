/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import FriendListWidget from 'scenes/widgets/FriendListWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import UserWidget from 'scenes/widgets/UserWidget';
import { getUserById } from 'apis/users.api';
import Navbar from 'scenes/navbar';
import PostsWidget from 'scenes/widgets/PostsWidget';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const { userId } = useParams();
  const token = useSelector((state: any) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  const getUser = async () => {
    const result = await getUserById(userId || '', token);
    if (result.status === 200 || result.status === 201) {
      setUser(result.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding={'2rem 6%'}
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap={'2rem'}
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

/* eslint-disable no-console */
import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import AdvertWidget from 'scenes/widgets/AdvertWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import Navbar from 'scenes/navbar';
import UserWidget from 'scenes/widgets/UserWidget';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { id, picturePath } = useSelector((state: any) => state.user);
  console.log(id, picturePath);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent={'space-between'}
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget
            userId={id}
            picturePath={
              picturePath ||
              'https://firebasestorage.googleapis.com/v0/b/nybi-app.appspot.com/o/uploads%2Fprofile%2Faccount.png?alt=media'
            }
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget
            picturePath={
              picturePath ||
              'https://firebasestorage.googleapis.com/v0/b/nybi-app.appspot.com/o/uploads%2Fprofile%2Faccount.png?alt=media'
            }
          />
          <PostsWidget userId={id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis={'26%'}>
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;

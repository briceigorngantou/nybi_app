/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined
} from '@mui/icons-material';
import React, { useState } from 'react';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import { setPost } from 'state';
import WidgetWrapper from 'components/WidgetWrapper';
import { patchLikeApi } from 'apis/friends.api';

const PostWidget = ({
  postId = '',
  postUserId = '',
  name = '',
  description = '',
  location = '',
  picturePath = '',
  userPicturePath = '',
  likes = [],
  comments = []
}) => {
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.token);
  const loggedInUserId = useSelector((state: any) => state.user.id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = likes.length;

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const { main } = palette.secondary;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await patchLikeApi(postId, token);
    if (response.status === 200 || response.status === 201) {
      dispatch(setPost({ post: response.data }));
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={
            picturePath ||
            'https://firebasestorage.googleapis.com/v0/b/nybi-app.appspot.com/o/uploads%2Fprofile%2Frectangle.png?alt=media'
          }
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap={'1rem'}>
          {/* LIKE SECTION */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/* COMMENT SECTION */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComment && (
        <Box mt="0.5rem">
          {comments.map((item, key) => (
            <Box key={`${name}-${key}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {item}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};
export default PostWidget;

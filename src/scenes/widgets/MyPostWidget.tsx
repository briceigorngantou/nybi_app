/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  VideocamOutlined,
  MicOutlined,
  MoreHorizOutlined
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery
} from '@mui/material';
import Dropzone from 'react-dropzone';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import { setPosts } from 'state';
import WidgetWrapper from 'components/WidgetWrapper';
import { userSavePost } from 'apis/posts.api';

const MyPostWidget = ({ picturePath = '' }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [post, setPost] = useState('');
  const { palette } = useTheme();
  const { id } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const mediumMain = palette.secondary.dark;
  const medium = palette.secondary.main;

  const handlePost = async () => {
    const data = {
      description: post,
      userId: id,
      picture: image,
      picturePath: image?.name // Replace na by path of image
    };
    const postSaved = await userSavePost(data);
    if (postSaved.status === 200 || postSaved.status === 201) {
      dispatch(setPosts({ postSaved }));
      setImage(null);
      setPost('');
    }
  };

  const acceptedFiles = {
    'image/jpeg': ['.png', '.jpeg', '.jpg']
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.secondary.light,
            borderRadius: '2rem',
            padding: '1rem 2rem'
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt={'1rem'}
          p={'1rem'}
        >
          <Dropzone
            accept={acceptedFiles}
            multiple={false}
            onDrop={(acceptedFile: any) => setImage(acceptedFile[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width={'100%'}
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '15%' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: '1.25rem 0' }} />
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ '&:hove': { cursor: 'pointer', color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <VideocamOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Video</Typography>
            </FlexBetween>
          </>
        ) : (
          <>
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          </>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.paper,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem'
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;

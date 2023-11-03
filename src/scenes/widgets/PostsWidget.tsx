/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPosts } from 'state';
import { getAllPosts, getAllUserPosts } from 'apis/posts.api';
import PostWidget from './PostWidget';

const PostsWidget = ({ userId = '', isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.posts);
  const token = useSelector((state: any) => state.token);

  const getPosts = async () => {
    const response = await getAllPosts(token);
    if (response.status === 200 || response.status === 201) {
      dispatch(setPosts({ posts: response.data }));
    }
  };

  const getUserPosts = async () => {
    const result = await getAllUserPosts(userId, token);
    if (result.status === 200 || result.status === 201) {
      dispatch(setPosts({ posts: result.data }));
    }
  };

  useEffect(() => {
    if (!isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  });

  return (
    <>
      {/* {posts.map((values: any) => ( */}
      <PostWidget
        //   key={values.id}
        //   postId={values.id}
        //   postUserId={values.userId}
        //   name={`${values.firstName} ${values.lastName}`}
        //   description={values.description}
        //   location={values.location}
        //   picturePath={values.picturePath}
        //   userPicturePath={values.userPicturePath}
        //   likes={values.likes}
        //   comments={values.comments}
        key={1}
        postId={'1'}
        postUserId={'3'}
        name={'Qwerty'}
        description={'values.description'}
        location={'values.location'}
        picturePath={
          'https://firebasestorage.googleapis.com/v0/b/nybi-app.appspot.com/o/uploads%2Fprofile%2Frectangle.png?alt=media'
        }
        userPicturePath={
          'https://firebasestorage.googleapis.com/v0/b/nybi-app.appspot.com/o/uploads%2Fprofile%2Faccount.png?alt=media'
        }
        likes={[]}
        comments={[]}
      />
      {/* ))} */}
    </>
  );
};

export default PostsWidget;

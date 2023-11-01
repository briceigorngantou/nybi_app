/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable react/react-in-jsx-scope */
import { Box } from '@mui/material';

const UserImage = (image = '', size = '60px') => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={`https://drive.google.com/file/d/1beIr-Qk0IkV3HLoLBmOTfd_rbXRQhKcv/view?usp=drive_link${image}`}
      />
    </Box>
  );
};

export default UserImage;

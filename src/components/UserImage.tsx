/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable react/react-in-jsx-scope */
import { Box } from '@mui/material';

const UserImage = ({ image = '', size = '50px' }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={`${image}`}
      />
    </Box>
  );
};

export default UserImage;

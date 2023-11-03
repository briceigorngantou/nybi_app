/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form';

const LoginPage = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const theme = useTheme();
  const neutralLight = theme.palette.secondary.light;
  const { dark } = theme.palette.secondary;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.paper;
  const isNonMobileScreen = useMediaQuery('(min-width:1000px)');
  return (
    <Box>
      <Box width={'100%'} bgcolor={alt} p="1rem 6%" textAlign={'center'}>
        <Typography
          fontWeight={'bold'}
          fontSize={'32px'}
          color="primary"
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer'
            }
          }}
        >
          NYBI APP
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreen ? '50%' : '93%'}
        p={'2rem'}
        m={'2rem auto'}
        borderRadius="1.5rem"
        bgcolor={alt}
      >
        <Typography fontWeight={'500'} variant="h5" sx={{ mb: '1.5rem' }}>
          Welcome to NYBI, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;

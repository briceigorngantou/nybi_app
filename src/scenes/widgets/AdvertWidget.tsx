/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Typography, useTheme } from '@mui/material';
import React from 'react';

import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const { dark } = palette.secondary;
  const { main } = palette.secondary;
  const medium = palette.secondary.light;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight={'500'}>
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
        src={
          'https://firebasestorage.googleapis.com/v0/b/nybi-app.appspot.com/o/uploads%2Fprofile%2Frectangle.png?alt=media'
        }
      />
      <FlexBetween>
        <Typography color={main} m="0.5rem 0">
          Your pathway to stunning and immaculate beauty and made sure you skin
          is exfoliating skin and shining like light.
        </Typography>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default AdvertWidget;

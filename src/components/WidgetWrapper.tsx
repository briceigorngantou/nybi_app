/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: '1.25rem 1rem 0.75rem 1rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '0.75rem'
}));

export default WidgetWrapper;

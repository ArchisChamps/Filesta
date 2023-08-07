import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/system';

const Loader = ({isLoading}) => {

  if(!isLoading) return null;
  return (
    <Container
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Container>
  )
}

export default Loader

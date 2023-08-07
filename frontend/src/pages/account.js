import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import loginService from 'src/service/login-service';
import { useEffect, useState } from 'react';
import { UniversalSnackbar } from 'src/components/universal-snackbar';

const Page = () => {
  const [values, setValues] = useState({
    userId:'',
    name: '',
    email: '',
    company: '',
    phoneNumber: '',
    country: '',
    avatar:'',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [openSnck, setOpenSnck] = useState(false);
  
  const fetchData = async () => {
    try {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const response = await fetch(`http://localhost:8080/user/${sessionStorage.getItem('id')}`, requestOptions);
      const jsonData = await response.json();
      setValues(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state or display an error message
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  },[]);
  
  return(
  <>
    <Head>
      <title>
        Account | Filesta
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile values={values} setValues={setValues}/>
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails values={values} setValues={setValues} setMessage={setMessage} setSeverity={setSeverity} setOpenSnck={setOpenSnck}/>
              </Grid>
              {openSnck && <UniversalSnackbar open={openSnck} setOpen={setOpenSnck} severity={severity} message={message}/>}
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>)
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

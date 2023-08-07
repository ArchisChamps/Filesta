import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useRouter } from 'next/router';


export const AccountProfileDetails = ({values, setValues, setMessage, setSeverity, setOpenSnck}) => {
  const router = useRouter();
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    let sanitizedValue = value; // Initialize sanitizedValue with the current value

    // Restrict non-numeric input only for the phoneNumber field
    if (name === 'phoneNumber') {
      sanitizedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
    }

    setValues((prevState) => ({
      ...prevState,
      [name]: sanitizedValue, // Use the sanitizedValue for phoneNumber, or the original value for other fields
    }));
  }, [setValues]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        "userId": sessionStorage.getItem("id"),
        "name": values?.name,
        "country": values?.country,
        "company": values?.company,
        "phoneNumber": values?.phoneNumber
      });
      
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      const response = await fetch("http://localhost:8080/user/update-user", requestOptions);
      const result = await response.text();
  
      setSeverity('success');
      setMessage('User information updated successfully');
      setOpenSnck(true);
      router.push("./account");
    } catch (error) {
      setSeverity('error');
      setMessage('Something went wrong');
      setOpenSnck(true);
      console.log('error', error);
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: 1 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  disabled={true}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={handleChange}
                  type="number"
                  value={values?.phoneNumber}
                  InputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Company Name"
                  name="company"
                  onChange={handleChange}
                  value={values.company}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

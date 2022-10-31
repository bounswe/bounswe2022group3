import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from "../../components/Button/Button";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Divider,
  CardHeader,
  TextField,
} from '@mui/material';
import { API_URL } from "../../next.config";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import UserLayout from '../../layouts/user-layout/UserLayout';


const post = { //getpersonalınfo request adding backend then this will be deleted 
  'id': '634cf129a727c14722a631fa',
  'name': 'Muhammet',
  'avatar': 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp  ',
  'surname': 'Sen',
  'personal_info': {
    'bio': 'Hi! I am Muhammet. I am a junior computer engineering student. I have several projects and jobs going on. I am interested in backend development and DevOps',
    'badges': [
      {
        'id': '634cdf1fc580bb9493dd4490',
        'title': 'Master of Probabilties',
        'description': 'Easily calculates the probabilty of two people having the same birthday',
        'earned_at': '2022-10-17T08:02:07.309Z'
      },
    ],
    'interests': ['playing chess']
  },
  'is_private': true
}

export default function profile(props) {
  const router = useRouter();
  const { user_id } = router.query;

  const [values, setValues] = useState({
    name: '',
    surname: ''
  });

  const get_user = async () => {
    if (user_id) {
      try {
        const res = (
          await axios.get(`${API_URL}/userProfile/getProfile/${user_id}`)
        )?.data
        console.log(res)
        if (res) {
          setValues(res.profile);
        }
      } catch (e) {
        console.log(e);
      }
    }

  }

  useEffect(() => {
    get_user();
  }, [router.query]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <Box
        style={{minHeight: "100vh"}}
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
          backgroundColor: '#F2F1F8'
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
              sx={{ 'background-color': '#F2F1F8' }}
            >
              <Card {...props} >
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Avatar
                      src={post.avatar}
                      sx={{
                        height: 64,
                        mb: 2,
                        width: 64
                      }}
                    />
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="h5"
                    >
                      {values.name} {values.surname}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    color="primary"
                    fullWidth
                    variant="text"
                  >
                    Upload picture
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <form
                autoComplete="off"
                noValidate
                {...props}
              >
                <Card>
                  <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                  />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                      sx={{ height: '95%', width: '80%', margin: 'auto' }}
                    >
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          helperText="Please specify the first name"
                          label="First name"
                          name="name"
                          onChange={handleChange}
                          required
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          id="outlined-required"
                          fullWidth
                          label="Last name"
                          name="surname"
                          onChange={handleChange}
                          required
                          value={values.surname}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Personal Info"
                          name="personal_info"
                          multiline
                          onChange={handleChange}
                          required
                          value={post.personal_info.bio}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Badges"
                          name="badge"
                          onChange={handleChange}
                          disabled
                          value={post.personal_info.badges[0].title}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Intrests"
                          name="intrest"
                          onChange={handleChange}
                          disabled
                          value={post.personal_info.interests[0]}
                          variant="outlined"
                        >
                        </TextField>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2
                    }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                    >
                      Update Profile Page
                    </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </>
  );
}

profile.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>;
};
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

const handleChange = (event) => {
  setValues({
    ...values,
    [event.target.name]: event.target.value
  });
};
const post = {
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
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
          backgroundColor: '#889bdd'
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
              sx={{ 'background-color': '#889bdd' }}
            >
              <Card {...props}>
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
                      {post.name}
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
                          name="firstName"
                          onChange={handleChange}
                          required
                          value={post.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Last name"
                          name="lastName"
                          onChange={handleChange}
                          required
                          value={post.surname}
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
                          name="bio"
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


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
  InputLabel,
  Autocomplete,
  Chip
} from '@mui/material';
import { API_URL } from "../../next.config";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import UserLayout from '../../layouts/user-layout/UserLayout';

let owner_id = ''

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
  const [personal_infos, setPersonal_info] = useState({
    bio: '',
    interests: '',
    knowledge: ''
  });
  const [personalValues, setValues] = useState({
    id: '',
    name: '',
    surname: '',
    email: '',
    image: '',
    is_private: true
  });
  const [tags, setTags] = useState([]);
  const [knowledgeTags, setKnowledgeTags] = useState([]);
  const get_user = async () => {
    if (user_id) {
      try {
        const res = (
          await axios.get(`${API_URL}/userProfile/getProfile/${user_id}`)
        )?.data
        console.log(res)
        if (res) {
          setValues(res.profile);
          setPersonal_info(res.profile.personal_info)
          setTags(res.profile.personal_info.interests)
          setKnowledgeTags(res.profile.personal_info.knowledge)

        }
      } catch (e) {
        console.log(e);
      }
    }

  }
  useEffect(() => {
    get_user();
    owner_id = localStorage.getItem('user_id');
  }, [user_id]);

  const handleChange = (event) => {
    setValues({
      ...personalValues,
      [event.target.name]: event.target.value
    });
    setPersonal_info({
      ...personal_infos,
      [event.target.name]: event.target.value
    });
  };

  const onClick = async () => {

    const body = {
      "bio": personal_infos.bio,
      "interests": tags,
      "knowledge": knowledgeTags
    };

    console.log(body)
    try {
      const res = (await axios.post(`${API_URL}/userProfile/updateProfile`, body))
      console.log(res)
      alert("Profile Updated")
    } catch (err) {
      console.log(err);
    }
  }
  let isOwner = true;
  if(owner_id === user_id ){
    isOwner = true;
  }else{
    isOwner = false;
  }

  return (
    <>
      {isOwner ? (<Box
        style={{ minHeight: "100vh" }}
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
                      src={`${API_URL}/user/${personalValues.image}`}
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
                      {personalValues.name} {personalValues.surname}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                      {personalValues.email}
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
              <Grid
                container
                spacing={3}
                sx={{ height: '95%', width: '80%', margin: 'auto' }}
              >
              </Grid>
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <form
                autoComplete="off"
                onSubmit={onClick}
              >
                <Card>
                  <CardHeader
                    subheader="These informations can be edited"
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
                          value={personalValues.name}
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
                          helperText="Please specify the last name"
                          label="Last name"
                          name="surname"
                          onChange={handleChange}
                          required
                          value={personalValues.surname}
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
                          helperText="Please specify the email"
                          label="Email"
                          name="email"
                          multiline
                          onChange={handleChange}
                          required
                          value={personalValues.email}
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
                          value={personal_infos.bio}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                       <Autocomplete
                            multiple
                            id="tags-filled"
                            options={knowledgeTags}
                            value={knowledgeTags}
                            defaultValue={[knowledgeTags]}
                            freeSolo
                            onChange={(e) => setKnowledgeTags([...knowledgeTags, e.target.value])}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Knowledge"         
                              />
                            )}
                          />
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                <Autocomplete
                            multiple
                            id="tags-filled"
                            options={tags}
                            value={tags}
                            defaultValue={[tags]}
                            freeSolo
                            onChange={(e) => setTags([...tags, e.target.value])}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined" 
                                label="Interest"        
                              />
                            )}
                          />
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
                      type="button"
                      onClick={onClick}
                    >
                      Edit Profile Page
                    </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
      ) : (personalValues.is_private ? (<Box
        style={{ minHeight: "100vh" }}
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
                      src={`${API_URL}/user/${personalValues.image}`}
                      sx={{
                        height: 64,
                        mb: 2,
                        width: 64
                      }}
                    />
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="h6"
                    >
                      {personalValues.name} {personalValues.surname}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
              </Card>
              <Grid
                container
                spacing={3}
                sx={{ height: '95%', width: '80%', margin: 'auto' }}
              >
              </Grid>
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <form
                autoComplete="off"
              >
                <Card>
                  <CardHeader
                    subheader="This profile is private profile"
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
                        md={12}
                        xs={12}
                      >
                        <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                          <Grid item xs={2} sm={4} md={4} >
                            <Typography
                              color="textPrimary"
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {personalValues.name} {personalValues.surname}
                            </Typography>
                          </Grid>
                          <Grid item xs={2} sm={4} md={4} >
                            <Typography
                              color="textPrimary"
                              gutterBottom
                              variant="h5"
                              component="div">
                              Follower
                            </Typography>
                            <Typography
                              color="textPrimary"
                              gutterBottom
                              variant="h5"
                              component="div">
                              55
                            </Typography>
                          </Grid>
                          <Grid item xs={2} sm={4} md={4} >
                            <Typography
                              color="textPrimary"
                              gutterBottom
                              variant="h5"
                              component="div">
                              Followed
                            </Typography>
                            <Typography
                              color="textPrimary"
                              gutterBottom
                              variant="h5"
                              component="div">
                              55
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <details>
                          <summary><b>About Me</b></summary>
                          <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h6"
                          >
                            {personal_infos.bio}
                          </Typography>
                        </details>
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
                      Follow
                    </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>) : (<Box
        style={{ minHeight: "100vh" }}
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
                      src={`${API_URL}/user/${personalValues.image}`}              
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
                      {personalValues.name} {personalValues.surname}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                      {personalValues.email}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
              </Card>
              <Grid
                container
                spacing={3}
                sx={{ height: '95%', width: '80%', margin: 'auto' }}
              >
              </Grid>
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <Card>
                <CardHeader
                  subheader="This Profile is public"
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
                      <InputLabel shrink>
                        First Name
                      </InputLabel>
                      <TextField
                        fullWidth
                        //label="First name"
                        name="name"
                        onChange={handleChange}
                        disabled
                        value={personalValues.name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <InputLabel shrink>
                        Last Name
                      </InputLabel>
                      <TextField
                        id="outlined-required"
                        fullWidth
                        //label="Last name"
                        disabled
                        onChange={handleChange}
                        required
                        value={personalValues.surname}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <InputLabel shrink>
                        Personal Info
                      </InputLabel>
                      <TextField
                        fullWidth
                        name="bio"
                        multiline
                        disabled
                        onChange={handleChange}
                        value={personal_infos.bio}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <InputLabel shrink>
                        Knowledge
                      </InputLabel>
                      <Autocomplete
                            multiple
                            id="tags-filled"
                            options={knowledgeTags}
                            value={knowledgeTags}
                            defaultValue={[knowledgeTags]}
                            disabled
                            readOnly
                            freeSolo                       
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"        
                              />
                            )}
                          />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                        >
                          <InputLabel shrink>
                            Interests
                          </InputLabel>
                          <Autocomplete
                            multiple
                            id="tags-filled"
                            options={tags}
                            value={tags}
                            defaultValue={[tags]}
                            disabled
                            readOnly
                            freeSolo
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"     
                              />
                            )}
                          />

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
                    type="button"
                  >
                    Follow
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>)
      )}
    </>
  );
}
profile.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>;
};
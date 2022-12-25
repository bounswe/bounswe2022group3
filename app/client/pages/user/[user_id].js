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
import UserLayout2 from '../../layouts/user-layout2/UserLayout2';

let owner_id = ''
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
  
  const [tagList, setTagList] = useState([]);
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
  const get_tags = async () => {
    try {
      const res = (
        await axios.get(`${API_URL}/userProfile/getTags`)
      )?.data
      console.log(res)
      if (res) {
        setTagList(res.words);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    get_user();
    get_tags();
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
  const follow = async () => {
    const body = {
      "user_id": user_id
    };
    try {
      const res = (await axios.post(`${API_URL}/userProfile/follow`, body))
      console.log(res)
      get_user();
    } catch (err) {
      console.log(err);
    }
  }
  const unFollow = async () => {
    const body = {
      "user_id": user_id
    };
    try {
      const res = (await axios.post(`${API_URL}/userProfile/unfollow`, body))
      console.log(res)
      get_user();
    } catch (err) {
      console.log(err);
    }
  }


  let isOwner = true;
  if (owner_id === user_id) {
    isOwner = true;
  } else {
    isOwner = false;
  }

  return (
    <>
      {
        isOwner ?
          (
            <Box
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
                                options={tagList}
                                value={knowledgeTags}
                                defaultValue={[knowledgeTags]}
                                filterSelectedOptions
                                onChange={(e, val) => {
                                  setKnowledgeTags([...val])
                                }
                                }
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
                                options={tagList}
                                value={tags}
                                defaultValue={[tags]}
                                filterSelectedOptions
                                onChange={(e, val) => {
                                  setTags([...val])
                                }
                                }
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
            // ******************************************************************************************* users own profile


          ) :
          (
            <Box
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
                            flexDirection: 'column',
                            paddingTop: "20px"
                          }}
                        >
                          <Avatar
                            src={`${API_URL}/user/${personalValues.image}`}
                            sx={{
                              height: 200,
                              mb: 2,
                              width: 200
                            }}
                          />
                          <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                          >
                            {personalValues.name} {personalValues.surname}
                          </Typography>
                        {  !personalValues.follower_users?.filter(user => user._id == owner_id).length ?
                       
                             ( 

                              <Button
                              color="primary"
                              variant="contained"
                              style={{ width: "200px" }}
                              onClick={follow}
                            >
                              follow
                            </Button>
                              )
                            :
                            
                            (
                              <Button
                              color="primary"
                              variant="contained"
                              style={{ width: "200px" }}
                              onClick={unFollow}
                            >
                              UnFollow
                            </Button>

                              )
                          
                          }

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
                      <CardContent style={{ paddingBottom: "50px" }}>
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
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          )}
    </>
  );
}
profile.getLayout = function getLayout(page) {
  return <UserLayout2>{page}</UserLayout2>;
};

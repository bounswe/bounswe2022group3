import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Grid from '@mui/material/Grid';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import styles from '../../styles/course/courseSummary.module.scss'
import { useRouter } from 'next/router'
import { API_URL } from "../../next.config";
import { useEffect, useState } from "react";
import axios from "axios";
import UserLayout from "../../layouts/user-layout/UserLayout";

export default function courseSummary() {
  const [post, setPost] = useState({});
  const router = useRouter();
  let space_id = router.query;;


  async function fetchContent() {
    try {
      const response = (
        await axios.get(API_URL + "/course/" + space_id.space_id)
      )?.data;
      setPost(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    space_id = router.query;
    if(!space_id) {
      return;
    }
    fetchContent();
  }, [space_id]);

  function handleSubmit() {
    const token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    async function enroll() {
      try {
        const response = (
          await axios.post(API_URL + "/enrollment", {course_id: space_id.space_id, user_id: user_id} )
        )?.data;
        router.push(`/my/spaces/` + space_id.space_id + '/resources');
      } catch (err) {
        console.log(err);
      }
    }
    enroll();
    if (!(token)) {
      router.push(`/user/login`);
    }
    if (post.enrolled) {
      router.push(`/my/spaces/` + space_id.space_id + '/resources');
    } else {
      enroll();   //if user not enrolled, enroll first
    }

  };
  return (
    < >
      <Grid container className={styles.description}  >
        < Grid container className={styles.left} >

          <Grid item sx={{ margin: 'auto', width: '100%' }}>
            <h1   >
              {post?.course?.name}
            </h1>
          </Grid>

          <Grid item>
            <h2 >
              {post?.course?.rating}
            </h2>
          </Grid>
          <Grid item >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div className={styles.emptyStars} ></div>
              <div className={styles.fullStars} style={{ width: post?.rating * 100 / 5 + '%' }}></div>
            </div>
          </Grid>
          <Grid item >
            <h2 >
              {post?.course?.lecturer?.name}
              <span style={{'margin-left': '10px'}}>{post?.course?.lecturer?.surname}</span>

            </h2>
          </Grid>

          <Grid item sx={{ width: '100%' }}  >
            <Button fullWidth variant="contained" sx={{ width: '100%' }} onClick={() => { handleSubmit() }}>
              <h1   >
                {post?.enrolled ? "Check Details" : "Join In!"}
              </h1>
            </Button>

          </Grid>

        </Grid>

        <Grid container variant="contained" className={styles.right}>
          <img src={post?.course?.image} className={styles.descriptionImage} />
        </Grid>


      </Grid>
      <Container style={{ marginBottom: 80 }} className={styles.details} >

        <Box sx={{ overflow: 'hidden', minWidth: 250, mt: 1 }}>
          <Paper variant='outlined' style={{ marginBottom: 20 }}>
            <Grid container spacing={2} style={{ marginBottom: 20, padding: 35 }}>

              <Grid item sx={{ width: '100%' }}>
                <h1>
                  About Learning Space
                </h1>

              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <p>
                  {post?.course?.course_info}

                </p>
                <Grid item style={{
                  width: '100%', display: 'flex',
                  flexWrap: 'wrap'
                }}>
                  {post?.course?.tags?.map((tag, index) => {
                    return (
                      <Paper variant='elevation' key={index} style={{ marginRight: 12, marginTop: 19, padding: 4 }}>
                        <h3 >
                          {tag}
                        </h3>
                      </Paper>)
                  })}
                </Grid>

              </Grid>
            </Grid>
          </Paper>
          <Paper variant='outlined' >
            <Grid container spacing={2} style={{ marginBottom: 12, padding: 35 }}>
              <Grid item sx={{ width: '100%' }}>
                <h1 >
                  Resources
                </h1>
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <Table sx={{ minWidth: 250 }} >
                  <TableHead>
                    <TableRow>
                      <TableCell><h3> Sections </h3></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {post?.course?.chapters?.map((chapter, index) => {
                      return (
                        <TableRow key={index} >
                          <TableCell><h4 > - {chapter.chapter_name}</h4></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Paper>
        </Box>

      </Container>
    </>
  );
}

courseSummary.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>;
};

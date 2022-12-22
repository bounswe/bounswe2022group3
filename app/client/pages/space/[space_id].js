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
import UserLayout2 from "../../layouts/user-layout2/UserLayout2";

export default function courseSummary() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const router_query = router.query;


  async function fetchContent() {
    try {
      if(router_query?.space_id !== undefined) {
        const response = (
          await axios.get(API_URL + "/space/" + router_query.space_id)
        );
        setPost(response?.data);
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchContent();
  }, [router_query]);

  function handleSubmit() {
    const token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    async function enroll() {
      try {
        const response = (
          await axios.post(API_URL + "/enrollment", {space_id: router_query.space_id} )
        )?.data;
        router.push(`/my/spaces/` + router_query.space_id + '/resources');
      } catch (err) {
        console.log(err);
      }
    }

    if (!(token)) {
      router.push(`/user/login`);
    }
    if (post.enrolled) {
      router.push(`/my/spaces/` + router_query.space_id + '/resources');
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
              {post?.space?.name}
            </h1>
          </Grid>

        
          <Grid item >
            <div style={{ position: 'relative' }} sx={{ margin: 'auto', width: '100%' }}>
              <div className={styles.emptyStars} ></div>
              <div className={styles.fullStars} style={{ width: post?.space?.rating * 100 / 5 + '%' }}></div>
            </div>
          </Grid>
          <Grid item sx={{ width: '100%' }}  >
            <h2 >
              {post?.space?.creator?.name}
              <span style={{marginLeft: '10px'}}>{post?.space?.creator?.surname}</span>
            </h2>
          </Grid>

          <Grid item sx={{ width: '100%' }}  >
            <Button fullWidth variant="contained" sx={{ width: '200px' }} onClick={() => { handleSubmit() }}>
              <span   >
                {post?.enrolled ? "Check Details" : "Join In!"}
              </span>
            </Button>

          </Grid>

        </Grid>

        <Grid item variant="contained" className={styles.right}>
          <img src={post?.space?.image} className={styles.descriptionImage} />
        </Grid>


      </Grid>
      <Container style={{ marginBottom: 80 }} className={styles.details} >

        <Box sx={{ overflow: 'hidden', minWidth: 250, mt: 1 }}>
          <Paper variant='outlined' style={{ marginBottom: 5, border: 0 }}>
            <Grid container spacing={2} style={{ marginBottom: 5, padding: 35 }}>

              <Grid item sx={{ width: '100%' }}>
                <h1>
                  About Learning Space
                </h1>

              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <p>
                  {post?.space?.info}

                </p>
                <Grid item style={{
                  width: '100%', display: 'flex',
                  flexWrap: 'wrap'
                }}>
                  {post?.space?.tags?.map((tag, index) => {
                    return (
                      <Paper className={styles.spaceTag} variant='elevation' key={index} style={{ marginRight: 12, marginTop: 19}}>
                        <h3 >
                          {tag}
                        </h3>
                      </Paper>)
                  })}
                </Grid>

              </Grid>
            </Grid>
          </Paper>
          <Paper variant='outlined' style={{border: 0}}>
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
                      <TableCell><h3> Topics </h3></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {post?.space?.topics?.map((chapter, index) => {
                      return (
                        <TableRow key={index} >
                          <TableCell><h4 > - {chapter.name}</h4></TableCell>
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
  return <UserLayout2>{page}</UserLayout2>;
};

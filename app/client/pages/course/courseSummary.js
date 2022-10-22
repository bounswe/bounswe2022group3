import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import styles from '../../styles/course/courseSummary.module.scss'
import { popoverClasses } from '@mui/material';



const post = {
  'id': '634cdb493619c990775bac2f',
  'title': 'Data Science Fundamentals with Python',
  'course_info': 'Data Science is one ofData Science is one of Data Science is one of the hottest professions of the decade, and the demand for d Data Science is one of the hottest professions of the decade, and the demand for data scientists Data the hottest professions of the decade, and the demand for data scientists Data Science is one of the hottest professions of the decade, and the demand for data scientists',
  'rating': 4.2,
  'lecturer': {
    'id': '634cdce8f7505e71322a9663',
    'name': 'Andkew MG',
    'email': 'andkew.mg@boun.edu.tr', // for send email button
    'is_confirmed': true,
    'image': 'https://buacademy.com/static/image/634cdce8f7505e71322a9663'
  },
  'tags': ['data science', 'computer science', 'python'],
  'chapters': [
    {
      'id': '634cde32693cd0c82806e64c',
      'chapter_name': 'Introduction & Descriptive Statistics',
    },
    {
      'id': '634cde8a9dbd91c3a2c97324',
      'chapter_name': 'Data Visualization',
    },
    {
      'id': '634cde8fc2f25e1a7694d2f6',
      'chapter_name': 'Introduction to Probability Distributions',
    },
    {
      'id': '634cde32693cd0c82806e64c',
      'chapter_name': 'Introduction & Descriptive Statistics',
    },
    {
      'id': '634cde8a9dbd91c3a2c97324',
      'chapter_name': 'Data Visualization',
    },
    {
      'id': '634cde8fc2f25e1a7694d2f6',
      'chapter_name': 'Introduction to Probability Distributions',
    },
    {
      'id': '634cde32693cd0c82806e64c',
      'chapter_name': 'Introduction & Descriptive Statistics',
    },
    {
      'id': '634cde8a9dbd91c3a2c97324',
      'chapter_name': 'Data Visualization',
    },
    {
      'id': '634cde8fc2f25e1a7694d2f6',
      'chapter_name': 'Introduction to Probability Distributions',
    },
  ],
  'image': 'https://cdn.educba.com/academy/wp-content/uploads/2019/03/Introduction-To-Data-Science.jpg',
  'enrolled': true
}


///styles ekle şimdi 
//component ları ayrıştır
///layout sal 
export default function courseSummary() {


  return (
    < >
      <Grid container className={styles.description}  >
        < Grid container className={styles.left} >

          <Grid item sx={{ margin: 'auto', width: '100%' }}>
            <h1   >
              {post.title}
            </h1>
          </Grid>

          <Grid item>            
          <h2 >
              {post.rating}
            </h2>
            </Grid>
          <Grid item >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div className={styles.emptyStars} ></div>
              <div className={styles.fullStars} style={{ width: post.rating * 100 / 5 + '%' }}></div>
            </div>
          </Grid>
          <Grid item >
            <h2 >
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
              {post.lecturer.name}
            </h2>
          </Grid>

          <Grid item sx={{ width: '60%', width: '66%' }}  >
            <Button fullWidth variant="contained" sx={{ width: '100%' }}>
              <h1   >
                Enroll
              </h1>
            </Button>

          </Grid>

        </Grid>

        <Grid container className={styles.right}>
          <img src={post.image} style={{
            display: 'block',
            'margin-left': 'auto',
            'margin-right': 'auto', 
            height: '100%',
            width: '85%',
          }} />
        </Grid>


      </Grid>









      <Container sx={{ 'margin-bottom': '80px' }} className={styles.details} >

        <Box sx={{ overflow: 'hidden', minWidth: 250, mt: 1 }}>
          <Paper variant='outlined' sx={{ 'margin-bottom': 20 }}>
            <Grid container spacing={2} sx={{ 'margin-bottom': 20, padding: 5 }}>

              <Grid item sx={{ width: '100%' }}>
                <h1>
                  Course Description
                </h1>

              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <p>
                  {post.course_info}

                </p>
                <Grid item sx={{
                  width: '100%', display: 'flex',
                  'flex-wrap': 'wrap'
                }}>
                  {post.tags.map((tag) => {
                    return (
                      <Paper variant='elevation' sx={{ 'margin-right': 12, 'margin-top': 19,padding:1.3 }}>
                        <h3>
                          {tag}
                        </h3>
                      </Paper>)
                  })}
                </Grid>

              </Grid>
            </Grid>
          </Paper>
          <Paper variant='outlined' >
            <Grid container spacing={2} sx={{ 'margin-bottom': 20, padding: 5 }}>
              <Grid item sx={{ width: '100%' }}>
                <h1 >
                  Course Chapters
                </h1>
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <Table sx={{ minWidth: 250 }} >
                  <TableHead>
                    <TableRow>
                      <TableCell><h3> Chapter Name</h3></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {post.chapters.map((chapter, index) => {
                      return (
                        <TableRow>
                          <TableCell><h4> - {chapter.chapter_name}</h4></TableCell>
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

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



export default function courseSummary() {


  post.chapters.map((chapter) => {
    console.log(chapter.chapter_name)
  })

  return (
    < >
      <Grid sx={{ width: '100%', minHeight: 250, 'background-color': '#3D8BE0', height: 250, 'padding-top': 20 }}  >
        <Grid  sx={{ height: '95%', width: '80%', margin: 'auto' }}>
          < Grid container sx={{ float: 'left', width: '60%', height: '100%', padding: 3, 'grid-row-gap': 20}}>
            <Grid item xs={12} sx={{ margin: 'auto' }}>
              <Typography variant="h3"   >
                {post.title}
              </Typography>
            </Grid>
            <Grid item xs={6} >

              <Typography variant="h5"  >
                Rating:  {post.rating}
              </Typography>

              <Typography variant="h7"  >
                {post.lecturer.name}
              </Typography>
              <Typography variant="h7"  >
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
              </Typography>
              <Typography variant="h7"  >
                {post.lecturer.email}
              </Typography>
            </Grid>

            <Grid item xs={6} sx={{ width: '60%', 'background-color': '#3178C4' }}  >

              <Button fullWidth variant="contained" sx={{ width: '100%' }}>
                <Typography variant="h4"  >
                  Enroll
                </Typography>
              </Button>

            </Grid>

          </Grid>

          <Grid container sx={{ float: 'left', width: '40%', height: '100%', padding: 1 }}>
            <Grid item xs={12}>
              <Typography component="h8"   >
                <img src={post.image} style={{
                  display: 'block',
                  'margin-left': 'auto',
                  'margin-right': 'auto',
                  height: '95%',
                  width: '85%',
                }} />
              </Typography>

            </Grid>
          </Grid>

        </Grid>
      </Grid>
      <Container sx={{ 'margin-bottom': '80px' }}>

        <Box sx={{ overflow: 'hidden', minWidth: 250, mt: 1 }}>
          <Paper variant='outlined' sx={{ 'margin-bottom': 20 }}>
            <Grid container spacing={2} sx={{ 'margin-bottom': 20, padding: 5 }}>

              <Grid item sx={{ width: '100%' }}>
                <Typography variant="h4">
                  Course Description
                </Typography>

              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <Typography>
                  {post.course_info}

                </Typography>
                <Grid item sx={{
                  width: '100%', display: 'flex',
                  'flex-wrap': 'wrap'
                }}>
                  {post.tags.map((tag) => {
                    return (
                      <Paper variant='elevation' sx={{ 'margin-right': 7, 'margin-top': 19 }}>
                        <Typography sx={{ padding: 1 }}>
                          {tag}
                        </Typography>
                      </Paper>)
                  })}
                </Grid>

              </Grid>
            </Grid>
          </Paper>
          <Paper variant='outlined' >
            <Grid container spacing={2} sx={{ 'margin-bottom': 20, padding: 5 }}>
              <Grid item sx={{ width: '100%' }}>
                <Typography variant="h4">
                  Course Chapters
                </Typography>
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <Table sx={{ minWidth: 250 }} >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                      </TableCell>
                      <TableCell>Chapter Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {post.chapters.map((chapter, index) => {
                      return (
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{chapter.chapter_name}</TableCell>
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

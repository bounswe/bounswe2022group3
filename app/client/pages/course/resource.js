
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

const chapters = [
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
]
export default function resource() {


    return (

        <Grid container spacing={2} style={{ marginBottom: 12, padding: 35 }}>

            <Grid item sx={{ width: '80%' }}>
                <Table sx={{ minWidth: 250 }} >
                    <TableRow>
                        <TableCell><h3> Sections </h3></TableCell>
                    </TableRow>
                    <TableBody>
                        {chapters.map((chapter, index) => {
                            return (
                                <TableRow key={index} >
                                    <TableCell>
                                        <Box>
                                            <h4 > {chapter.chapter_name}</h4>
                                            &nbsp;
                                            <h5>some text </h5>
                                            &nbsp;
                                            <h5 >  link 1</h5>
                                            <a href="/images/myw3schoolsimage.jpg" download="w3logo">
                                                <img src="/images/myw3schoolsimage.jpg"  width="104" height="142"/>
                                            </a>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>

    )
}
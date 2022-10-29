
import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Grid from '@mui/material/Grid';
import TableRow from '@mui/material/TableRow';
import { IconContext } from "react-icons";
import { AiOutlineFilePdf } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoMdImage } from "react-icons/io";
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
    function Other(desc) {
        return (
            <a href="" download="link">
                <Grid style={{
                    width: '100%', display: 'flex',
                    flexWrap: 'wrap', margin: 12
                }}>
                    <IconContext.Provider value={{ color: "#4d77eb" }}>
                        <HiOutlineDocumentText size={20} />
                    </IconContext.Provider>
                    <h4> {desc}</h4>
                </Grid>
            </a>);
    }
    function Image(desc) {
        return (
            <a href="" download="image">
                <Grid style={{
                    width: '100%', display: 'flex',
                    flexWrap: 'wrap', margin: 12
                }}>
                    <IconContext.Provider value={{ color: "#3cbd5a" }}>
                        <IoMdImage size={20} />
                    </IconContext.Provider>
                    <h4> {desc}</h4>
                </Grid>
            </a>
        );
    }
    function Pdf(desc) {
        return (
            <a href="" download="file">
                <Grid style={{
                    width: '100%', display: 'flex',
                    flexWrap: 'wrap', margin: 12
                }}>
                    <IconContext.Provider value={{ color: "red" }}>
                        <AiOutlineFilePdf size={20} />
                    </IconContext.Provider>
                    <h4> {desc}</h4>
                </Grid>
            </a>

        );
    }

    return (

        <Grid container spacing={2} style={{ marginBottom: 12, padding: 35 }}>

            <Grid item sx={{ width: '80%' }}>
                <Table sx={{ minWidth: 250 }} >
                    <TableRow>
                        <TableCell><h2> Sections </h2></TableCell>
                    </TableRow>
                    <TableBody>
                        {chapters.map((chapter, index) => {
                            return (
                                <TableRow key={index} >
                                    <TableCell>
                                        <Box>
                                            <h3 > {chapter.chapter_name}</h3>

                                            {Other("for other")}
                                            {Image("for image ")}
                                            {Pdf("for pdf")}
                                            {Pdf("for pdf")}
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
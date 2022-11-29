import MainLayout from "../../../../layouts/main/MainLayout";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useState } from "react";
import styles from "../../../../styles/my/discussions.module.scss";
import { Grid, Table, TableBody, TableHead, TableCell, TableRow } from "@mui/material";
import TableSortLabel from '@mui/material/TableSortLabel';
import { useRouter } from 'next/router'
const discussions_mock = [
    {
        'discussion': 'General Discussion',
        'started_by': 'Kadir Ersoy',
        'date': '2013-05-23',
        'replies': '1'
    },
    {
        'discussion': 'Guitar chords',
        'started_by': 'Salim',
        'date': '2019-03-03',
        'replies': '13000'
    },
    {
        'discussion': 'Strumming',
        'started_by': 'Nurlan',
        'date': '2023-03-06',
        'replies': '599'
    },
    {
        'discussion': 'Beginner blues',
        'started_by': 'Berke',
        'date': '2023-03-04',
        'replies': '6'
    }



]




export default function discussions() {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('Date')
    const router = useRouter();
    let space_id = router.query;

    function sortBy(fieldName = 'Replies') {
        if (fieldName == 'Replies') {
            discussions_mock.sort((a, b) => order === 'asc' ? a.replies - b.replies : -(a.replies - b.replies));
            setOrderBy('Replies')
        } else {

            discussions_mock.sort((a, b) => order === 'asc' ? new Date(a.date) - new Date(b.date) : -(new Date(a.date) - new Date(b.date)));
            setOrderBy('Date')
        }
        order === 'asc' ? setOrder('desc') : setOrder('asc');

    }
    return (
        <section className={styles.container}>
            <h2>Acoustic Guitar Ed for Beginners</h2>
            <h1>Discussions</h1>
            <Grid container spacing={2} style={{ marginBottom: 12 }}>
                <Grid item sx={{ width: '80%', paddingLeft: "4px !important", paddingTop: "4px !important" }}>
                    <Table sx={{ minWidth: 250 }} >
                        <TableHead>
                            <TableRow>
                                <TableCell ><h3>Discussion</h3></TableCell>
                                <TableCell ><h3>Started by</h3></TableCell>
                                <TableCell >
                                    <TableSortLabel
                                        active={orderBy === 'Date' ? true : false}
                                        direction={order}
                                        onClick={() => { sortBy('Date') }}
                                    >
                                        <h3>Date</h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell >
                                    <TableSortLabel
                                        active={orderBy === 'Replies' ? true : false}
                                        direction={order}
                                        onClick={() => { sortBy('Replies') }}
                                    >
                                        <h3>Replies</h3>
                                    </TableSortLabel>
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {discussions_mock.map((discussion, index) => {
                                return (
                                    <TableRow key={index}  className={styles.row}  onClick= {() => { router.push(`/my/spaces/`+space_id.space_id+`/discussion/1`  )}}>
                                        <TableCell >
                                            <h4 > {discussion.discussion}</h4>
                                        </TableCell>
                                        <TableCell>
                                            <h4 > {discussion.started_by}</h4>
                                        </TableCell>
                                        <TableCell>
                                            <h4 > {discussion.date}</h4>
                                        </TableCell>
                                        <TableCell>
                                            <h4 > {discussion.replies}</h4>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}



                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </section>
    );
}

discussions.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

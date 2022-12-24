import MainLayout from "../../../../layouts/main/MainLayout";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useState, useEffect } from "react";
import styles from "../../../../styles/my/discussions.module.scss";
import { Grid, Table, TableBody, TableHead, TableCell, TableRow } from "@mui/material";
import TableSortLabel from '@mui/material/TableSortLabel';
import { useRouter } from 'next/router'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import axios from "axios";
import { API_URL } from "../../../../next.config";
import CreateDiscussion from "../../../../components/PopUps/CreateDiscussion";
import Button from "../../../../components/Button/Button";
import moment from "moment";

export default function discussions() {

    const [post, setPost] = useState("write your first post here!");
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('Date')
    const [openDiscussion, setOpenDiscussion] = useState(false);
    const [discussionList, setDiscussionList] = useState([]);
    const [data, setData] = useState({});
    const router = useRouter();

    let space_id = router.query;
    async function fetchContent() {
        try {

            const response = (
                await axios.get(API_URL + "/space/" + space_id.space_id)
            );
            console.log("response");
            console.log(response);
            setData(response?.data);

        } catch (err) {
            console.log(err);
        }
    }
    async function fetchDiscussion() {

        try {
            const response = (
                await axios.get(API_URL + "/space/getAllDiscussions/" + space_id.space_id)
            )?.data;
            setDiscussionList(response.discussions);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        space_id = router.query;
        fetchDiscussion();
        fetchContent();
    }, [space_id]);
    // useEffect(() => {
    //     if (!openDiscussion) {
    //         fetchDiscussion();
    //     }
    // }, [openDiscussion]);

    function sortBy(fieldName = 'Replies') {
        if (fieldName == 'Replies') {
            discussionList.sort((a, b) => order === 'asc' ? a.number_of_comments - b.number_of_comments : -(a.number_of_comments - b.number_of_comments));
            setOrderBy('Replies')
        } else {

            discussionList.sort((a, b) => order === 'asc' ? new Date(a.updatedAt) - new Date(b.updatedAt) : -(new Date(a.updatedAt) - new Date(b.updatedAt)));
            setOrderBy('Date')
        }
        order === 'asc' ? setOrder('desc') : setOrder('asc');

    }
    return (
        <section className={styles.container}>
            <h2>{data?.space?.name}</h2>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h1>Discussions</h1>
                <Button onClick={() => { setOpenDiscussion(true) }} style={{ margin: 0, marginRight: "48px", width: "fit-content", padding: "0 20px" }}>
                    Add New Discussion
                </Button>
            </div>
            <CreateDiscussion openDiscussion={openDiscussion} post={post} setPost={setPost} setOpenDiscussion={setOpenDiscussion} type={"discussionCreate"} fetchDiscussion={fetchDiscussion} />
            <Grid container spacing={2} style={{ marginBottom: 12, marginLeft: "4px", marginTop: "20px" }}>
                {/* <Grid item sx={{ width: '80%', paddingLeft: "4px !important", paddingTop: "4px !important" }}>
                    <Button variant="outlined" onClick={() => { setOpenDiscussion(true) }} sx={{ 'borderColor': '#ddd', 'color': 'black' }}>
                        <h2 >add new discussion</h2>
                    </Button>
                </Grid> */}
                <Grid item sx={{ width: '80%', paddingLeft: "4px !important", paddingTop: "4px !important", backgroundColor: "#fff", borderRadius: "10px", padding: "30px 16px", paddingLeft: "16px" }}>
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
                            {discussionList.map((discussion, index) => {
                                return (
                                    <TableRow key={index} className={styles.row} onClick={() => { router.push(`/my/spaces/` + space_id.space_id + `/discussion/` + discussion._id) }}>
                                        <TableCell >
                                            <h4 > {discussion.title}</h4>
                                        </TableCell>
                                        <TableCell>
                                            <h4 > {discussion.user.name}&nbsp;&nbsp;{discussion.user.surname}</h4>
                                        </TableCell>
                                        <TableCell>
                                            <h4 > {moment(discussion.updatedAt).format("LL")}</h4>
                                        </TableCell>
                                        <TableCell>
                                            <h4 > {discussion.number_of_comments}</h4>
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

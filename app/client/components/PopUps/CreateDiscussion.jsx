
import { Grid, Table, TableBody, TableHead, TableCell, TableRow, Button, Dialog, Box, IconButton, DialogContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import styles from './PopUp.module.scss'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../next.config";
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);



function CreateDiscussion({  post ,setPost  ,openDiscussion, setOpenDiscussion, fetchDiscussion }) {

    const [title, setTitle] = useState({ title: "" });
    const router = useRouter();
    let space_id = router.query;
    const putFirstPost = async (response) => {   //these two requests will be merged
        if (!post) {
            return;
        }
        const body = {
            discussion_id: response.discussion._id,
            comment: post,
        }
        try {
            const reponse = await axios.post(API_URL + "/comment", body);
        } catch (err) {
            console.log(err);
        }
    };
    const handleSubmit = async () => {
        if (!title.title || !post) {
            return;
        }
        const body = {
            space_id: space_id.space_id,
            title: title.title,
        }
        try {
            const response = (
                await axios.post(API_URL + "/discussion", body)

            )?.data;
            putFirstPost(response);
            setPost("");
            fetchDiscussion()
        } catch (err) {
            console.log(err);
        }
    };
    function handleInput(event) {
        const { name, value } = event.target
        setTitle(() => {
            return {
                [name]: value
            }
        })
    }


    return (
        <Dialog fullWidth={true} maxWidth="md" open={openDiscussion} onClose={() => setOpenDiscussion(false)} >
            <DialogContent className={styles.noteModal}>
                <div >
                    <h1 >Create Discussion</h1>
                    <div className={styles.discussionModalTitle}>
                        <form >
                            <label className={styles.modalForm}>
                                <input
                                    className={styles.modalInput}
                                    type="text"
                                    name="title"
                                    onChange={handleInput}
                                    value={title.title}
                                />
                            </label>
                        </form>
                    </div>
                </div>
                <div data-color-mode="light" className={styles.mdeBox}>
                    <MDEditor
                        value={post}
                        onChange={setPost}
                        preview={"edit"}
                        hideToolbar={false}
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                        visibleDragbar={false}
                        height="100%"
                    />
                </div>
                <Button variant="outlined" onClick={() => { handleSubmit(); setOpenDiscussion(false) }} sx={{ 'margin-top': '2rem', 'width': '%80', 'borderColor': '#ddd', 'color': 'black' }}>
                    submit
                </Button>
                <IconButton style={{ position: 'absolute', top: 5, right: 5 }} onClick={() => setOpenDiscussion(false)}>
                    <CloseIcon />
                </IconButton>

            </DialogContent>
        </Dialog >
    );

};


export default CreateDiscussion

import { Grid, Table, TableBody, TableHead, TableCell, TableRow, Button, Dialog, Box, IconButton, DialogContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import styles from './PopUp.module.scss'
import dynamic from "next/dynamic";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../next.config";
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);



function CreateNote({ type, post, setPost,  openCreateNote, setOpenCreateNote,id }) {
 

    const handleSubmit = async (values) => {
        console.log("burdasın!")
        if( !post) {
            console.log("burdasın2!")
            return;
        }
        const body = {
            title: "",
            body: post,
            resource_id: id
        }
        try {
            await axios.post(API_URL + "/note", body);
        } catch (err) {
            console.log(err);
        }
    };



    return (
        <Dialog fullWidth={true} maxWidth="md" open={openCreateNote} onClose={() => setOpenCreateNote(false)} >
            <DialogContent className={styles.noteModal}>
                <div >
                <h1 >Create Note</h1>
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
                <Button variant="outlined" onClick={() => { handleSubmit(); setOpenCreateNote(false) }} sx={{ 'margin-top': '2rem', 'width': '%80', 'borderColor': '#ddd', 'color': 'black' }}>
                    submit
                </Button>
                <IconButton style={{ position: 'absolute', top: 5, right: 5 }} onClick={() => setOpenCreateNote(false)}>
                    <CloseIcon />
                </IconButton>

            </DialogContent>
        </Dialog >
    );

};


export default CreateNote
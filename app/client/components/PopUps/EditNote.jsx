
import { Grid, Table, TableBody, TableHead, TableCell, TableRow, Button, Dialog, Box, IconButton, DialogContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import styles from './PopUp.module.scss'
import dynamic from "next/dynamic";
import { useState,useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../next.config";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);



function EditNote({ note ,post, setPost,openEditNote, setOpenEditNote }) {

    const handleSubmit = async () => {
        if(!post) {
            return;
        }
        const body = {
            note_id: note?._id,
            body: post,
        }
        try {
            await axios.put(API_URL + "/note/update", body);
            setOpenEditNote(false) ;
            setPost("");
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        setPost(note?.body)
    }, [note]);

    return (
      
        <Dialog fullWidth={true} maxWidth="md" open={openEditNote} onClose={() => setOpenEditNote(false)}  >
            
            <DialogContent className={styles.noteModal}>
                <div >
                <h1 >Edit Note</h1>
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
                <Button variant="outlined" onClick={() => { handleSubmit(); }} sx={{ 'margin-top': '2rem', 'width': '%80', 'borderColor': '#ddd', 'color': 'black' }}>
                    submit
                </Button>
                <IconButton style={{ position: 'absolute', top: 5, right: 5 }} onClick={() => setOpenEditNote(false)}>
                    <CloseIcon />
                </IconButton>

            </DialogContent>
        </Dialog >
     
    );

};


export default EditNote
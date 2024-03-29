import { Button, ButtonGroup, Card, CardActions, CardContent, Collapse, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import dynamic from "next/dynamic";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from "axios";
import { API_URL } from "../../next.config";
import { useRouter } from 'next/router'
import EditNote from "../../components/PopUps/EditNote";
import Link from 'next/link';
import { toast } from "react-toastify";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

function Note({ note, openEditNote, setOpenEditNote, space_id, setEditNote,setReRender,reRender }) {

    const router = useRouter();
    const [actions, setActions] = useState(false);

    const deleteNote = async () => {

        const body = {
            data:
            {
                note_id: note?._id
            }
        }
        try {
            await axios.delete(API_URL + "/note/delete", body);
            setReRender(!reRender);
        } catch (err) {
            console.log(err);
        }
    }


    return (

        <Card onMouseEnter={() => setActions(true)} onMouseLeave={() => setActions(false)} style={{maxWidth: "300px"}}>

            <CardContent>
                <Link href={`/note/${note?._id}`}>
                    <div data-color-mode="light" style={{cursor: "pointer"}}>
                        <MDEditor
                            value={note.body}
                            onChange={() => { }}
                            preview="preview"
                            hideToolbar={true}
                            height={100}
                            previewOptions={{
                                rehypePlugins: [[rehypeSanitize]],
                            }}
                        />
                    </div>
                </Link>
            </CardContent>
            <Collapse in={actions}>
                <CardActions style={{ marginTop: "-1rem" }}>
                    <ButtonGroup variant="outlined" aria-label="outlined button group" fullWidth style={{ padding: "8px" }}>
                        <Button onClick={() => { router.push(`/my/spaces/` + space_id.space_id + `/resource/` + note.resource) }}><ExitToAppIcon /></Button>
                        <Button onClick={() => {
                            setEditNote(note);
                            setOpenEditNote(true);
                        }}

                        ><EditIcon /></Button>
                        <Button onClick={() => {navigator.clipboard.writeText("https://bucademy.tk/note/"+note?._id); toast.success("Successfully copied note link!")}}><ShareIcon /></Button>
                        <Button onClick={() => { deleteNote() }}><DeleteIcon /></Button>
                    </ButtonGroup>
                </CardActions>
            </Collapse>
        </Card>

    )
}

export default Note

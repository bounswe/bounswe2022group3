import { Button, ButtonGroup, Card, CardActions, CardContent, Collapse, Typography } from '@mui/material'
import React, { useState } from 'react'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import dynamic from "next/dynamic";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

function Note({note, deleteNote}) {
    const [actions, setActions] = useState(false);

    return (
        <Card onMouseEnter={() => setActions(true)} onMouseLeave={() => setActions(false)}>
            <CardContent>
                <div data-color-mode="light">
                    <MDEditor
                        value={note.value}
                        onChange={() => { }}
                        preview="preview"
                        hideToolbar={true}
                        height={100}
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                    />
                </div>
            </CardContent>
            <Collapse in={actions}>
                <CardActions style={{ marginTop: "-1rem" }}>
                    <ButtonGroup variant="outlined" aria-label="outlined button group" fullWidth style={{ padding: "8px" }}>
                        <Button><ExitToAppIcon /></Button>
                        <Button><EditIcon /></Button>
                        <Button><ShareIcon /></Button>
                        <Button onClick={deleteNote}><DeleteIcon /></Button>
                    </ButtonGroup>
                </CardActions>
            </Collapse>
        </Card>
    )
}

export default Note
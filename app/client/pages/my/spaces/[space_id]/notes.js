import { useState, useEffect } from "react";
import Note from "../../../../components/Note/note";
import MainLayout from "../../../../layouts/main/MainLayout";
import styles from "../../../../styles/my/notes.module.scss";
import EditNote from "../../../../components/PopUps/EditNote";
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import axios from "axios";
import { API_URL } from "../../../../next.config";
export default function notes() {
    const [openEditNote, setOpenEditNote] = useState(false);
    const [editNote,setEditNote]=useState();
    const [post, setPost] = useState("");
    const [discussionsList, setDiscussionList] = useState([]);
    const router = useRouter();

    let space_id = router.query;

    async function fetchNotes() {
        const body = {
            space_id: space_id.space_id

        }
        try {
            const response = (
                await axios.post(API_URL + "/note/getNoteList", body)
            )?.data;
            console.log(response.notes)
            setDiscussionList(response.notes);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        space_id = router.query;
        fetchNotes();
    }, [space_id]);
    useEffect(() => {
       
        fetchNotes();
    }, [openEditNote]);
  
    return (
        <section className={styles.container}>


            <h2>Acoustic Guitar Ed for Beginners</h2>
            <h1>My Notes</h1>
            <EditNote openEditNote={openEditNote} note = {editNote} setOpenEditNote={setOpenEditNote} post={post} setPost={setPost} /> 
            <div className={styles.grid}>
                  
                {
                    discussionsList ?
                        discussionsList.map((note) => {
                              
                            return( 
                            <Note note={note} space_id ={space_id}  setEditNote ={setEditNote} setOpenEditNote={setOpenEditNote} openEditNote ={openEditNote}/>);
                        }) :
                        <h2>you have no notes !</h2>
                }
            </div>
        </section>
    )
}

notes.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

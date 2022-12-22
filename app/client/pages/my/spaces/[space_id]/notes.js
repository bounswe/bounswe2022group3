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
    const [reRender,setReRender] = useState(false);
    const [noteList, setNoteList] = useState([]);
    const router = useRouter();
    const [data, setData] = useState({});
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

    useEffect(() => {
        fetchContent();
    }, [router]);
    async function fetchNotes() {
        const body = {
            space_id: space_id.space_id

        }
        try {
            const response = (
                await axios.post(API_URL + "/note/getNoteList", body)
            )?.data;
            setNoteList(response.notes);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        space_id = router.query;
        fetchNotes();
        fetchContent();
    }, [space_id]);

    useEffect(() => {
        fetchNotes();
    }, [openEditNote]);
    useEffect(() => {fetchNotes(); }, [reRender])
    return (
        <section className={styles.container}>


            <h2>{data?.space?.name}</h2>
            <h1>My Notes</h1>
            <EditNote openEditNote={openEditNote} note = {editNote} setOpenEditNote={setOpenEditNote} post={post} setPost={setPost} /> 
            <div className={styles.grid}>
                  
                {
                    noteList ?
                    noteList.map((note) => {
                              
                            return( 
                            <Note note={note} setReRender = {setReRender} reRender = {reRender} space_id ={space_id}  setEditNote ={setEditNote} setOpenEditNote={setOpenEditNote} openEditNote ={openEditNote}/>);
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

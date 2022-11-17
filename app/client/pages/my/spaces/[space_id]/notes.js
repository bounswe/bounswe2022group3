import { useState } from "react";
import Note from "../../../../components/Note/note";
import MainLayout from "../../../../layouts/main/MainLayout";
import styles from "../../../../styles/my/notes.module.scss";

export default function notes() {
    const [notes, setNotes] = useState([
        {
            id: 1,
            value: "I need to learn chords"
        },
        {
            id: 2,
            value: "Great technique"
        },
        {
            id: 3,
            value: "I may need this later"
        },
        {
            id: 4,
            value: "I will read this when I have time"
        },
        {
            id: 5,
            value: "Remember this sequence"
        }
    ])

    const deleteNote = (id) => {
        console.log(id, notes.filter(note => note.id !== id))
        setNotes(notes.filter(note => note.id !== id))
    }

    return (
        <section className={styles.container}>
            <h2>Acoustic Guitar Ed for Beginners</h2>
            <h1>My Notes</h1>
            <div className={styles.grid}>
                {
                    notes.map((note) => {
                        return <Note note={note} deleteNote={() => deleteNote(note.id)} />
                    })
                }
            </div>
        </section>
    )
}

notes.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

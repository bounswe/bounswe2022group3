import { useState } from "react";
import Note from "../../../../components/Note/note";
import MainLayout from "../../../../layouts/main/MainLayout";
import styles from "../../../../styles/my/notes.module.scss";

export default function notes() {
    const [notes, setNotes] = useState([
        {
            id: 1,
            value: "**Helllo**  1"
        },
        {
            id: 2,
            value: "**Helllo**  2"
        },
        {
            id: 3,
            value: "**Helllo**  3"
        },
        {
            id: 4,
            value: "**Helllo**  4"
        },
        {
            id: 5,
            value: "**Helllo**  5"
        },
        {
            id: 6,
            value: "**Helllo**  6"
        },
    ])

    const deleteNote = (id) => {
        console.log(id, notes.filter(note => note.id !== id))
        setNotes(notes.filter(note => note.id !== id))
    }

    return (
        <section className={styles.container}>
            <h2>Learning Guitar</h2>
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

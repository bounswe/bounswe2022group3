import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { API_URL } from "../../next.config";
import styles from '../../styles/my/resource_detail.module.scss'
import Button from '../../components/Button/Button';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview"),
  { ssr: false }
);

function note() {
  const [note, setNote] = useState(null);
  const router = useRouter();

  useEffect(async () => {
    if (router?.query && router?.query?.note_id) {
      try {
        const note = (await axios.get(`${API_URL}/note/${router.query.note_id}`))?.data?.note;
        setNote(note);
      } catch (error) {
        console.log(error)
      }
    }
  }, [router.query])

  const saveNote = async () => {
    const body = {
      title: "",
      body: note?.body,
      resource_id: note?.resource?._id
    }
    try {
      await axios.post(API_URL + "/note", body);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.resourceDetailPage} style={{ margin: "30px 20px" }}>
      <div className={styles.resourceDetailHeader}>
        <div className={styles.titleCard}>
          <h2>{note?.space?.name}</h2>
          <h1>{note?.resource?.name}</h1>
        </div>
        <div className={styles.resourceDetailHeader} style={{ minWidth: "330px" }}>
          <Button variant="outlined" onClick={() => { saveNote() }} className={styles.resourceDetailHeaderButton} style={{ marginRight: "30px" }}>
            Save note
          </Button>
        </div>
      </div>
      <Link href={`/user/${note?.creator?._id}`}>
        <div className="review__user" style={{ cursor: "pointer" }}>
          <img
            src={`${API_URL}/user/${note?.creator?.image}`}
            alt="User"
            className="review__photo"
          />
          <div className="review__user-box">
            <p className="review__user-name">{note?.creator?.name} {note?.creator?.surname}</p>
            <p className="review__user-date">{new Date(note?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </Link>
      <div data-color-mode="light" className={styles.mdeBox} >
        <MarkdownPreview source={note?.body} />
      </div>
    </div>
  )
}

export default note;
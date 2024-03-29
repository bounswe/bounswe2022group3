import MainLayout from "../../layouts/main/MainLayout";
import Button from "../Button/Button";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import styles from "../../styles/my/discussions.module.scss";
import axios from "axios";
import { API_URL } from "../../next.config";
import moment from "moment";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);
const MarkdownPreview = dynamic(
    () => import("@uiw/react-markdown-preview"),
    { ssr: false }
);

export default function Discussion({ previousComments, setPreviousComments, value, setValue, discussion, setReRender, reRender }) {
    const router = useRouter();
    let user_id;
    if (typeof window !== 'undefined') {
        user_id = localStorage.getItem("user_id");
    }
    const [picture, setPicture] = useState("");
    const handleSubmit = async () => {
        if (!value) {
            return;
        }
        const body = {
            discussion_id: discussion.discussion_id,
            comment: value,
        }
        try {
            await axios.post(API_URL + "/comment", body);
            setValue("");
            setReRender(!reRender);
        } catch (err) {
            console.log(err);
        }

    };
    async function fetchPicture() {

        try {
            const response = (
                await axios.get(API_URL + "/userProfile/getProfile/" + user_id)
            )?.data;
            setPicture(response.profile.image);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => { fetchPicture(); }, [user_id])
    return (
        <section className={styles.container}>

            {
                previousComments.map(previousComment => {
                    return <div className={styles.comment_container}>
                        <Avatar className={styles.comment_icon} src={"https://api.bucademy.tk/user/" + previousComment?.user?.image} onClick={() => router.push(`/user/${previousComment?.user?._id}`)}/>
                        <div data-color-mode="light" className={styles.comment} >
                            <div style={{display: "flex", alignItems: "center"}}>
                                <h3 style={{ margin: 12, cursor: "pointer" }} onClick={() => router.push(`/user/${previousComment?.user?._id}`)}>{previousComment?.user?.name}</h3>
                                <span>{moment(previousComment?.updatedAt).fromNow()}</span>
                            </div>

                            {/* <MDEditor
                                value={previousComment?.comment}
                                onChange={() => { }}
                                preview="preview"
                                hideToolbar={true}
                                height={100}
                                previewOptions={{
                                    rehypePlugins: [[rehypeSanitize]],
                                }}
                            /> */}
                            <MarkdownPreview source={previousComment?.comment} style={{ backgroundColor: "#fff", borderRadius: "10px", padding: "15px" }} />
                        </div>
                    </div>
                })
            }
            <div className={styles.comment_container}>
                <Avatar className={styles.comment_icon} src={"https://api.bucademy.tk/user/" + picture} />
                <div data-color-mode="light" className={styles.comment}>
                    <MDEditor
                        value={value}
                        onChange={setValue}
                        preview="edit"
                        height={150}
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                    />
                    <Button className={styles.comment_button} onClick={() => { handleSubmit(); }}>post</Button>
                </div>
            </div>
        </section>
    );
}

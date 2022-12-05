import MainLayout from "../../layouts/main/MainLayout";
import Button from "../Button/Button";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import { useState } from "react";
import { Avatar } from "@mui/material";
import styles from "../../styles/my/discussions.module.scss";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../next.config";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export default function Discussion({ previousComments,setPreviousComments, value ,setValue ,discussion,setReRender,reRender}) {

    const handleSubmit = async () => {
        if(!value) {
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

    return (
        <section className={styles.container}>
            {
                previousComments.map(previousComment => {
                    return <div className={styles.comment_container}>
                     {/* A JSX comment <Avatar className={styles.comment_icon} src={previousComment?.user?.image} /> */}
                        <Avatar className={styles.comment_icon} alt="Agnes Walker" src="https://xsgames.co/randomusers/avatar.php?g=female" />
                        <div data-color-mode="light" className={styles.comment}>
                            <MDEditor
                                value={previousComment?.comment}
                                onChange={() => { }}
                                preview="preview"
                                hideToolbar={true}
                                height={100}
                                previewOptions={{
                                    rehypePlugins: [[rehypeSanitize]],
                                }}
                            />
                        </div>
                    </div>
                })
            }
            <div className={styles.comment_container}>
                <Avatar className={styles.comment_icon} alt="Agnes Walker" src="https://xsgames.co/randomusers/avatar.php?g=female" />
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

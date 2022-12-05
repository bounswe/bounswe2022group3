import MainLayout from "../../../../../layouts/main/MainLayout";
import Button from "../../../../../components/Button/Button";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import dynamic from "next/dynamic";
import { useState,useEffect } from "react";
import { Avatar } from "@mui/material";
import styles from "../../../../../styles/my/discussions.module.scss";
import Discussion from "../../../../../components/Discussion/Discussion";
import { useRouter } from 'next/router'
import axios from "axios";
import { API_URL } from "../../../../../next.config";
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export default function discussion() {
    const [value, setValue] = useState("");
    const [previousComments, setPreviousComments] = useState([]);
    const [reRender, setReRender] = useState(false);
    const router = useRouter();
    let user_id = router.query;
    let discussion = router.query;

    async function fetchDiscussion() {

        try {
            const response = (
                await axios.get(API_URL + "/discussion/" + discussion.discussion_id)
            )?.data;
            setPreviousComments(response.discussion.comments);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        discussion = router.query;
        fetchDiscussion();
    }, [discussion.discussion_id]);
    
    useEffect(() => {fetchDiscussion(); }, [reRender])
    return (
        <section className={styles.container}>
            <h2>Acoustic Guitar Ed for Beginners</h2>
            <h1>General Discussion</h1>

            <Discussion
                previousComments={previousComments}
                setPreviousComments={setPreviousComments}
                value={value}
                setValue={setValue}
                discussion={discussion}
                setReRender = {setReRender}
                reRender = {reRender}
            />
        </section>
    );
}

discussion.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

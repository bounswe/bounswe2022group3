import MainLayout from "../../../../../layouts/main/MainLayout";
import Button from "../../../../../components/Button/Button";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
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
    const [counter, setCounter] = useState(0);
    const [title, setTitle] = useState("")
    const [loop, setLoop] = useState();

 
    async function fetchDiscussion() {

        try {
            const response = (
                await axios.get(API_URL + "/discussion/" + discussion.discussion_id,
                {
                    DISABLE_LOADING: true,
                })
            )?.data;

            setPreviousComments(response.discussion.comments);
            setTitle(response?.discussion?.title)
        } catch (err) {
            console.log(err);
        }
    }
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCounter((prevCounter) => prevCounter + 1);

    //         fetchDiscussion();
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [discussion.discussion_id]);
    let intervalID;
    useEffect(() => { 
        discussion = router.query;
        if (discussion?.discussion_id) {
            intervalID = setInterval(() => {
                fetchDiscussion(); 
            }, 1000); 
        }
        return () => clearInterval(intervalID);
    }, [discussion.discussion_id])

    // useEffect(() => {
    //     discussion = router.query;
    //     fetchDiscussion();
    // }, [discussion.discussion_id]);

    // useEffect(() => { fetchDiscussion(); }, [reRender])
    return (
        <section className={styles.container}>
            <h2 style={{marginBottom: "20px"}}>{title}</h2>
            <Discussion
                previousComments={previousComments}
                setPreviousComments={setPreviousComments}
                value={value}
                setValue={setValue}
                discussion={discussion}
                setReRender={setReRender}
                reRender={reRender}
            />
        </section>
    );
}

discussion.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

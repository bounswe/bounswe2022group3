import React from 'react';
import styles from '../../../../../styles/my/resource_detail.module.scss'
import { useRouter } from 'next/router'
import { API_URL } from "../../../../../next.config";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import MainLayout from "../../../../../layouts/main/MainLayout";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Avatar } from "@mui/material";
import Rating from "../../../../../components/Rating/Rating"
import Button from "../../../../../components/Button/Button";
import { Field, Form, Formik } from "formik";



import CreateNote from "../../../../../components/PopUps/CreateNote";
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export default function resource() {
    const [editModeActive, setEditModeActive] = useState(false);
    const [resourceValue, setResourceValue] = useState("");
    const router = useRouter();
    const [openCreateNote, setOpenCreateNote] = useState(false);
    let router_query = router.query;
    const [data, setData] = useState({});
    const [post, setPost] = useState("");

    async function fetchContent() {
        try {
            if (router_query?.resource !== undefined) {
                const response = (
                    await axios.get(API_URL + "/resource/" + router_query.resource)
                );
                console.log(response);
                setData(response?.data);

                setResourceValue(response?.data?.resource?.body)

            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchContent();
    }, [router_query]);

    function onEditButtonClicked() {

        setEditModeActive(!editModeActive);
    }



    return (
        < >
            <div className={styles.resourceDetailPage}>
                <div className={styles.resourceDetailHeader}>
                    <CreateNote openCreateNote={openCreateNote} post={post} setPost={setPost} setOpenCreateNote={setOpenCreateNote} id ={router_query.resource} />

                    <div className={styles.titleCard}>
                        <h2>{data?.resource?.name}</h2>
                        <div className={styles.titleCreator}>
                            <Avatar alt="Agnes Walker" src={data?.resource?.creatorimage} />
                            <span> {data?.resource?.creator?.name} </span>
                            <span>{data?.resource?.creator?.surname}</span>
                        </div>

                        <Rating rating={data?.resource?.average_rating}></Rating>
                        <span>{new Date(data?.resource?.createdAt).toLocaleDateString()}</span>

                    </div>
                    <div className={styles.resourceDetailHeader}> 
                        <Button variant="outlined" onClick={() => { setOpenCreateNote(true) }} className={styles.resourceDetailHeaderButton}>
                            add new note
                        </Button>

                        {!editModeActive && <Button onClick={onEditButtonClicked} className={styles.resourceDetailHeaderButton}>Edit</Button>}
                        {editModeActive && <Button onClick={onEditButtonClicked} className={styles.resourceDetailHeaderButton}>Save</Button>}
                    </div>

                </div>

                <div data-color-mode="light" className={styles.mdeBox}>
                    <MDEditor
                        value={resourceValue}
                        onChange={setResourceValue}
                        preview={editModeActive ? "edit" : "preview"}
                        hideToolbar={!editModeActive}
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                        visibleDragbar={false}
                        height="100%"
                    />
                </div>
            </div>



        </>
    );
}

resource.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

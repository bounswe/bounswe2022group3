import React from 'react';
import styles from '../../../../styles/my/resource_detail.module.scss'
import { useRouter } from 'next/router'
import { API_URL } from "../../../../next.config";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import MainLayout from "../../../../layouts/main/MainLayout";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Avatar } from "@mui/material";
import Rating from "../../../../components/Rating/Rating"
import Button from "../../../../components/Button/Button";
import { Field, Form, Formik } from "formik";


const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export default function resource() {
    const [post, setPost] = useState({});
    const [editModeActive, setEditModeActive] = useState(false);
    const [isCreate, setIsCreateActive] = useState(false);
    const router = useRouter();
    let space_id = router.query;

    function onEditButtonClicked() {

        if(!isCreate) {
            if(!editModeActive) {
                setEditModeActive(true);
            } else {
                // API call to save edited resource
            }

        } else {

            // API call for create here, get resource ID redirect to resource id page
        }
    }

    async function fetchContent() {
        try {
            // API CALL CHANGE
            const response = (
                await axios.get(API_URL + "/course/" + space_id.space_id)
            )?.data;
            setPost(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        space_id = router.query;
        console.log(space_id);
        setPost(
            {
                title: "Strumming Patterns",
                resource: '**Date**: 09.11.2022 \
                **Location**: Discord \
                **Time**: 21:00 - 21:00 \
                **Note Taker**:  Berke Özdemir',
                rating: 4.4,
                creator: {
                    name: "Berke",
                    surname: "Özdemir",
                    user_id: "",
                    image: "base-64 or url"
                },
                date_added: 'unix_timestamp (utc)',
                discussion_id: "1222223feerrff"
            }
        )

        setIsCreateActive(space_id.isCreate)

        if (!space_id) {
            return;
        }
        fetchContent();
    }, [space_id]);

    return (
        < >
            <div className={styles.resourceDetailPage}>
                <h2>Acoustic Guitar Ed for Beginners</h2>
                <div className={styles.resourceDetailHeader}>

                    {(!isCreate) &&

                        <div className={styles.titleCard}>
                            <h2>{post.title}</h2>
                            <div className={styles.titleCreator}>
                                <Avatar alt="Agnes Walker" src={post.creator?.image} />
                                <span> {post.creator?.name} </span>
                                <span>{post.creator?.surname}</span>
                            </div>

                            <Rating rating={post.rating}></Rating>
                            <span>{post.date_added}</span>

                        </div>
                    }


                    {(isCreate) &&
                        <Formik>
                            <Form className={styles.form}>
                                <Field
                                    className={styles.input}
                                    name="name"
                                    type="text"
                                    placeholder="Resource Title"
                                ></Field>
                            </Form>
                        </Formik>

                    }


                    {(!editModeActive && !isCreate) && <Button onClick={onEditButtonClicked} className={styles.resourceDetailHeaderButton}>Edit</Button>}
                    {(editModeActive || isCreate) && <Button onClick={onEditButtonClicked} className={styles.resourceDetailHeaderButton}>Save</Button>}


                </div>

                <div data-color-mode="light" className={styles.mdeBox}>
                    <MDEditor
                        value={post.resource}
                        onChange={() => { }}
                        preview={editModeActive || isCreate ? "edit" : "preview"}
                        hideToolbar={true}
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

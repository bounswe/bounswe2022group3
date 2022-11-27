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
import * as Yup from "yup";
import { Avatar } from "@mui/material";
import Button from "../../../../components/Button/Button";
import { Field, Form, Formik } from "formik";


const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export default function resource() {
    const [post, setPost] = useState({});
    const [resourceValue, setResourceValue] = useState("");
    const router = useRouter();
    let space_id = router.query;

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
    });

    const handleSubmit = async (values) => {
        const { password2, ...payload } = values;
        try {
            await axios.post(API_URL + "/user/register", payload);
        } catch (err) {
            console.log(err);
        }
    };

    function onEditButtonClicked() {

        //setEditModeActive(false);

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


        if (!space_id) {
            return;
        }
    }, [space_id, router.query]);


    useEffect(() => {
        setResourceValue(post.resource)
    }, [post]);

    return (
        < >
            <div className={styles.resourceDetailPage}>
                <h2>Acoustic Guitar Ed for Beginners</h2>
                <div className={styles.resourceDetailHeader}>

                    <Formik
                    initialValues={{
                        name: "",

                    }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit}>
                            <Form className={styles.form}>
                                <Field
                                    className={styles.input}
                                    name="name"
                                    type="text"
                                    placeholder="Resource Title"
                                ></Field>
                            </Form>
                        </Formik>


                    <Button onClick={onEditButtonClicked} className={styles.resourceDetailHeaderButton}>Save</Button>


                </div>

                <div data-color-mode="light" className={styles.mdeBox}>
                    <MDEditor
                        value={resourceValue}
                        onChange={setResourceValue}
                        preview={"edit"}
                        hideToolbar={false}
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

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
import * as Yup from "yup";
import Button from "../../../../../components/Button/Button";
import { Field, Form, Formik } from "formik";


const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export default function resource() {
    const [post, setPost] = useState({});
    const [resourceValue, setResourceValue] = useState("");
    const router = useRouter();
    let router_query = router.query;

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
    });

    const handleSubmit = async (values) => {
        if (!resourceValue || !values.name) {
            return;
        }
        const body = {
            name: values.name,
            body: resourceValue,
            topic_id: router_query.topic_id
        }
        try {
            await axios.post(API_URL + "/resource", body);
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        setResourceValue(post.resource)
    }, [post]);

    return (
        < >
            <div className={styles.resourceDetailPage}>
                <h2>{router_query.space_name}</h2>
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

                            <Button type="submit" className={styles.resourceDetailHeaderButton}>Save</Button>

                        </Form>


                    </Formik>

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

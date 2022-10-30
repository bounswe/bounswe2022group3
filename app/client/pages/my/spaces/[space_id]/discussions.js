import MainLayout from "../../../../layouts/main/MainLayout";
import Button from "../../../../components/Button/Button";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Avatar } from "@mui/material";
import styles from "../../../../styles/my/discussions.module.scss";
import { useEffect } from "react";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export default function discussions() {
    const [value, setValue] = useState("**Hello world!!!**");
    const [previousComments, setPreviousComments] = useState([
        {
            "value": "**Hello world!!!** <br> hh",
            "image": "https://xsgames.co/randomusers/avatar.php?g=male"
        },
        {
            "value": "**Hello world!!!**  1",
            "image": "https://xsgames.co/randomusers/avatar.php?g=female"
        },
        {
            "value": "**Hello world!!!**  2",
            "image": "https://xsgames.co/randomusers/avatar.php?g=male"
        },
    ])

    useEffect(() => {}, [previousComments])

    return (
        <section className={styles.container}>
            <h2>Learning Guitar</h2>
            <h1>General Discussion</h1>
            {
                previousComments.map(previousComment => {
                    return <div className={styles.comment_container}>
                        <Avatar className={styles.comment_icon} alt="Agnes Walker" src={previousComment.image} />
                        <div data-color-mode="light" className={styles.comment}>
                            <MDEditor
                                value={previousComment.value}
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
                    <Button className={styles.comment_button} onClick={() => { setPreviousComments(previousComments.concat({ value, image: "https://xsgames.co/randomusers/avatar.php?g=female" })); setValue("") }}>post</Button>
                </div>
            </div>
        </section>
    );
}

discussions.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

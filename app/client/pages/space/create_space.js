import { Autocomplete, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../next.config";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import PhotoUploadWidget from "../../components/PhotoUpload/PhotoUploadWidget";
import UserLayout2 from "../../layouts/user-layout2/UserLayout2";
import styles from "../../styles/course/create_space.module.scss";
import { useRouter } from "next/router";


export default function create_space() {
    const [files, setFiles] = useState([]);
    const [cropper, setCropper] = useState();
    const [tags, setTags] = useState([])
    const [tagList, setTagList] = useState([]);

    const router = useRouter();

    const LoginSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        info: Yup.string().required("Required"),
    });

    const handleSubmit = async (values) => {
        const image = cropper.getCroppedCanvas().toDataURL("image/jpeg");
        const payload = { image, tags, ...values };
        try {
            const response = (
                await axios.post(API_URL + "/space", payload)
            )?.data;

            router.push('/user/my_spaces')
        } catch (err) {
            console.log(err);
        }
    };

    const get_tags = async () => {
        try {
            const res = (
                await axios.get(`${API_URL}/userProfile/getTags`)
            )?.data
            console.log(res)
            if (res) {
                setTagList(res.words);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        get_tags();
    }, [])


    return (
        <>
            <Formik
                initialValues={{
                    name: "",
                    info: ""
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <div style={{ marginTop: "20px" }}>
                        <div style={{maxWidth: "900px", margin: "0 auto"}}>
                            <PhotoUploadWidget files={files} setFiles={setFiles} setCropper={setCropper} />
                        </div>
                        <Form className={styles.form}>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Title"
                                className={styles.input}
                            ></Field>
                            {errors.name && touched.name && (
                                <div className={styles.error}>
                                    {errors.name}
                                </div>
                            )}
                            <Field
                                id="info"
                                name="info"
                                component="textarea"
                                placeholder="Description"
                                className={styles.input}
                                style={{ height: "200px", resize: "none" }}
                            ></Field>
                            {errors.info && touched.info && (
                                <div className={styles.error}>
                                    {errors.info}
                                </div>
                            )}
                            <Autocomplete
                                style={{ height: "50px", marginBottom: "10px" }}
                                multiple
                                id="tags-outlined"
                                options={tagList}
                                defaultValue={[...tags]}
                                filterSelectedOptions
                                onChange={(e) => setTags([...tags, e.target.value])}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tags"
                                        placeholder="Tags"
                                        value={tags}
                                    />
                                )}
                            />

                            <Button type="submit">create learning space</Button>
                        </Form>
                    </div>
                )}
            </Formik></>
    )
}

create_space.getLayout = function getLayout(page) {
    return <UserLayout2>{page}</UserLayout2>;
};
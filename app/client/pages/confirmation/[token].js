import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Button from "../../components/Button/Button";
import { API_URL } from "../../next.config";
import styles from "../../styles/confirmation/styles.module.scss";

const Confirmation = () => {
    const router = useRouter();
    const { token } = router.query;

    useEffect(() => {
        handleSubmit()
    }, [router.query])


    const handleSubmit = async () => {
        try {
            const data = await axios.post(API_URL + "/user/confirm-email", { code: token });
            if (data.status === 200) {
                router.push("/user/login")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.form_container}>
            <div className={styles.container}>
                <h2 className={styles.header}>
                    Verifying your email
                </h2>
            </div>
        </div>
    );
};

export default Confirmation;

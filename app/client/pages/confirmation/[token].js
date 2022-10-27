import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Button from "../../components/Button/Button";
import { API_URL } from "../../next.config";
import styles from "../../styles/confirmation/styles.module.scss";

const Confirmation = () => {
    const router = useRouter();
    const { token } = router.query;

    const [verified, setVerified] = useState(null);

    const handleSubmit = async (values) => {
        const data = await axios.post(API_URL + "/user/confirm-email", { code: token, email: values.email });
        setVerified(data.status === 200);
        return data;
    }

    const ConfirmationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required")
    });

    return (
        <div className={styles.form_container}>
            {
                verified ?
                    <div className={styles.container}>
                        <h2 className={styles.header}>
                            Your email has been verified
                        </h2>
                        <Link href="/user/login" className={styles.link}>
                            Click here to login to your account
                        </Link>
                    </div>
                    : (
                        <div className={styles.container}>
                            <h1>Enter your email to confirm your account</h1>
                            <Formik
                                initialValues={{
                                    email: ""
                                }}
                                validationSchema={ConfirmationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form className={styles.form}>
                                        <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            className={styles.input}
                                        ></Field>
                                        {errors.email && touched.email && (
                                            <div className={styles.error}>
                                                {errors.email}
                                            </div>
                                        )}
                                        <Button type="submit">Confirm</Button>
                                        <div>
                                            <p>Don't have an account?</p>{" "}
                                            <Link href="/user/register">Click here</Link>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )
            }
        </div>
    );
};

export default Confirmation;

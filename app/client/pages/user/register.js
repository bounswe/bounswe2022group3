import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Button from "../../components/Button/Button";
import AuthLayout from "../../layouts/auth/AuthLayout";
import styles from "../../styles/user/form.module.scss";
import axios from "axios";
import { API_URL } from "../../next.config";

export default function register() {
    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Too Short")
            .max(50, "Too Long")
            .required("Required"),
        surname: Yup.string()
            .min(2, "Too Short")
            .max(50, "Too Long")
            .required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .required("No password provided")
            .min(8, "Password is too short - should be 8 chars minimum")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        password2: Yup.string()
            .required("Confirm password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        agreement: Yup.string()
            .required("agreement confirmation is required")
    });

    const handleSubmit = async (values) => {
        const { password2, ...payload } = values;
        try {
            await axios.post(API_URL + "/user/register", payload);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h1>Welcome!</h1>
            <Formik
                initialValues={{
                    name: "",
                    surname: "",
                    email: "",
                    password: "",
                    password2: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className={styles.form}>
                        <Field
                            id="name"
                            name="name"
                            type="text"
                            placeholder="First Name"
                            className={styles.input}
                        ></Field>
                        {errors.name && touched.name && (
                            <div className={styles.error}>
                                {errors.name}
                            </div>
                        )}
                        <Field
                            id="surname"
                            name="surname"
                            type="text"
                            placeholder="Last Name"
                            className={styles.input}
                        ></Field>
                        {errors.surname && touched.surname && (
                            <div className={styles.error}>
                                {errors.surname}
                            </div>
                        )}
                        <Field
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            className={styles.input}
                        ></Field>
                        {errors.email && touched.email && (
                            <div className={styles.error}>{errors.email}</div>
                        )}
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            className={styles.input}
                        ></Field>
                        {errors.password && touched.password && (
                            <div className={styles.error}>
                                {errors.password}
                            </div>
                        )}
                        <Field
                            id="password2"
                            name="password2"
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            className={styles.input}
                        ></Field>
                        {errors.password2 && touched.password2 && (
                            <div className={styles.error}>
                                {errors.password2}
                            </div>
                        )}

                        <label className={styles.checkbox}>
                            <Field type="checkbox" id="agreement" name="agreement" />
                            <span>I have read the <a href="https://gdpr.eu/">GDPR</a> and accept</span>
                        </label>
                        {errors.agreement && (
                            <div className={styles.error}>
                                {errors.agreement}
                            </div>
                        )}

                        <Button type="submit">Sign up</Button>
                        <div>
                            <p>Already have an account?</p>{" "}
                            <Link href="/user/login">Click here</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

register.getLayout = function getLayout(page) {
    return <AuthLayout>{page}</AuthLayout>;
};
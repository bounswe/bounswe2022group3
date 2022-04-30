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
        first_name: Yup.string()
            .min(2, "Too Short")
            .max(50, "Too Long")
            .required("Required"),
        last_name: Yup.string()
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
    });

    const handleSubmit = async (values) => {
        // make request to register endpoint in backend
        // use axios to make request, 
        // API_URL is base url of server,
        // redirect user to login page on success.
        console.log(values)
    };

    return (
        <>
            <h1>Welcome!</h1>
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
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
                            id="first_name"
                            name="first_name"
                            type="text"
                            placeholder="First Name"
                            className={styles.input}
                        ></Field>
                        {errors.first_name && touched.first_name && (
                            <div className={styles.error}>
                                {errors.first_name}
                            </div>
                        )}
                        <Field
                            id="last_name"
                            name="last_name"
                            type="text"
                            placeholder="Last Name"
                            className={styles.input}
                        ></Field>
                        {errors.last_name && touched.last_name && (
                            <div className={styles.error}>
                                {errors.last_name}
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

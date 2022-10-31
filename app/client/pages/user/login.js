import axios from "axios";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import AuthLayout from "../../layouts/auth/AuthLayout";
import { API_URL } from "../../next.config";
import styles from "../../styles/user/form.module.scss";

export default function login() {
    const router = useRouter();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .required("No password provided")
            .min(8, "Password is too short - should be 8 chars minimum")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
    });

    const handleSubmit = async (values) => {
        const payload = { grant_type: "password", ...values };
        try {
            const response = (
                await axios.post(API_URL + "/user/login", payload, {
                    auth: payload,
                })
            )?.data;

            localStorage.setItem("email", values.email);
            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("refresh_token", response.refresh_token);
            localStorage.setItem("user_id", response.id);

            router.push('/user/my_spaces')
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h1>Welcome Back!</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={LoginSchema}
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
                        <Button type="submit">log in</Button>
                        <div>
                            <p>Don't have an account?</p>{" "}
                            <Link href="/user/register">Click here</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

login.getLayout = function getLayout(page) {
    return <AuthLayout>{page}</AuthLayout>;
};
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import AuthLayout from "../../layouts/auth/AuthLayout";
import { API_URL } from "../../next.config";
import styles from "../../styles/user/form.module.scss";

export default function login() {
    const router = useRouter();

    const LoginSchema = Yup.object().shape({
        username: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .required("No password provided")
            .min(8, "Password is too short - should be 8 chars minimum")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
    });

    const handleSubmit = async (values) => {
        // make request to login endpoint in backend
        // use axios to make request, 
        // API_URL is base url of server,
        // use router.push("some_route") to redirext user.

        try{
            const url = `${API_URL}/users/login`;
            const payload = {
                'email': values.username,
                'password': values.password,
            };
            const response = (await axios.post(url, payload)).data;
            if(response.access_token){ // Login Successfull


                // TODO:  router.push("index page"), we need an index page to redirect from login
                
                // To redirect from login to your endpoint OPEN the comment below and insert your endpoint route !!
                // router.push("some_route")
                
                localStorage.setItem('access_token',response.access_token);
                toast.success('Welcome to the desert of the real!');
                localStorage.setItem("email", values.username);
                router.push(`/user/main`);
            }
            else{
                console.log(response.message);
            }
        }catch(error){
            console.log(error.toString());
        }
    };

    return (
        <>
            <h1>Welcome Back!</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className={styles.form}>
                        <Field
                            id="username"
                            name="username"
                            type="email"
                            placeholder="Email"
                            className={styles.input}
                        ></Field>
                        {errors.username && touched.username && (
                            <div className={styles.error}>
                                {errors.username}
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
                        <Button type="submit">Login</Button>
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

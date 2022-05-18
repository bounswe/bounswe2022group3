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

export default function verify() {
    const router = useRouter();

    const EmailSchema = Yup.object().shape({
        email: Yup.string()
            .required("wow")
    });

    const handleVerify = async (values) => {
        console.log(values);
        try{
            const url = `${API_URL}/verify/verifyEmail`;
            const payload = {
                'email': values.email
            };
            const response = (await axios.post(url, payload)).data;
            console.log(response);
      
        }catch(error){
            console.log(error);
        }
    };

    const handleSave = async (values) => {
        try{
            const url = `${API_URL}/verify/saveEmail`;
            const payload = {
                'email': values.email
            };
            const response = (await axios.post(url, payload)).data;
            console.log(response);
      
        }catch(error){
            console.log(error);
        }
    };

    const handleGet = async (values) => {
        try{
            const url = `${API_URL}/verify/getEmails`;
            const response = (await axios.get(url)).data;
            console.log(response);
      
        }catch(error){
            console.log(error.toString());
        }
    };

    return (
        <>
            <h1></h1>
            <Formik
                initialValues={{
                    email: ""   
                }}
                validationSchema={EmailSchema}
            >
                {({ errors, touched, values }) => (
                    <Form className={styles.form}>
                        <Button  onClick={handleGet}>View Emails</Button>
                        
                        <Field
                            id="username"
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
                        <Button  onClick={() => handleVerify(values)}>Verify Email</Button>
                        <Button  onClick={() => handleSave(values)}>Save Email</Button>
                        
                    </Form>
                )}
            </Formik>
        </>
    );
}

verify.getLayout = function getLayout(page) {
    return <AuthLayout>{page}</AuthLayout>;
};

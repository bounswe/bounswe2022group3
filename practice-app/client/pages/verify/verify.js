import { DataGrid } from "@mui/x-data-grid";
import {Grid} from "@mui/material";
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
import { useEffect, useState } from "react"

export default function verify() {
    const router = useRouter();
    const [response_message, set_response_message] = useState(null)
   // const [saved_emails, set_saved_emails] = useState([])
    const [email, setEmail] = useState([]);
    const EmailSchema = Yup.object().shape({
        email: Yup.string()
            .required("")
    });

    const handleVerify = async (values) => {
        //console.log(values);
        try{
            const url = `${API_URL}/verify/verifyEmail`;
            const payload = {
                'email': values.email
            };
            const response = (await axios.post(url, payload)).data;
            if(response.ok.data.deliverable)
                set_response_message("This is a valid email.")
            else
                set_response_message("This email does not exist.")
           // console.log(response);
      
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
            set_response_message("Email saved successfully.")
            //console.log(response);
      
        }catch(error){
            console.log(error);
        }
    };

    /*const handleGet = async (values) => {
        try{
            const url = `${API_URL}/verify/getEmails`;
            const response = (await axios.get(url)).data;
            set_saved_emails(response)
            console.log(response);
      
        }catch(error){
            console.log(error.toString());
        }
    };*/

    const emailColumns = [
        {
            field: "email",
            headerName: "Saved Emails",
            width: 200,
        }
    ];


    const getEmails = async () => {
        const url = `${API_URL}/verify/getEmails`;
        const res = (await axios.get(url)).data;
        //console.log(res)
        if (res && res.emails) {
            res.emails.forEach((email, k) => {
                email.id = k;
            });
            setEmail(res.emails);
        } else {
            toast.warning("Something went wrong. Try again.");
        }
    };

    useEffect(() => {
        getEmails();
    }, []);


    return (
        <>
            
            <Formik
                initialValues={{
                    email: ""   
                }}
                validationSchema={EmailSchema}
            >
                {({ errors, touched, values }) => (
                    <Form className={styles.form}>

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

                        {
                            response_message && (<div className={styles.error}>{response_message}</div>)
                        }
                        
                        <Button  onClick={() => handleVerify(values)}>Verify Email</Button>
                        <Button  onClick={() => handleSave(values)}>Save Email</Button>
                        
                        <Grid container justifyContent="flex-end" sx={{ mb: 3 }}>
                            {/*<Button
                                variant="contained"
                                onClick={() => router.push("/verify")}
                            >
                                Back
                             </Button> */}
                        </Grid>
                        <Grid container>
                            <DataGrid
                                rows={email}
                                columns={emailColumns}
                                pageSize={5}
                                checkboxSelection={false}
                                disableSelectionOnClick
                                autoHeight
                            />
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
}

verify.getLayout = function getLayout(page) {
    return <AuthLayout>{page}</AuthLayout>;
};


import { useState, useEffect } from 'react';
import axios from "axios"
import { useRouter } from "next/router"
import { Field, Formik, useFormik } from "formik";

import QuizForm from "../../components/Quiz/QuizForm";
import styles from "../../styles/QuizForm.module.scss"


import 'bootstrap/dist/css/bootstrap.min.css';


import { API_URL } from "../../next.config";

import React from "react";
import { Card, Col, Container, Form, Nav, Row, Alert } from "react-bootstrap";

export default function NewQuiz() {
    const router = useRouter();

    const [request, setRequest] = useState([]);
    const [createDisabled, setCreateDisabled] = useState(true);
    const [infoCards, setInfoCards] = useState([])
    useEffect(() => {
        if (request.length === 0) {
            setCreateDisabled(true)
        }
        else setCreateDisabled(false)

    }, [request])
    const createQuiz = async (x) => {
        console.log(createDisabled)

        if (createDisabled) return
        const body = { categories: x }
        var y = JSON.stringify(body)
        const response = await axios.post(`${API_URL}/quiz/new_quiz`, y, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*",
            }
        }).catch(err => console.log(err))
        let r = response.data
        setRequest([])
        console.log(response)
        if (response) {
            router.push({ pathname: `/quiz/view/${r.quiz_id}` })
        }

    }
    useEffect(() => setInfoCards([]), [])
    const formik = useFormik({
        enableReinitialize: "true",

        initialValues: {
            _questionCount: "5",
            _category: "8",
            _difficulty: "",
            _submittype: "",
        },

        onSubmit: async (values) => {

            if (values._submittype === "add") {
                const newRequest = { "_questionCount": values._questionCount.toString(), "_category": values._category, "_difficulty": values._difficulty }
                await setRequest([...request, newRequest])

                formik.setFieldValue("_questionCount", "5", false)
                formik.setFieldValue("_category", "8", false)
                formik.setFieldValue("_difficulty", "", false)
                let str = <Row key={Date.now()}>From Category:  {values._category}, difficulty: {values._difficulty}, questionCount: {values._questionCount}</Row>
                let a = [...infoCards, str]
                setInfoCards(a)

            }
            if (values._submittype === "create") {
                await createQuiz(request)
            }
            if (values._submittype === "delete") {

                setRequest([])
                setInfoCards([])

                formik.setFieldValue("_questionCount", "5", false)
                formik.setFieldValue("_category", "8", false)
                formik.setFieldValue("_difficulty", "", false)
            }
            formik.setFieldValue("_submittype", "", false)
        },

    }
    )

    return (
        <React.Fragment>
            <Container className={styles.body}>
                <Form onSubmit={formik.handleSubmit}>
                    <QuizForm formik={formik} ></QuizForm>
                </Form>
                <Form>
                    <Card key="showselection" className={styles.main}>
                        <h1 key="showselectionheader" className={styles.label}> Selection</h1>
                        <Row key="header" className={styles.label}>
                            You have selected :
                        </Row>
                        <Row key="infokeeper" className={styles.label}>
                            {infoCards}

                        </Row>
                    </Card>
                </Form>
            </Container>
        </React.Fragment >
    );
}


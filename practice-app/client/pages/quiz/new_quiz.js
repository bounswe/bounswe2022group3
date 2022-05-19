
import { useState, useEffect } from 'react';
import axios from "axios"
import { useRouter } from "next/router"
import { Field, Formik, useFormik } from "formik";

import QuizForm from "../../components/Quiz/QuizForm";
import QuizSummary from "../../components/Quiz/QuizSummary";
import styles from "../../styles/QuizForm.module.scss"


import 'bootstrap/dist/css/bootstrap.min.css';


import { API_URL } from "../../next.config";

import React from "react";
import { Card, Col, Container, Form, Nav, Row, Alert } from "react-bootstrap";

export default function NewQuiz() {
    const router = useRouter();

    const [request, setRequest] = useState([]);



    const createQuiz = async (x) => {
        //burada ayır  gelen inputu
        const body = { categories: x }
        var y = JSON.stringify(body)
        console.log(body)
        const response = await axios.post(`${API_URL}quiz/new_quiz`, y, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*",
            }
        })
        let r = response.data
        setRequest([])
        console.log(response)
        console.log(r)
        if (response) {
            console.log(response);
            localStorage.setItem("quiz_id", r.quiz_id)
            localStorage.setItem("questions", JSON.stringify(r.questions))
            router.push({ pathname: `/quiz/view/${r.quiz_id}`, })
        }

    }

    const formik = useFormik({
        enableReinitialize: "true",

        initialValues: {
            _questionCount: "5",
            _category: "",
            _difficulty: "",
            _submittype: "",
        },

        onSubmit: async (values) => {

            if (values._submittype === "add") {
                const newRequest = { "_questionCount": values._questionCount.toString(), "_category": values._category, "_difficulty": values._difficulty }
                console.log(newRequest)
                await setRequest([...request, newRequest])
                console.log(request)

                formik.setFieldValue("_questionCount", "5", false)
                formik.setFieldValue("_category", "", false)
                formik.setFieldValue("_difficulty", "", false)

            }
            if (values._submittype === "create") {
                const newRequest = { "_questionCount": values._questionCount.toString(), "_category": values._category, "_difficulty": values._difficulty }
                console.log(newRequest)
                await setRequest([...request, newRequest])
                console.log(request)

                var x = request.length === 0 ? newRequest : request
                await createQuiz(x)
            }
            if (values._submittype === "delete") {

                setRequest([])
                formik.setFieldValue("_questionCount", "5", false)
                formik.setFieldValue("_category", "", false)
                formik.setFieldValue("_difficulty", "", false)
            }
            formik.setFieldValue("_submittype", "", false)




        }
    })


    return (
        <React.Fragment>
            <Form onSubmit={formik.handleSubmit}>
                <QuizForm formik={formik} ></QuizForm>
            </Form>
        </React.Fragment >
    );
}
        //    <QuizSummary formik={formik} ></QuizSummary>


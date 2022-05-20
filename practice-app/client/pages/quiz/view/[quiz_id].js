/*import React from "react";
import { Card, Col, Container, Form, Nav, Row, Alert } from "react-bootstrap";
import { useRouter } from "next/router"

import styles from "../../../styles/QuizForm.module.scss"


export default function Quiz(props) {
    const router = useRouter();
    const k = router.query

    const quiz = JSON.parse(localStorage.getItem("questions"))
    console.log(quiz)
    const questions = []
    const answers = []
    //var splitter = new RegExp('\\.\\s*\\,')
    for (let i = 0; i < quiz.length; i++) {
        let obj = quiz[i]
        questions.push(obj.question)
        answers.push(obj.correct_answer)
    }

    return (
        <React.Fragment>
            <div className={styles.middle}>
                <h1>View</h1>

                <ul >
                    {quiz.map((e) => (

                        <li value = {e.correct_answer}>{e}

                        </li>
                    ))}
                </ul>

            </div>


        </React.Fragment>
    )

}*/
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Nav, Row, Alert } from "react-bootstrap";
import { useRouter } from "next/router"

import styles from "../../../styles/QuizForm.module.scss"
import axios from "axios";
import { API_URL } from "../../../next.config";


export default function Quiz() {
    const router = useRouter();

    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        if (!router.isReady) return;
        const quiz_id = router.query.quiz_id
        quizInfo(quiz_id)
    }, [router.isReady]);

    const quizInfo = async (k) => {
        const quiz = await axios.get(`${API_URL}quiz/view/${k}`);

        let obj = JSON.parse(quiz.data.questions[0])

        let q = []
        let a = []
        for (let i = 0; i < obj.length; i++) {

            q.push(obj[i].question)
            a.push(obj[i].correct_answer)
        }
        setQuestions(q)
        setAnswers(a)
    }
    return (
        <React.Fragment>
            <div className={styles.middle}>
                <h1 className={styles.label}>View</h1>
                {questions.map((e, i) =>
                    < Row key={e} value={e} > {e}
                        <Row > Answer : {answers[i]} </Row>
                    </Row>
                )}
            </div>
        </React.Fragment >
    )

}
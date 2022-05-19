import React from "react";
import { Card, Col, Container, Form, Nav, Row, Alert } from "react-bootstrap";
import { useRouter } from "next/router"

import styles from "../../../styles/QuizForm.module.scss"


export default function Quiz(props) {
    const router = useRouter();
    const k = router.query

    const quiz = JSON.parse(localStorage.getItem("questions"))
    const questions = []
    const answers = []
    for (let i = 0; i < quiz.length; i++) {
        let obj = quiz[i]
        questions.push(obj.question)
        answers.push(obj.correct_answer)
    }

    return (
        <React.Fragment>
            <div className={styles.middle}>
                <h2>HERE IS YOUR QUIZ</h2>

                <ul >
                    {quiz.map((e) => (

                        <li value={e.correct_answer}>{e.question}
                            <p>{e.correct_answer}</p>
                        </li>
                    ))}
                </ul>

            </div>


        </React.Fragment>
    )

}
import React from "react";
import { Card, Col, Container, Form, Nav, Row, Alert } from "react-bootstrap";
import { useRouter } from "next/router"

import styles from "../../../styles/QuizForm.module.scss"


export default function Quiz(props) {
    const router = useRouter();
    const k = router.query

    const quiz = JSON.parse(localStorage.getItem("questions"))
    let t = quiz
    const questions = []
    const answers = []
    var splitter = new RegExp('\\.\\s*\\,')
    for (let i = 0; i < t.length; i++) {
        var line = t[i].split(splitter)
        questions.push(line[0] + ".")
        var a = line[1].split(',')
        answers.push(a[0])
    }

    console.log(questions)
    console.log(t)
    return (
        <React.Fragment>
            <div className={styles.middle}>
                <h1>View</h1>

                <ul >
                    {questions.map((e) => (

                        <li>{e}

                        </li>
                    ))}
                </ul>

            </div>


        </React.Fragment>
    )

}
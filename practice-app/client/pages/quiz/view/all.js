import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"
import styles from "../../../styles/QuizForm.module.scss"
import { API_URL } from "../../../next.config";
import axios from "axios"
import Link from "next/link";

export default function View(props) {

    const router = useRouter();
    const [quizzes, setQuizzes] = useState([])

    const fetchQuizzes = async () => {
        let res = await (await axios.get(`${API_URL}quiz/view/all`)).data.quizzes
        var tmp = []
        for (let i = 0; i < res.length; i++) {
            let obj = res[i]
            tmp.push(obj.quiz_id)
        }
        setQuizzes(tmp)
    }


    useEffect(() => {
        fetchQuizzes();
    }, [])

    return (
        <React.Fragment>
            <div className={styles.middle}>
                <h1 className={styles.label}>SAVED QUIZZES</h1>

                <div className={styles.miniblock}>

                    <ul>
                        {quizzes.map((e) =>
                            <li type="submit" key={e} onClick={() => { router.query.quiz_id = { e }; router.push(`/quiz/view/${e}`) }}>{e}
                                <br />
                            </li>
                        )}
                    </ul>
                    <div></div>
                    <button className={styles.button} style={{ width: "30%" }} onClick={() => router.push("/quiz")}> GO BACK </button>
                </div>
            </div>
        </React.Fragment>
    )

}
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Col, Container, Form, Nav, Row, Alert } from "react-bootstrap";
import styles from "../../styles/QuizForm.module.scss"

import { API_URL } from "../../next.config";

export default function Categories() {

    const fetchCategories = async () => {
        let c = await axios.get(`${API_URL}quiz/categories`);
        var tmp = []
        Object.entries(c.data).map((e) => { tmp.push(e[1].name) })
        setCategories(tmp)
    }
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetchCategories();
    }, [])
    return (
        <React.Fragment>
            <div className={styles.middle}>
                <h1 className={styles.label}>Categories</h1>

                <div className={styles.miniblock}>

                    <ul>
                        {categories.map((e) =>
                            <li>{e}</li>
                        )}
                    </ul>
                </div>
            </div>


        </React.Fragment>
    )

}
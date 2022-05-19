import React from "react";
import { Card, Col, Container, Form, Nav, Row, Alert } from "react-bootstrap";
import { useRouter } from "next/router"
import { useState, useEffect } from 'react';
import axios from "axios"

export default function View(props) {
    const router = useRouter();
    const k = router.query

    const quiz = [{ "x": "a" }, { "x": "b" }]


    return (
        <React.Fragment>
            <h1>View</h1>
            <div>
                <ul>
                    {quiz.map((e) => (

                        <li>{e.x}
                            <p>True</p>
                        </li>
                    ))}
                </ul>

            </div>


        </React.Fragment>
    )

}
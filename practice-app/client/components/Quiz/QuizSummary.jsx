import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import styles from "../../styles/QuizForm.module.scss"



function Summary(props) {

    const { formik } = props;

    var xx = JSON.stringify(formik.values)
    var infotext = []



    return (
        <React.Fragment>
            <Card className={styles.card} style={{ backgroundColor: "lavender" }}>
                <h1 className={styles.label}> Selection</h1>
                <Row className={styles.miniblock}>
                    <Card.Text className={styles.input} style={{ border: "0px" }}>
                        You have selected :
                    </Card.Text>
                    <Card.Text className={styles.input} style={{ border: "0px" }}>
                        Categories : {xx}
                    </Card.Text>
                </Row>
            </Card>
        </React.Fragment >
    );
}

export default Summary;
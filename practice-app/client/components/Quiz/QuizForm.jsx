import React from "react";
import MyButton from '../Button/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Form, FormFloating, Row, Alert, Dropdown, DropdownButton, DropdownMenu, FormGroup, InputGroup } from "react-bootstrap";
import styles from "../../styles/QuizForm.module.scss"
import { Formik } from "formik"

const difficultyLevel = [
  {
    key: "5",
    label: "Any Difficulty",
    value: "",
  },
  {
    key: "1",
    label: "Easy",
    value: "easy",
  },
  {
    key: "2",
    label: "Medium",
    value: "medium",
  },
  {
    key: "4",
    label: "Hard",
    value: "hard",
  },
];

const categoryList = [

  {
    key: "8",
    label: "Any Category",
    value: "8",
  },
  {
    key: "9",
    label: "General Knowledge",
    value: "9",
  },
  {
    key: "10",
    label: "Entertainment: Books",
    value: "10",
  },
  {
    key: "11",
    label: "Entertainment: Film",
    value: "11",
  },
  {
    key: "12",
    label: "Entertainment: Music",
    value: "12",
  },
  {
    key: "13",
    label: "Entertainment: Musicals & Theatres",
    value: "13",
  },
  {
    key: "14",
    label: "Entertainment: Television",
    value: "14",
  },
  {
    key: "15",
    label: "Entertainment: Video Games",
    value: "15",
  },
  {
    key: "16",
    label: "Entertainment: Board Games",
    value: "16",
  },
  {
    key: "29",
    label: "Entertainment: Comics",
    value: "29",
  },
  {
    key: "31",
    label: "Entertainment: Japanese Anime & Manga",
    value: "31",
  },
  {
    key: "32",
    label: "Entertainment: Cartoon &amp; Animations",
    value: "32",
  },
  {
    key: "17",
    label: "Science &amp; Nature",
    value: "17",
  },
  {
    key: "18",
    label: "Science: Computers",
    value: "18",
  },
  {
    key: "19",
    label: "Science: Mathematics",
    value: "19",
  },
  {
    key: "30",
    label: "Science: Gadgets",
    value: "30",
  },
  {
    key: "20",
    label: "Mythology",
    value: "20",
  },
  {
    key: "21",
    label: "Sports",
    value: "21",
  },
  {
    key: "22",
    label: "Geography",
    value: "22",
  },
  {
    key: "23",
    label: "History",
    value: "23",
  },
  {
    key: "24",
    label: "Politics",
    value: "24",
  },
  {
    key: "25",
    label: "Art",
    value: "25",
  },
  {
    key: "26",
    label: "Celebrities",
    value: "26",
  },
  {
    key: "27",
    label: "Animals",
    value: "27",
  },
  {
    key: "28",
    label: "Vehicles",
    value: "28",
  },
];


export default function QuizForm(props) {
  const { formik } = props;

  return (
    <React.Fragment>

      <Card className={styles.main}>
        <h1 className={styles.label}>Quizzes!</h1>
        <Row className={styles.miniblock}>
          <FormGroup key="questionCountGroup" className={styles.miniblock}>
            <Form.Label key="questionCountLabel" className={styles.label} />Question Amount
            <InputGroup className={styles.input} >
              <Form.Control key="questionCountControl" name="_questionCount" value={formik.values._questionCount} type="number" placeholder="5" onChange={formik.handleChange} />
            </InputGroup>
            <Form.Text className="text-muted">
              Please enter a number between 1 and 50
            </Form.Text>
          </FormGroup>
          <br />

          <Form.Group key="categoryGroup" className={styles.miniblock}>
            <Form.Label key="categoryLabel" className={styles.label} />Category
            <InputGroup >
              <Form.Select
                name="_category"
                onChange={formik.handleChange}
                className={styles.select}
                value={formik.values._category}
                key="categorySelect"
              >
                {categoryList.map((c) => (
                  <option key={c.value} value={c.value}> {c.label} </option>
                ))}
              </Form.Select>
            </InputGroup>
            <Form.Text key="categoryText" className="text-muted">
              Please choose a category
            </Form.Text>
          </Form.Group>

          <br />
          <Form.Group key="difficultyGroup" className={styles.miniblock}>
            <Form.Label key="difficultyLabel" className={styles.label} />Difficulty
            <InputGroup>
              <Form.Select
                name="_difficulty"
                onChange={formik.handleChange}
                className={styles.select}
                key="difficultySelect"
                value={formik.values._difficulty}
              >
                {difficultyLevel.map((c) => (
                  <option key={c.value} value={c.value}> {c.label} </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group>
          <br />
          <Row className={styles.mininext}>

            <Button className={styles.button} type="submit" name="add" onClick={() => { formik.setFieldValue("_submittype", "add", false); formik.handleSubmit }} >Add New Category</Button>
            <Col style={{ width: "20px" }}></Col>

            <Button className={styles.button} type="submit" name="create" onClick={() => { formik.setFieldValue("_submittype", "create", false); formik.handleSubmit }}> Create Quiz </Button>

            <Col style={{ width: "20px" }}></Col>


            <Button className={styles.button} type="submit" name="delete" onClick={() => { formik.setFieldValue("_submittype", "delete", false); formik.handleSubmit }}> Delete Selection </Button>

          </Row>
        </Row>
      </Card>

    </React.Fragment >
  );
}

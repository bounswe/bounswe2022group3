import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Button from "../../components/Button/Button";
import CourseCard from "../../components/CourseCard/CourseCard"
import AuthLayout from "../../layouts/auth/AuthLayout";
import styles from "../../styles/user/home.module.scss";
import axios from "axios";
import { API_URL } from "../../next.config";


export default function home() {

    /*API CALL HERE*/

    let courseList = [
        {
            id:"634cdaead5643175d5196efc",
            title: "Introduction to Data Science",
            course_info:"Interested in learning more about data science, but don’t know where to start?",
            rating: 4.7,
            courseImage: "/math.jpeg"
        },

        {
            id:"634cdaead5643175d5196efa",
            title: "Math101",
            course_info:"Interested in learning more about MATH, but don’t know where to start?",
            rating: 4.7,
            courseImage: "/math.jpeg"
        },

        {
            id:"634cdaead5643175d5196efb",
            title: "Knitting",
            course_info:"Interested in learning more about knitting, but don’t know where to start?",
            rating: 4.7,
            courseImage: "/math.jpeg"
        },

        {
            id:"634cdaead5643175d5196efd",
            title: "Introduction to Next.js",
            course_info:"Interested in learning more about next.js, but don’t know where to start?",
            rating: 4.7,
            courseImage: "/math.jpeg"
        },
        {
            id:"634cdaead5643175d5196ef4",
            title: "Introduction to Data Science",
            course_info:"Interested in learning more about data science, but don’t know where to start?",
            rating: 4.7,
            courseImage: "/math.jpeg"
        },

        {
            id:"634cdaead5643175d5196ef3",
            title: "Math101",
            course_info:"Interested in learning more about MATH, but don’t know where to start?",
            rating: 4.7,
            courseImage: "/math.jpeg"
        },

        {
            id:"634cdaead5643175d5196ef2",
            title: "Knitting",
            course_info:"Interested in learning more about knitting, but don’t know where to start?",
            rating: 4.7,
            courseImage: "/math.jpeg"
        },

        {
            id:"634cdaead5643175d5196ef1",
            title: "Introduction to Next.js",
            course_info:"Interested in learning more about next.js, but don’t know where to start?",
            rating: 4.7,
            courseImage: "/math.jpeg"
        }
    ]

    return (
        <>
            <div className={styles.courseListContainer}>
                {
                    courseList.map(course => 
                        <CourseCard courseInfo={course.course_info} courseTitle={course.title} courseRating={course.rating} courseImage={course.courseImage} key={course.id}></CourseCard>
                    )
                }
                
            </div>
        </>
    );
}

/*
register.getLayout = function getLayout(page) {
    return <AuthLayout>{page}</AuthLayout>;
};
*/
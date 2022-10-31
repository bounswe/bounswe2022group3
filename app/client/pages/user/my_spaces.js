import CourseCard from "../../components/CourseCard/CourseCard"
import UserLayout from "../../layouts/user-layout/UserLayout";
import styles from "../../styles/user/home.module.scss";
import axios from "axios";
import { API_URL } from "../../next.config";
import React, { useState, useEffect, use } from 'react'

export default function home() {

    const [courseList, setCourseList] = useState([])


    async function getCourses(e) {
        
        const data = (await axios.get(API_URL + "/course/getCourses/")).data
        setCourseList(data.courses)

    }

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <>
            <div className={styles.courseHomePage}>
                <div className={styles.courseListContainer}>

                    {
                        courseList.map(course =>
                            <a className={styles.courseLink} href={'/course/' + course._id}>
                                <CourseCard
                                    courseId={course._id}
                                    courseInfo={course.info}
                                    courseTitle={course.name}
                                    courseInstructor={course.lecturer.name}
                                    courseRating={5}
                                    courseImage={course.image}>
                                </CourseCard>
                            </a>

                        )
                    }

                </div>
            </div>

        </>
    );
}

home.getLayout = function getLayout(page) {
    return <UserLayout>{page}</UserLayout>;
};
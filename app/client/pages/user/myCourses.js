import CourseCard from "../../components/CourseCard/CourseCard"
import UserLayout from "../../layouts/user-layout/UserLayout";
import styles from "../../styles/user/home.module.scss";
import axios from "axios";
import { API_URL } from "../../next.config";
import { Search } from '@mui/icons-material';
import { IconButton } from "@mui/material";
import React, { useState, useEffect, useCallback } from 'react'
import debounce from "lodash/debounce";


export default function courses() {

    const onSearchbarChange = async (e) => {
        const { value } = e.target;
        debounceSearch(value)
    }

    const debounceSearch = useCallback(
        debounce((value) => getCourses(value), 500),
        []
      );


    const [courseList, setCourseList] = useState([])


    async function getCourses(courseKey) {
        console.log(courseKey)
        const data = (await axios.get(API_URL + "/course/getCourses/" + courseKey)).data
        setCourseList(data.courses)

    }

    useEffect(() => {
        getCourses("");
    }, []);


    return (
        <>
            <div className={styles.courseHomePage}>
                <div className={styles.searchBar}>
                    <input
                        className={styles.input}
                        onChange={onSearchbarChange}
                        type="search"
                        placeholder="Search for a course.." />
                    <IconButton >
                        <Search fontSize="small" className={styles.navbarProfileLogo} />
                    </IconButton>
                </div>
                <div className={styles.courseListContainer}>

                    {
                        courseList.map(course =>
                            <a href={'course/' + course.id}>
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

courses.getLayout = function getLayout(page) {
    return <UserLayout>{page}</UserLayout>;
};
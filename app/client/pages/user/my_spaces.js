import { useCallback, useEffect, useState } from 'react'
import styles from '../../styles/user/spaces.module.scss'
import Button from '../../components/Button/Button'
import { Avatar, AvatarGroup, Rating, styled, TextField, Tooltip, tooltipClasses } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { API_URL } from "../../next.config";
import debounce from "lodash/debounce";
import axios from 'axios'
import Link from 'next/link'
import Masonry from 'react-masonry-css'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
import UserLayout2 from '../../layouts/user-layout2/UserLayout2';


export default function Home() {
    const [courseList, setCourseList] = useState([])

    const router = useRouter();

    const onSearchbarChange = async (e) => {
        const { value } = e.target;
        debounceSearch(value)
    }

    const debounceSearch = useCallback(
        debounce((value) => getCourses(value), 500), []
    );

    async function getCourses(courseKey) {
        try {
            const data = (
                await axios.get(`${API_URL}/enrollment/getEnrolledSpaces/${courseKey}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
            )?.data
            setCourseList(data.enrollments)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!(localStorage.getItem("access_token") && localStorage.getItem("user_id"))) {
            router.push("/")
        }
        getCourses("");
    }, []);

    const breakpointColumnsObj = {
        default: 3,
        1250: 2,
        950: 1
    };

    // const CustomTooltip = styled(({ className, ...props }) => (
    //     <Tooltip {...props} classes={{ popper: className }} />
    // ))(({ theme }) => ({
    //     [`& .${tooltipClasses.arrow}`]: {
    //         color: "#4d4ffa",
    //     },
    //     [`& .${tooltipClasses.tooltip}`]: {
    //         backgroundColor: "#4d4ffa",
    //         color: '#fff'
    //     },
    // }));

    async function logout() {
        try {
            await axios.post(API_URL + "/user/logout", {})
        } catch (err) {
            console.log(err);
        }

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("email");
        localStorage.removeItem("user_id");
        router.push("/user/login");
    }

    return (
        <>
            <section className={styles.hero}>
                <h2>Welcome back!</h2>
                <h3>Ready to learn more?</h3>
            </section>

            <div className={styles.search}>
                <div className={styles.searchbar}>
                    <SearchIcon />
                    <form className={styles.searchbar_form}>
                        <input type="search" placeholder="Search..." className={styles.searchbar_input} onChange={onSearchbarChange} />
                    </form>
                </div>
            </div>

            <section className={styles.spaces} id="spaces">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {
                        courseList.map(course => {
                            return <Link href={'/my/spaces/' + course._id + "/resources"}>
                                <div className={styles.card} style={{border: course.creator._id == localStorage.getItem("user_id") && "2px solid #4d4ffa"}}>
                                    <div className={styles.image}>
                                        <img src={course.image} layout="fill" />
                                    </div>

                                    <div className={styles.details}>
                                        <h3>{course.name}</h3>
                                        <div>
                                            <h4>{course.creator.name} {course.creator.surname}</h4>
                                            <Rating defaultValue={Math.random() * 5} precision={0.1} readOnly />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        })
                    }
                </Masonry>
            </section>
        </>
    )
}

Home.getLayout = function getLayout(page) {
    return <UserLayout2>{page}</UserLayout2>;
};
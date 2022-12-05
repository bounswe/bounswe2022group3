import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import styles from '../styles/home/home.module.scss'
import Button from '../components/Button/Button'
import { Avatar, AvatarGroup, Rating, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { API_URL } from "../next.config";
import debounce from "lodash/debounce";
import axios from 'axios'
import Link from 'next/link'
import Masonry from 'react-masonry-css'

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
      const data = (await axios.get(API_URL + "/space/searchSpaces/" + courseKey))?.data
      setCourseList(data.spaces)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getCourses("");
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1250: 2,
    950: 1
  };

  if (typeof window === "undefined") {
    return <></>
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.icon}>
          <img src="/education.png" width="50px" height="50px" />
          <h2>BUcademy</h2>
        </div>
        <nav className={styles.main_nav}>
          <ul className={styles.main_nav_list}>
            <li>
              <a href="#spaces" className={styles.main_nav_links}>Learning Spaces</a>
            </li>
            {/* <li>
              <a href="#meals" className={styles.main_nav_links}>Testimonials</a>
            </li> */}
            <li>
              <Button style={{ padding: "0 20px" }} onClick={() => localStorage?.getItem("access_token") ? router.push("/user/my_spaces") : router.push("/user/register")}>
                {localStorage?.getItem("access_token") ? "My Spaces" : "Join the platform"}
              </Button>
            </li>
          </ul>
        </nav>

        {/* <button className={styles.btn_mobile_nav}>
        <ion_icon class="icon_mobile_nav" name="menu_outline"></ion_icon>
        <ion_icon class="icon_mobile_nav" name="close_outline"></ion_icon>
      </button> */}
      </header>

      <section className={styles.hero}>
        <div className={styles.hero_txt}>
          <h3>Discover countless co-learning spaces and start learning now</h3>
          <div className={styles.hero_avatars}>
            <AvatarGroup variant="round"
              sx={{ maxWidth: "200px" }}
              spacing="medium"
              className={styles.hero_avators}>
              <Avatar src="https://i.pravatar.cc/150?img=1" />
              <Avatar src="https://i.pravatar.cc/150?img=3" />
              <Avatar src="https://i.pravatar.cc/150?img=5" />
              <Avatar src="https://i.pravatar.cc/150?img=8" />
              <Avatar src="https://i.pravatar.cc/150?img=9" />
            </AvatarGroup>
            <p>
              <strong>250,000+</strong> have already joined
            </p>
          </div>

        </div>
        <div className={styles.hero_img}>
          <img src="/home.jpg" />
        </div>
      </section>

      <div className={styles.search_container} id="search">
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
              return <Link href={'/space/' + course._id}>
                <div className={styles.card}>
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
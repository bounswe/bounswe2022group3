import { IconButton } from "@mui/material";
import Image from "next/image";
import styles from "./UserLayout.module.scss";
import Icon from '@mui/material/Icon';
import { Home, School, AccountCircle } from '@mui/icons-material';
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useRouter } from "next/router";
import Link from "next/link";

function UserLayout({ children }) {
    const [loggedIn, setLoggedIn] = useState(false)

    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setLoggedIn(true)
        }
    }, [])


    return (
        <>
            <div className={styles.pageContainer}>
                <div id="navbar" className={styles.navbar}>
                    <div className={styles.icon}>
                        <Image src="/education.png" width="50px" height="50px" />
                        <h2>BUcademy</h2>
                    </div>
                    <div>

                        {loggedIn && router.pathname != "/user/home" && <Link href="/user/home">
                            <div className={styles.navbarIconContainer}>
                                <IconButton>
                                    <Home />
                                </IconButton>
                                Home
                            </div>
                        </Link>}

                        {loggedIn && router.pathname != "/user/my_spaces" && <Link href="/user/my_spaces">
                            <div className={styles.navbarIconContainer}>
                                <IconButton>
                                    <School />
                                </IconButton>
                                My Courses
                            </div>
                        </Link>}

                        {loggedIn && router.pathname != "/user/[user_id]" && <Link href={`/user/${localStorage.getItem("user_id")}`}>
                            <div className={styles.navbarIconContainer}>
                                <IconButton >
                                    <AccountCircle/>
                                </IconButton>
                                My profile
                            </div>
                        </Link>}

                        {!loggedIn && <div><Button style={{ marginTop: "6px" }} onClick={() => router.push("/user/register")}>
                            Login/Register
                        </Button></div>}
                    </div>
                </div>
                {children}
            </div>

        </>
    );
}

export default UserLayout;

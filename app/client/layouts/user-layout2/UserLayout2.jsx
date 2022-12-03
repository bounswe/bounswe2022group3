import { IconButton, styled, Tooltip, tooltipClasses } from "@mui/material";
import styles from "./UserLayout.module.scss";
import { Home, School, AccountCircle } from '@mui/icons-material';
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "#4d4ffa",
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#4d4ffa",
        color: '#fff'
    },
}));

function UserLayout2({ children }) {
    const [loggedIn, setLoggedIn] = useState(false)

    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setLoggedIn(true)
        }
        else {
            router.push("/user/login")
        }
    }, [])

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
        localStorage.removeItem("display_name");
        router.push("/user/login");
    }

    if (!loggedIn) {
        return <></>
    }

    return (
        <>
            <header className={styles.header}>
                <a href="#">
                    <div className={styles.icon}>
                        <img src="/education.png" width="50px" height="50px" />
                        <h2>BUcademy</h2>
                    </div>
                </a>
                <nav className={styles.main_nav}>
                    <ul className={styles.main_nav_list}>
                        <li>
                            <Link href="/">
                                <CustomTooltip title="Home" arrow>
                                    <HomeIcon />
                                </CustomTooltip>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/user/${typeof window !== 'undefined' && localStorage.getItem("user_id")}`}>
                                <CustomTooltip title="Profile" arrow>
                                    <PersonIcon />
                                </CustomTooltip>
                            </Link>
                        </li>
                        <li onClick={logout}>
                            <CustomTooltip title="Logout" arrow>
                                <LogoutIcon />
                            </CustomTooltip>
                        </li>
                        <li>
                            <Button style={{ padding: "0 20px" }} onClick={() => router.push(router.pathname == "/user/my_spaces" ? "/space/create_space" : "/user/my_spaces")}>
                                {router.pathname == "/user/my_spaces" ? "Create space" : "My spaces"}
                            </Button>
                        </li>
                    </ul>
                </nav>

                {/* <button className={styles.btn_mobile_nav}>
        <ion_icon class="icon_mobile_nav" name="menu_outline"></ion_icon>
        <ion_icon class="icon_mobile_nav" name="close_outline"></ion_icon>
      </button> */}
            </header>
            {children}

        </>
    );
}

export default UserLayout2;

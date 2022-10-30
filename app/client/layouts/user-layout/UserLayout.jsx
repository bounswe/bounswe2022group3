import { IconButton } from "@mui/material";
import Image from "next/image";
import styles from "./UserLayout.module.scss";
import Icon from '@mui/material/Icon';
import { Home, School, AccountCircle } from '@mui/icons-material';

function UserLayout({ children }) {

    return (
        <>
            <div className={styles.pageContainer}>
                <div id="navbar" className={styles.navbar}>
                    <div>
                        <Image
                            className={styles.navbarLogo}
                            src="/education.png"
                            width="60px"
                            height="60px"
                        />

                        <a href="/user/home">
                            <div className={styles.navbarIconContainer}>
                                <IconButton>
                                    <Home />
                                </IconButton>
                                Home
                            </div>
                        </a>

                        <a href="/user/myCourses">
                            <div className={styles.navbarIconContainer}>
                                <IconButton>
                                    <School />
                                </IconButton>
                                My Courses
                            </div>
                        </a>
                    </div>


                    <a href="/user/profile">
                        <IconButton >
                            <AccountCircle fontSize="large" className={styles.navbarProfileLogo} />
                        </IconButton>
                    </a>
                </div>
                {children}
            </div>

        </>
    );
}

export default UserLayout;

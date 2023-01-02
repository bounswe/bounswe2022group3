import { IconButton, styled, Tooltip, tooltipClasses } from "@mui/material";
import styles from "./UserLayout.module.scss";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import axios from "axios";
import { API_URL } from "../../next.config";
import dynamic from "next/dynamic";

const MarkdownPreview = dynamic(
    () => import("@uiw/react-markdown-preview"),
    { ssr: false }
);

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
    const [anchorEl, setAnchorEl] = useState(null);
    const [activities, setActivities] = useState([]);
    const [badgeCount, setBadgeCount] = useState(0);
    const router = useRouter();
    const router_query = router.query;


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setBadgeCount(0);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    async function fetchContent() {
        try {
            const response = (
                await axios.get(API_URL + "/activity/getFeed", {})
            );
            const activityList = response?.data.feed.map(
                (activity) => {
                    if (activity.event && activity.space) {
                        activity.type = "createEvent"
                        activity.link = "/my/spaces/" + activity.space + "/events"
                    }

                    if (activity.resource && activity.space) {
                        activity.type = "createResource"
                        activity.link = "/my/spaces/" + activity.space + "/resource/" + activity.resource
                    }

                    if (activity.topic && activity.space && activity.resource == undefined) {
                        activity.type = "createTopic"
                        activity.link = "/my/spaces/" + activity.space + "/resources"
                    }

                    if (activity.discussion && activity.space) {
                        activity.type = "discussion"
                        activity.link = "/my/spaces/" + activity.space + "/discussion/" + activity.discussion
                    }

                    if (activity.topic == undefined && activity.event == undefined && activity.resource == undefined && activity.discussion == undefined && activity.space) {
                        activity.type = "createSpace"
                        activity.link = "/space/" + activity.space + ""
                    }

                    return activity;
                }
            )
            const lastDate = localStorage.getItem("lastDate") || new Date();
            const count = response?.data.feed.filter((activity) => { return new Date(activity.createdAt) > new Date(lastDate) }).length;
            localStorage.setItem("lastDate", new Date());
            setBadgeCount(count);
            setActivities(activityList);


        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setLoggedIn(true)
            fetchContent();
        }
        else {
            router.push("/user/login")
        }
    }, [])

    useEffect(() => {
        fetchContent();
    }, [loggedIn])

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
                <Link href="/">
                    <div className={styles.icon} style={{ cursor: "pointer" }}>
                        <img src="/education.png" width="50px" height="50px" />
                        <h2>BUcademy</h2>
                    </div>
                </Link>
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
                        <li >
                            <CustomTooltip title="Notifications" arrow aria-describedby={id} variant="contained" onClick={handleClick}>
                                <Badge badgeContent={badgeCount} color="primary">
                                    <NotificationsIcon />
                                </Badge>
                            </CustomTooltip>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                            >
                                <div className={styles.activitiesPageContainer}>
                                    <div className={styles.activitiesContainer}>
                                        {
                                            activities?.map((activity, index) =>
                                                <Link href={activity.link} key={activity._id}>
                                                    <div className={styles.activityContainer} >

                                                        <img
                                                            src={`${API_URL}/user/${activity?.user?.image}`}
                                                            alt="User"
                                                            className="review__photo"
                                                        />

                                                        <div className={styles.activityBody}>{activity.body}</div>
                                                    </div>

                                                </Link>

                                            )
                                        }
                                    </div>

                                </div>
                            </Popover>
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

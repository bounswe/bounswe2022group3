import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "../../next.config";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupIcon from '@mui/icons-material/Group';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "./MainLayout.module.scss";

function MainLayout({ children }) {
    const router = useRouter();
    const [login, setLogin] = useState(true);
    const [spaceId, setSpaceId] = useState("");

    useEffect(async () => {
        try {
            const payload = {
                email: localStorage.getItem("email"),
                refresh_token: localStorage.getItem("refresh_token"),
            };
            const response = (
                await axios.post(API_URL + "/user/refresh_tokens", payload)
            )?.data;
            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("refresh_token", response.refresh_token);
            setLogin(true);
        } catch (err) {
            console.log(err);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("email");
            router.push("/user/login");
        }
    }, []);

    useEffect(() => {
        if (router.query && router.query.space_id) {
            setSpaceId(router.query.space_id)
        }
    }, [router.query])

    return (
        <main className={styles.main}>
            <div className={styles.navbar}>
                <div className={styles.icon}>
                    <Link href="/user/home">
                        <img src="/education.png" width="50px" height="50px" style={{cursor: 'pointer'}} />
                    </Link>
                </div>
                <nav className={styles.nav}>
                    <Link href={`/my/spaces/${spaceId}/resources`}>
                        <div
                            className={
                                router.pathname === "/my/spaces/[space_id]/resources"
                                    ? styles.selected
                                    : ""
                            }
                        >
                            <LibraryBooksIcon />
                        </div>
                    </Link>

                    <Link href={`/my/spaces/${spaceId}/events`}>
                        <div
                            className={
                                router.pathname === "/my/spaces/[space_id]/events"
                                    ? styles.selected
                                    : ""
                            }
                        >
                            <EventNoteIcon />
                        </div>
                    </Link>
                    <Link href={`/my/spaces/${spaceId}/discussions`}>
                        <div
                            className={
                                router.pathname === "/my/spaces/[space_id]/discussions"
                                    ? styles.selected
                                    : ""
                            }
                        >
                            <GroupIcon />
                        </div>
                    </Link>
                    <Link href={`/my/spaces/${spaceId}/notes`}>
                        <div
                            className={
                                router.pathname === "/my/spaces/[space_id]/notes"
                                    ? styles.selected
                                    : ""
                            }
                        >
                            <NoteAltIcon />
                        </div>
                    </Link>
                </nav>
                <div className={styles.exit} onClick={() => router.push("/user/home")}>
                    <LogoutIcon />
                </div>
            </div>

            <nav className={styles.mobile_nav}>
                <Link href={`/my/spaces/${spaceId}/resources`}>
                    <div
                        className={
                            router.pathname === "/my/spaces/[space_id]/resources"
                                ? styles.selected
                                : ""
                        }
                    >
                        <LibraryBooksIcon />
                    </div>
                </Link>

                <Link href={`/my/spaces/${spaceId}/events`}>
                    <div
                        className={
                            router.pathname === "/my/spaces/[space_id]/events"
                                ? styles.selected
                                : ""
                        }
                    >
                        <EventNoteIcon />
                    </div>
                </Link>
                <Link href={`/my/spaces/${spaceId}/discussions`}>
                    <div
                        className={
                            router.pathname === "/my/spaces/[space_id]/discussions"
                                ? styles.selected
                                : ""
                        }
                    >
                        <GroupIcon />
                    </div>
                </Link>
                <Link href={`/my/spaces/${spaceId}/notes`}>
                    <div
                        className={
                            router.pathname === "/my/spaces/[space_id]/notes"
                                ? styles.selected
                                : ""
                        }
                    >
                        <NoteAltIcon />
                    </div>
                </Link>
                <div onClick={() => router.push("/user/home")}>
                    <LogoutIcon />
                </div>
            </nav>
            <div className={styles.body}>{login && children}</div>
        </main>
    );
}

export default MainLayout;

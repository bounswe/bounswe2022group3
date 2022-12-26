import UserLayout2 from "../../../layouts/user-layout2/UserLayout2";
import styles from "../../../styles/user/activities.module.scss";
import axios from "axios";
import { useRouter } from 'next/router'
import { API_URL } from "../../../next.config";
import dynamic from "next/dynamic";
import { ChatBubble, PostAdd, Article, PersonAdd, LocationOn, Groups } from '@mui/icons-material';
import React, { useState, useEffect, useCallback } from 'react'
import debounce from "lodash/debounce";
import Link from 'next/link';

const MarkdownPreview = dynamic(
    () => import("@uiw/react-markdown-preview"),
    { ssr: false }
);

export default function activities() {
    const [activities, setActivities] = useState([]);
    const router = useRouter();
    const router_query = router.query;

    async function fetchContent() {
        try {
            if (router_query?.user_id !== undefined) {

                const response = (
                    await axios.get(API_URL + "/activity/getFeed")
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
                setActivities(activityList);
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log('fetch');
        fetchContent();
    }, [router_query]);


    return (
        <>
            <div className={styles.activitiesPageContainer}>
                <h1 className={styles.activitiesTitle}>Activities</h1>
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
        </>
    );
}

activities.getLayout = function getLayout(page) {
    return <UserLayout2>{page}</UserLayout2>;
};
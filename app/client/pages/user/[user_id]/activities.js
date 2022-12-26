import UserLayout2 from "../../../layouts/user-layout2/UserLayout2";
import styles from "../../../styles/user/activities.module.scss";
import axios from "axios";
import { useRouter } from 'next/router'
import { API_URL } from "../../../next.config";
import dynamic from "next/dynamic";
import { ChatBubble, PostAdd, Article, PersonAdd } from '@mui/icons-material';
import React, { useState, useEffect, useCallback } from 'react'
import debounce from "lodash/debounce";

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
                console.log(response)
                setActivities(response?.data.feed);
                

                console.log(activities);
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
            <section className={styles.activitiesPageContainer}>
                <h1 className={styles.activitiesTitle}>Activities</h1>
                <div className={styles.activitiesContainer}>
                    {
                        activities?.map((activity, index) =>
                            <div className={styles.activityContainer} key={activity._id}>
                                <div className={styles.activityIconFrame}>
                                    {activity.type == "discussionPost" && <ChatBubble className={styles.activityIcon} />}
                                    {activity.type == "spaceCreation" && <PostAdd className={styles.activityIcon} />}
                                    {activity.type == "spaceEnroll" && <Article className={styles.activityIcon} />}
                                </div>
                                <MarkdownPreview source={activity.body} />
                            </div>
                        )
                    }
                </div>

            </section>
        </>
    );
}

activities.getLayout = function getLayout(page) {
    return <UserLayout2>{page}</UserLayout2>;
};
import React from 'react';
import styles from '../../../../../styles/my/resource_detail.module.scss'
import { useRouter } from 'next/router'
import { API_URL } from "../../../../../next.config";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import MainLayout from "../../../../../layouts/main/MainLayout";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Toolbar, Tooltip, tooltipClasses } from "@mui/material";
import Rating from "../../../../../components/Rating/Rating"
import Button from "../../../../../components/Button/Button";
import moment from "moment";
import scrollIntoView from "scroll-into-view";
import Discussion from "../../../../../components/Discussion/Discussion"

import '@recogito/recogito-js/dist/recogito.min.css';
import { Box } from '@mui/system';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Link from 'next/link';


import CreateNote from "../../../../../components/PopUps/CreateNote";
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);
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

const drawerWidth = 275;

export default function resource() {
    const [editModeActive, setEditModeActive] = useState(false);
    const [resourceValue, setResourceValue] = useState("");
    const [data, setData] = useState({});
    const [annotations, setAnnotations] = useState([])
    const [rec, setRec] = useState(null)
    const [open, setOpen] = React.useState(false);

    const router = useRouter();
    const [openCreateNote, setOpenCreateNote] = useState(false);
    const [previousComments, setPreviousComments] = useState([]);
    const [reRender, setReRender] = useState(false);
    const [value, setValue] = useState("");
    let router_query = router.query;

    const [post, setPost] = useState("");

    let intervalId;

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    function selectAnnotation(id) {
        const annotationSpan = document.querySelector(`.r6o-annotation[data-id="${id}"]`)
        // Create the event
        if (annotationSpan && rec && rec._app && rec._app.current) {
            scrollIntoView(annotationSpan)
            rec._app.current.onNormalSelect({
                selection: rec._app.current.highlighter.getAnnotationsAt(annotationSpan)[0],
                element: annotationSpan
            });
        }
    }

    const drawer = (
        <div style={{ overflowY: "auto" }}>
            {
                annotations.map(annotation => <figure className="review" onClick={() => selectAnnotation(annotation.id)}>
                    <blockquote className="review__text">{annotation.target.selector[0].exact}</blockquote>
                    <figcaption className="review__user">
                        <p className="review__user-name">{annotation.body[0].creator.name}</p>
                    </figcaption>
                    <p className="review__comment">{annotation.body[0].value}</p>
                </figure>)
            }
        </div>
    );

    async function fetchContent() {
        try {
            if (router_query?.resource !== undefined) {
                const response = (
                    await axios.get(API_URL + "/resource/" + router_query.resource)
                );
                console.log(response);
                setData(response?.data);

                setResourceValue(response?.data?.resource?.body)

            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchContent();
        if (router_query?.resource !== undefined) {
            const initTerminal = async () => {
                try {
                    const { Recogito } = await import('@recogito/recogito-js');
                    const r = new Recogito({ content: document.querySelector(".wmde-markdown") });
                    setRec(r)
                    const resource_id = router_query.resource;
                    const response = (
                        await axios.get(API_URL + "/annotation/get/" + resource_id, {
                            DISABLE_LOADING: true,
                        })
                    )?.data;
                    setAnnotations(response.annotations)

                    r.setAnnotations(response.annotations)
                    r.setAuthInfo({
                        id: `https://bucademy.tk/user/${localStorage.getItem("user_id")}`,
                        displayName: localStorage.getItem("display_name")
                    });

                    r.on('createAnnotation', async (annotation) => {
                        setAnnotations(r.getAnnotations())
                        try {
                            await axios.post(API_URL + "/annotation", { ...annotation, resource: resource_id },
                                {
                                    DISABLE_LOADING: true,
                                })
                        }
                        catch (e) {
                            console.log(e)
                        }
                    });
                    r.on('updateAnnotation', async (annotation, previous) => {
                        setAnnotations(r.getAnnotations())
                        try {
                            await axios.put(API_URL + "/annotation/update", { ...annotation, resource: resource_id },
                                {
                                    DISABLE_LOADING: true,
                                })
                        }
                        catch (e) {
                            console.log(e)
                        }
                    });
                    r.on('deleteAnnotation', async (annotation, previous) => {
                        const annos = r.getAnnotations()
                        setAnnotations(annos)
                        if (annos.length == 0) {
                            setOpen(false)
                        }
                        try {
                            await axios.delete(API_URL + "/annotation/delete", { data: { ...annotation, resource: resource_id }, DISABLE_LOADING: true })
                        }
                        catch (e) {
                            console.log(e)
                        }
                    });

                    clearInterval(intervalId);
                }
                catch (err) {
                    console.log(err)
                }
            }
            intervalId = setInterval(initTerminal, 1000);
        }
    }, [router_query]);

    function onEditButtonClicked() {
        setEditModeActive(!editModeActive);
    }

    async function fetchDiscussion() {

        try {
            const response = (
                await axios.get(API_URL + "/discussion/" + data?.resource?.discussion?._id,
                    {
                        DISABLE_LOADING: true,
                    })
            )?.data;

            setPreviousComments(response.discussion.comments);
        } catch (err) {
            console.log(err);
        }
    }
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCounter((prevCounter) => prevCounter + 1);

    //         fetchDiscussion();
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [discussion.discussion_id]);
    // useEffect(() => {
    //     discussion = router.query;
    //     fetchDiscussion();
    // }, [discussion.discussion_id]);

    useEffect(() => { 
        if (data?.resource?.discussion?._id) {
            setInterval(() => {
                fetchDiscussion(); 
            }, 1000); 
        }
    }, [data?.resource?.discussion?._id])

    return (
        <>
            <div className={styles.resourceDetailPage} style={{ width: open && `calc(100% - ${drawerWidth}px)` }}>
                <div className={styles.resourceDetailHeader}>
                    <CreateNote openCreateNote={openCreateNote} post={post} setPost={setPost} setOpenCreateNote={setOpenCreateNote} id={router_query.resource} />

                    <div className={styles.titleCard}>
                        <h2>{data?.resource?.resource_name}</h2>
                        <h1>{data?.resource?.name}</h1>

                    </div>
                    <div className={styles.resourceDetailHeader} style={{minWidth: "330px"}}>
                        <Button variant="outlined" onClick={() => { setOpenCreateNote(true) }} className={styles.resourceDetailHeaderButton} style={{ marginRight: "30px" }}>
                            add new note
                        </Button>

                        {/* {!editModeActive && <Button onClick={onEditButtonClicked} className={styles.resourceDetailHeaderButton}>Edit</Button>}
                        {editModeActive && <Button onClick={onEditButtonClicked} className={styles.resourceDetailHeaderButton}>Save</Button>} */}
                    </div></div>
                <Link href={`/user/${data?.resource?.creator?._id}`}>
                    <div className="review__user" style={{ cursor: "pointer" }}>
                        <img
                            src={`${API_URL}/user/${data?.resource?.creator?.image}`}
                            alt="User"
                            className="review__photo"
                        />
                        <div className="review__user-box">
                            <p className="review__user-name">{data?.resource?.creator?.name} {data?.resource?.creator?.surname}</p>
                            <p className="review__user-date">{new Date(data?.resource?.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="review__rating">
                            <Rating rating={data?.resource?.average_rating || 4.5}></Rating>
                        </div>
                    </div>

                </Link>




                <div data-color-mode="light" className={styles.mdeBox} >
                    {/* <MDEditor
                        value={resourceValue}
                        onChange={setResourceValue}
                        preview={editModeActive ? "edit" : "preview"}
                        hideToolbar={!editModeActive}
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                        visibleDragbar={false}
                        height="100%"
                    /> */}
                    <MarkdownPreview source={resourceValue} />
                </div>

                <Discussion
                    previousComments={previousComments}
                    setPreviousComments={setPreviousComments}
                    value={value}
                    setValue={setValue}
                    discussion={{discussion_id: data?.resource?.discussion._id}}
                    setReRender={setReRender}
                    reRender={reRender}
                />

                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        anchor="right"
                        variant="persistent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#F2F1F8", border: "none", overflow: "visible" },
                        }}
                        open={open}
                        onClose={handleDrawerToggle}
                    >
                        {drawer}
                    </Drawer>
                </Box>

                {
                    annotations.length > 0 && <CustomTooltip title={open ? "Hide annotations" : "Show annotations"} placement="left" arrow>
                        <IconButton style={{ position: "fixed", right: open ? `${drawerWidth + 32}px` : "32px", bottom: "30px" }} onClick={handleDrawerToggle}>
                            {
                                open ?
                                    <ChevronRight fontSize="large" style={{ color: "#4d4ffa" }} /> :
                                    <ChevronLeft fontSize="large" style={{ color: "#4d4ffa" }} />}
                        </IconButton>
                    </CustomTooltip>
                }
            </div>
        </>
    )
}

resource.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

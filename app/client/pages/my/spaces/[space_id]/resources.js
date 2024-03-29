import {
    Box, Grid, Table, TableBody, TableCell, TableRow,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import { IconContext } from "react-icons";
import { AiOutlineFilePdf } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoMdImage } from "react-icons/io";
import MainLayout from "../../../../layouts/main/MainLayout";
import styles from "../../../../styles/my/resources.module.scss";
import { IconButton } from "@mui/material";
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/router'
import Link from "next/link";
import { API_URL } from "../../../../next.config";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../../components/Button/Button";
import dynamic from "next/dynamic";


export default function resources() {
    const router = useRouter();
    let router_query = router.query;
    const [data, setData] = useState({});
    const [addTopicDialogOpen, setAddTopicDialogOpen] = useState(false);

    async function fetchContent() {
        try {
            if (router_query?.space_id !== undefined) {
                const response = (
                    await axios.get(API_URL + "/space/" + router_query.space_id)
                );
                console.log(response);
                setData(response?.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchContent();
    }, [router_query]);

    const handleClickOpen = () => {
        setAddTopicDialogOpen(true);
    };

    const handleClose = () => {
        setAddTopicDialogOpen(false);
    };

    const handleAddTopic  = async () => {
        const topic_name = document.getElementById('name').value;
        const body = {
            space_id: router_query.space_id,
            name: topic_name
        }
        const response = (
            await axios.post(API_URL + "/topic/", body)
        );
        setAddTopicDialogOpen(false);
        fetchContent();
    };

    function Other(desc) {
        return (
            <a>
                <Grid style={{
                    width: '100%', display: 'flex',
                    flexWrap: 'wrap', margin: 12
                }}>
                    <IconContext.Provider value={{ color: "#4d77eb" }}>
                        <HiOutlineDocumentText size={20} />
                    </IconContext.Provider>
                    <h4> {desc}</h4>
                </Grid>
            </a>);
    }
    function Image(desc) {
        return (
            <a>
                <Grid style={{
                    width: '100%', display: 'flex',
                    flexWrap: 'wrap', margin: 12
                }}>
                    <IconContext.Provider value={{ color: "#3cbd5a" }}>
                        <IoMdImage size={20} />
                    </IconContext.Provider>
                    <h4> {desc}</h4>
                </Grid>
            </a>
        );
    }
    function Pdf(desc) {
        return (
            <a>
                <Grid style={{
                    width: '100%', display: 'flex',
                    flexWrap: 'wrap', margin: 12
                }}>
                    <IconContext.Provider value={{ color: "red" }}>
                        <AiOutlineFilePdf size={20} />
                    </IconContext.Provider>
                    <h4> {desc}</h4>
                </Grid>
            </a>

        );
    }

    return (
        <section className={styles.container}>
            <h2>{data?.space?.name}</h2>
            <div style={{display:"flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px"}}>
                <h1>Resources</h1>
                <Button className={styles.addTopicButton} onClick={handleClickOpen} style={{margin: 0, marginRight: "48px"}}>
                    Add Topic
                </Button>
            </div>
            
            <Grid container spacing={2} style={{ marginBottom: 12 }}>
                <Grid item sx={{ width: '80%', paddingLeft: "4px !important", paddingTop: "4px !important" }}>
                    <Table sx={{ minWidth: 250 }} >
                        <TableBody>
                            {data?.space?.topics?.map((topic, index) => {
                                return (
                                    <TableRow key={index} >
                                        <TableCell>
                                            <Box>
                                                <h3 > {topic.name}</h3>

                                                {
                                                    topic?.resources?.map((resource, index) => {
                                                        return (
                                                            <Link href={`/my/spaces/${router_query.space_id}/resource/${resource._id}`}>
                                                                {Other(resource.name)}
                                                            </Link>
                                                        )
                                                    })
                                                }

                                            </Box>
                                            <Link href={{
                                                pathname: `/my/spaces/${router_query.space_id}/resource/createResource`,
                                                query: { topic_id: topic._id, space_name: data?.space?.name }
                                            }}>
                                                <IconButton>
                                                    <Add />
                                                </IconButton>
                                            </Link>

                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                            {/* <TableRow>
                                <Button className={styles.addTopicButton} onClick={handleClickOpen}>
                                    Add Topic
                                </Button>
                            </TableRow> */}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>

            <Dialog open={addTopicDialogOpen} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        Add a Topic
                    </DialogContentText>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Topic Name:"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddTopic}>
                            Save
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </section>
    );
}

resources.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

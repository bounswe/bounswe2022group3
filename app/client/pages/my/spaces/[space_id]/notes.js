import { useState, useEffect } from "react";
import Note from "../../../../components/Note/note";
import MainLayout from "../../../../layouts/main/MainLayout";
import styles from "../../../../styles/my/notes.module.scss";
import EditNote from "../../../../components/PopUps/EditNote";
import { Button, Divider, Grid, Box, Chip, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import { API_URL } from "../../../../next.config";




import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';



export default function notes() {
    const [openEditNote, setOpenEditNote] = useState(false);
    const [editNote, setEditNote] = useState();
    const [post, setPost] = useState("");
    const [reRender, setReRender] = useState(false);
    const [data, setData] = useState({});
    const [selectTopic, setSelectTopic] = useState([]);
    const [sortTopicOpen, setSortTopicOpen] = useState(false);
    const [groupedNotes, setGroupedNotes] = useState([]);
    const [selectResource, setSelectResource] = useState([]);
    const [resourceFilters, setResourceFilters] = useState([]);
    const router = useRouter();
    let space_id = router.query;

    async function fetchContent() {
        try {
            const response = (
                await axios.get(API_URL + "/space/" + space_id.space_id)
            );

            setData(response?.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchContent();
    }, [router]);
    async function fetchNotes() {
        const body = {
            space_id: space_id.space_id

        }
        try {
            const response = (
                await axios.post(API_URL + "/note/getNoteList", body)
            )?.data;
            setGroupedNotes(groupByTopic(response.notes));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        space_id = router.query;
        fetchNotes();
        fetchContent();
    }, [space_id]);

    useEffect(() => {
        var array = {}
        if (!groupedNotes) {
            return;
        }
        Object.keys(groupedNotes).map((topic) => {
            Object.assign(array, { [topic]: false });
        })
        setResourceFilters([array]);

    }, [groupedNotes]);

    useEffect(() => {
        fetchNotes();
    }, [openEditNote]);

    useEffect(() => { fetchNotes(); }, [reRender])
    const groupByTopic = (array) => {
        
        return array.reduce((result, currentValue) => {
            (result[currentValue.topic.name] = result[currentValue.topic.name] || []).push(
                currentValue
            );
            return result;
        }, {});
    };


    const handleTopicSelection = (event, value) => {
        var array = [];
        if (selectTopic?.includes(value.props.value)) {
            array = selectTopic.filter((topic) => {
                if (topic !== value.props.value) {
                    return (topic);
                }

            });
            setSelectTopic([...array]);
        } else {
            setSelectTopic(prevState => [...prevState, value.props.value]);

        }

    };
    
    const handleResourceSelection = (topic) => (event, value) => { //topic yooksa topicle beraber resourec ekle 
        var val = value.props.value;
        var temp = {};
        Object.assign(temp, selectResource);
        if (!Object.keys(temp)?.includes(topic)) {
            Object.assign(temp, { [topic]: [] });
        }
        if (!temp[topic].includes(val)) {
            temp[topic].push(val);
        } else {
            temp[topic] = temp[topic].filter((element) => {
                if (element !== val) {
                    return element;
                }
            })
        }
        setSelectResource(temp);
    }
    const handleOpenResourceFilter = (topic) => (event, value) => {
        var array ={}
    Object.keys(resourceFilters[0]).filter( (obj_topic) => {
            if(obj_topic === topic){
                Object.assign(array , {[obj_topic] : (!resourceFilters[0][obj_topic])  });
                if(resourceFilters[0][obj_topic]){
                    var temp ={};
                    Object.assign(temp, selectResource);
                    setSelectResource({ ...temp , [obj_topic]: []});
                }
               
            }else{
                Object.assign(array , {[obj_topic] :resourceFilters[0][obj_topic]  });
            }
        });
        setResourceFilters([array]);
    }

    //clıpboarf
    //tag

    return (
        <section className={styles.container}>


            <h2>{data?.space?.name}</h2>
            <h1 style={{ marginBottom: 5 }}>My Notes</h1>
            <div style={{ margin: 0 }}>
                <IconButton size="small"  onClick={() => {
                    if (sortTopicOpen) {
                        setSelectTopic([]);
                    }
                    setSortTopicOpen(!sortTopicOpen)
                }}>
                    <h4 >Filtering</h4>
                    <FilterAltIcon />
                </IconButton >
            </div>
            {sortTopicOpen ? (
                <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel>Select Topic  </InputLabel>
                        <Select
                            multiple
                            value={selectTopic}
                            onChange={handleTopicSelection}
                            input={<OutlinedInput label="Select Topic" />}
                            renderValue={(selected) => selected.join(', ')  }
                        >
                            {Object.keys(groupedNotes).map((topic) => (
                                <MenuItem key={topic} value={topic}>
                                    <Checkbox checked={selectTopic?.includes(topic)} />
                                    <ListItemText primary={topic} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>) :
                (<></>)
            }
            <EditNote openEditNote={openEditNote} note={editNote} setOpenEditNote={setOpenEditNote} post={post} setPost={setPost} />
            {
                Object.keys(groupedNotes).filter((topicName) => {
                    if (!selectTopic.length) {
                        return topicName;
                    }
                    if (selectTopic.includes(topicName)) {
                        return topicName;
                    }
                }).map((topic) => {
                    return (
                        <>
                            <Grid style={{
                                width: '100%', display: 'flex',
                                flexWrap: 'wrap', margin: 1, marginTop: '20px'
                            }}>
                                <h3 >
                                    {topic}
                                    <IconButton size="small" onClick={handleOpenResourceFilter(topic)}>
                                        <MoreVertIcon />
                                    </IconButton >
                                    {  resourceFilters[0][topic] ? 
                                    (<div>
                                        <FormControl sx={{ m: 1, width: 300 }}>
                                            <InputLabel>Select Resource  </InputLabel>
                                            <Select
                                                multiple
                                                value={ [selectResource[topic]] }
                                                onChange={handleResourceSelection(topic)}
                                                input={<OutlinedInput label="Select Resource " />}
                                                renderValue={(selected) => selected.join(', ')}
                                            >
                                                {[...new Set(groupedNotes[topic].map(item => item.resource_name))].map((resource_name) => (
                                                    <MenuItem key={resource_name} value={resource_name}>
                                                        <Checkbox checked={!!selectResource[topic] && selectResource[topic]?.includes(resource_name)}
                                                        />
                                                        <ListItemText primary={resource_name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>)
                                    : (<></>)
                                    }
                                </h3>

                            </Grid>
                            <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
                            <div className={styles.grid}>
                                {
                                    groupedNotes[topic].filter((resourceName) => {
                                        if (!selectResource[topic]) {
                                            return resourceName;
                                        }
                                        if (!selectResource[topic].length) {
                                            return resourceName;
                                        }
                                        if (selectResource[topic].includes(resourceName.resource_name)) {
                                            return resourceName;
                                        }
                                    })?.map((note) => {
                                        return (
                                            <Note note={note.note} setReRender={setReRender} reRender={reRender} space_id={space_id} setEditNote={setEditNote} setOpenEditNote={setOpenEditNote} openEditNote={openEditNote} />
                                        );
                                    })
                                }
                            </div>
                        </>
                    );
                })
            }



        </section >
    )
}

notes.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

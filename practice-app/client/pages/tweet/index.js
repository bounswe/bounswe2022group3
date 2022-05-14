import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../next.config";
import { Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
var randomColor = require('randomcolor');

export default function Tweets() {
    const [averageLengths, setAverageLengths] = useState([]);
    const [averageWordCounts, setAverageWordCounts] = useState([]);
    const [queries, setQueries] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedQueries, setSelectedQueries] = useState([])
    const [newRule, setNewRule] = useState("")
    const [open, setOpen] = useState(false);


    useEffect(() => { fetchRules() }, [])

    const fetchTweets = async (s) => {
        setSelectedQueries(s)
        if (!s) {
            toast.warning("Please select a query");
            return;
        }
        try {
            const body = { tags: s }
            const res = await axios.post(`${API_URL}/twitterSearch/getTweets`, body)
            setAverageLengths(res.data.averageLengths)
            setAverageWordCounts(res.data.averageWordCounts)
            setTags(res.data.tags)
        } catch (error) {
            console.log(error);
        }
    }

    const listenTweets = () => {
        axios.get(`${API_URL}/twitterSearch/listen`)
    }
    const fetchRules = async () => {
        try {
            if (queries && queries.length > 0) return;
            const res = await axios.get(`${API_URL}/twitterSearch/rules`)
            setQueries(res.data)

        } catch (error) {
            console.log(error);

        }
    }
    const createRule = async () => {
        if (!newRule || newRule == '') return;
        const res = await axios.post(`${API_URL}/twitterSearch/create_rule`, { hashtag: newRule })
        setQueries([...queries, res.data.tag])
    }

    const handleSubmitAndClose = () => {
        createRule()
        setOpen(false);
    };

    const colors = {}
    tags.forEach((x) => colors[x] = randomColor())

    return <div style={{ margin: "40px" }}>
        <div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create Hashtag</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can create a new rule and listen
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Hashtag"
                        fullWidth
                        variant="standard"
                        onChange={(x) => setNewRule(x.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmitAndClose}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Button onClick={listenTweets}>
                Fetch Tweets for 2 minutes
            </Button>
            <div></div>
            <Button onClick={() => setOpen(true)}>
                Create a new rule
            </Button>
            <div></div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }} >
                <InputLabel id="demo-simple-select-standard-label">Select hashtags</InputLabel>
                <Select
                    labelId="select-query"
                    id="demo-simple-select"
                    value={selectedQueries}
                    multiple={true}
                    label="Query"
                    onChange={(s) => {
                        fetchTweets(s.target.value)
                    }}
                >
                    {queries.map((x) => { return <MenuItem key={x} value={x}>{x}</MenuItem> })}
                </Select>
            </FormControl>
        </div>
        {averageLengths && averageLengths.length > 0 && <div>
            <p>Average Text Length</p><LineChart
                width={900}
                height={400}
                syncId="Id"
                data={averageLengths}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {tags.map((x) => <Line type="monotone" dataKey={x} key={x + 'top'} stroke={colors[x]} />)}
            </LineChart> </div>}

        {averageWordCounts && averageWordCounts.length > 0 && <div>
            <p>Average Word Counts</p> <LineChart
                width={900}
                height={400}
                syncId="Id"
                data={averageWordCounts}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {tags.map((x) => <Line type="monotone" dataKey={x} key={x + 'bottom'} stroke={colors[x]} />)}
            </LineChart></div>}
    </div>
}
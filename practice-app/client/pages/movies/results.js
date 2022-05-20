import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "../../next.config";
import { toast } from "react-toastify";

export default function Results() {
    const [results, setResults] = useState([]);
    const router = useRouter();

    const movieColumns = [
        {
            field: "id",
            headerName: "ID",
            width: 70,
        },
        {
            field: "title",
            headerName: "Title",
            width: 250,
        },
        {
            field: "overview",
            headerName: "Overview",
            width: 880,
        },
        {
            field: "release_date",
            headerName: "Release Date",
            width: 100,
        },
        {
            field: "vote_average",
            headerName: "Vote Average",
            width: 100,
        },
    ];

    const getResults = async () => {
        const keyword = localStorage.getItem("keyword");
        const res = await axios.get(`${API_URL}/movies/results?keyword=${keyword}`);
        console.log(res)
        if (res.status == 200) {
           setResults(res.data.results);
        } else {
           toast.warning("Something went wrong. Try again.");
        }
    };

    useEffect(() => {
        getResults();
    }, []);

    return (
        <div>
            <h1>Search Results</h1>
            <Grid container justifyContent="flex-end" sx={{ mb: 3 }}>
                <Button
                    variant="contained"
                    onClick={() => router.push("/movies/search")}
                >
                    Back
                </Button>
            </Grid>
            <Grid container>
                <DataGrid
                    rows={results}
                    columns={movieColumns}
                    pageSize={25}
                    checkboxSelection={false}
                    disableSelectionOnClick
                    autoHeight
                />
            </Grid>
        </div>
    );
}

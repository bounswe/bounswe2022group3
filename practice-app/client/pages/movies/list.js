import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "../../next.config";

export default function Chess() {
    const [watchlist, setWatchlist] = useState([]);
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

    const getWatchlist = async () => {
        try {
            const email = localStorage.getItem("email")
            console.log(email)
            const url = `${API_URL}/movies/list?email=${email}`
            const res = await axios.get(url);
            if (res.status == 200) {
                setWatchlist(res.data.watchlist);
            } else {
                router.push('/movies/search')
            }
        } catch (error) {
            router.push('/movies/search')
        }
    };

    useEffect(() => {
        getWatchlist();
    }, []);

    return (
        <div>
            <h1>Your Watchlist</h1>
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
                    rows={watchlist}
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

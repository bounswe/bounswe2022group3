import { PlayCircleFilledOutlined, PreviewOutlined, Visibility } from "@mui/icons-material";
import { Button, Grid, Icon, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../next.config";
import styles from "../../styles/chess/chess.module.scss";

export default function Chess() {
    const [games, setGames] = useState([]);
    const router = useRouter();

    const gameColumns = [
        {
            field: "createdAt",
            headerName: "Created at",
            width: 200,
            renderCell: (params) =>
                new Date(params.row.createdAt).toLocaleString(),
        },
        {
            field: "player_color",
            headerName: "Player Color",
            width: 120,
        },
        {
            field: "winner_color",
            headerName: "Winner",
            width: 120,
            renderCell: (params) => params.row.winner_color || "-",
        },
        {
            field: "status",
            headerName: "Status",
            width: 120,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <>
                    {params.row.winner_color ? (
                        <Button
                            onClick={() =>
                                router.push(`/chess/view/${params.row.game_id}`)
                            }
                        >
                            <Tooltip title="View Game">
                                <Visibility />
                            </Tooltip>
                        </Button>
                    ) : (
                        <Button
                            onClick={() =>
                                router.push(
                                    `/chess/resume/${params.row.game_id}`
                                )
                            }
                        >
                            <Tooltip title="Resume Game">
                                <PlayCircleFilledOutlined />
                            </Tooltip>
                        </Button>
                    )}
                </>
            ),
        },
    ];

    const getGames = async () => {
        const res = (await axios.get(`${API_URL}/chess/games`)).data;
        if (res && res.games) {
            res.games.forEach((game, k) => {
                game.id = k;
            });
            setGames(res.games);
        } else {
            toast.warning("Something went wrong. Try again.");
        }
    };

    useEffect(() => {
        getGames();
    }, []);

    return (
        <div className={`${styles.container} chess`}>
            <h1>Your Previous Games</h1>
            <Grid container justifyContent="flex-end" sx={{ mb: 3 }}>
                <Button
                    variant="contained"
                    onClick={() => router.push("/chess")}
                >
                    Back
                </Button>
            </Grid>
            <Grid container>
                <DataGrid
                    rows={games}
                    columns={gameColumns}
                    pageSize={25}
                    checkboxSelection={false}
                    disableSelectionOnClick
                    autoHeight
                />
            </Grid>
        </div>
    );
}

import { Button, Grid, Stack } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import MyButton from "../../components/Button/Button";
import { API_URL } from "../../next.config";
import styles from "../../styles/chess/chess.module.scss";

export default function Chess() {
    const [difficulty, setDifficulty] = useState(0);
    const [color, setColor] = useState("");

    const router = useRouter();

    const startGame = async () => {
        if (!difficulty) {
            toast.warning("Please, select AI Strength");
            return;
        }
        if (!color) {
            toast.warning("Please, select Color");
            return;
        }

        try {
            const res = (
                await axios.post(`${API_URL}/chess/create_game`, {
                    difficulty,
                    color,
                })
            ).data;
            if (res) {
                localStorage.setItem("chess_game_color", res.player_color);
                router.push(`/chess/board/${res.game_id}`);
            }
            else {
                toast.warning("Something went wrong. Try again.");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={`${styles.container} chess`}>
            <Grid container justifyContent="flex-end" sx={{ mb: 3 }}>
                <Button
                    variant="contained"
                    onClick={() => router.push("/chess")}
                >
                    Back
                </Button>
            </Grid>
            <h1>Create a game against Lichess AI</h1>
            <h3>AI Strength</h3>
            <Stack direction="row" spacing={1}>
                {[...Array(8).keys()].map((diff, i) => {
                    return (
                        <Button
                            variant="outlined"
                            onClick={() => setDifficulty(diff + 1)}
                            disabled={difficulty === diff + 1}
                            key={i}
                        >
                            {diff + 1}
                        </Button>
                    );
                })}
            </Stack>
            <Stack
                direction="row"
                spacing={1}
                style={{ margin: "40px 0 20px 0" }}
            >
                <Button
                    variant="outlined"
                    onClick={() => setColor("black")}
                    disabled={color === "black"}
                >
                    <Image src="/bK.svg" width="50px" height="50px" />
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => setColor("random")}
                    disabled={color === "random"}
                >
                    <Image src="/wbk.svg" width="75px" height="75px" />
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => setColor("white")}
                    disabled={color === "white"}
                >
                    <Image src="/wk.svg" width="50px" height="50px" />
                </Button>
            </Stack>
            <MyButton onClick={startGame}>Play vs AI</MyButton>
        </div>
    );
}

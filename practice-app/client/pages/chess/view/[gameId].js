import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import styles from "../../../styles/chess/chess.module.scss";
import axios from "axios";
import { API_URL } from "../../../next.config";
import { Button, Grid } from "@mui/material";

export default function Board() {
    const chessboardRef = useRef();
    const [game, setGame] = useState(new Chess());
    const [boardOrientation, setBoardOrientation] = useState("white");
    const [chessboardSize, setChessboardSize] = useState(undefined);
    const [moves, setMoves] = useState([]);
    const [currentMove, setMove] = useState(0);

    const router = useRouter();

    function safeGameMutate(modify) {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }

    async function makeMove(move) {
        safeGameMutate((game) => {
            game.move(move, { sloppy: true });
        });

        setMove(currentMove + 1);
    }

    async function getGame() {
        const { gameId } = router.query;
        const res = (await axios.get(`${API_URL}/chess/game/${gameId}`)).data;
        if (res && res.game) {
            setMoves(res.game.moves.split(" "));
            setBoardOrientation(res.game.player_color);
        } else {
            toast.warning("Something went wrong. Try again.");
        }
    }

    useEffect(() => {
        if (!router.isReady) return;

        getGame();
    }, [router.isReady]);

    useEffect(() => {
        function handleResize() {
            if (window.innerHeight < window.innerWidth) {
                setChessboardSize(window.innerHeight - 120);
            } else {
                setChessboardSize(window.innerWidth - 60);
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={styles.container}>
            <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        router.push("/chess/games");
                    }}
                >
                    Back
                </Button>
                <div style={{ display: "flex" }}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            game.undo();
                            setMove(currentMove - 1);
                        }}
                        disabled={currentMove === 0}
                    >
                        Prev
                    </Button>
                    <div style={{ marginRight: "10px" }}>&nbsp;</div>
                    <Button
                        variant="outlined"
                        onClick={() => makeMove(moves[currentMove])}
                        disabled={currentMove === moves.length}
                    >
                        Next
                    </Button>
                </div>
            </Grid>
            <Chessboard
                animationDuration={200}
                boardOrientation={boardOrientation}
                boardWidth={chessboardSize}
                position={game.fen()}
                arePiecesDraggable={false}
                customBoardStyle={{
                    borderRadius: "4px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
                }}
                ref={chessboardRef}
            />
        </div>
    );
}

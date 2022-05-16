import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import styles from "../../../styles/chess/chess.module.scss";
import axios from "axios";
import ndjsonStream from "can-ndjson-stream";
import { API_URL } from "../../../next.config";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export default function Board() {
    const chessboardRef = useRef();
    const [game, setGame] = useState(new Chess());
    const [boardOrientation, setBoardOrientation] = useState("white");
    const [chessboardSize, setChessboardSize] = useState(undefined);
    const [won, setWon] = useState(null);
    const [winner, setWinner] = useState("");

    const router = useRouter();

    function safeGameMutate(modify) {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }

    async function makeMove(move) {
        const possibleMoves = game.moves();

        // exit if the game is over
        if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
            return;

        // console.log("Play: ", move);
        safeGameMutate((game) => {
            game.move(move, { sloppy: true });
        });
    }

    async function onDrop(sourceSquare, targetSquare) {
        const gameCopy = { ...game };
        const { gameId } = router.query;

        const moveStr = sourceSquare + targetSquare;

        const move = gameCopy.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for simplicity
        });
        setGame(gameCopy);

        // illegal move
        if (move === null) return false;

        const res = (
            await axios.post(
                `${API_URL}/chess/make_move`,
                {
                    gameId,
                    moveStr,
                },
                {
                    DISABLE_LOADING: true,
                }
            )
        ).data;

        if (!res["ok"]) return false;

        return true;
    }

    const fetchNdjson = async () => {
        const { gameId } = router.query;

        const response = await fetch(`${API_URL}/chess/stream_game/${gameId}`, {
            method: "get",
        });
        const ndjson = ndjsonStream(response.body);
        const reader = ndjson.getReader();

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            // console.log(value);
            if (
                value &&
                ["mate", "resign", "stalemate", "draw"].includes(value.status)
            ) {
                setWon(value.status);
                if (["mate", "resign"].includes(value.status)) {
                    setWinner(value.winner);
                }
            }
            if (value && (value["moves"] || value.state.moves)) {
                const moves = (value["moves"] || value.state.moves).split(" ");
                makeMove(moves[moves.length - 1]);
            }
        }
        reader.releaseLock();
    };

    useEffect(() => {
        if (!localStorage.getItem("chess_game_color")) {
            router.push("/chess");
            return;
        }
    }, []);

    useEffect(() => {
        if (!router.isReady) return;

        fetchNdjson();
    }, [router.isReady]);

    useEffect(() => {
        if (localStorage.getItem("chess_game_color")) {
            setBoardOrientation(localStorage.getItem("chess_game_color"));
        }

        function handleResize() {
            if (window.innerHeight < window.innerWidth) {
                setChessboardSize(window.innerHeight - 60);
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
            <Chessboard
                animationDuration={200}
                boardOrientation={boardOrientation}
                boardWidth={chessboardSize}
                position={game.fen()}
                onPieceDrop={onDrop}
                customBoardStyle={{
                    borderRadius: "4px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
                }}
                ref={chessboardRef}
            />
            <Dialog onClose={() => setWon(null)} open={won !== null}>
                <DialogTitle>The game has ended.</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {winner
                            ? `The winner is ${winner}.`
                            : `The game resulted in ${won}`}
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => router.push("/chess")}>
                            Go Back to Chess Corner
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}

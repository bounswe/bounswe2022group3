import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { API_URL } from "../../next.config";
import MyButton from "../../components/Button/Button";
import styles from "../../styles/chess/chess.module.scss";
import React, { useEffect } from 'react';

export default function Chess() {
    const [results, setResults] = useState([]);

    const router = useRouter();

    const get_lyrics = async () => {
        try {
            const res = (
                await axios.get(`${API_URL}/lyrics/saved_lyrics`)
            ).data;
            if (res) {
                console.log(res.saved_lyrics);
                setResults(res.saved_lyrics);
            } else {
                console.log("Get lyrics didn't return")
                toast.warning("Something went wrong. Try again.");
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        get_lyrics();
    }, []);


    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent:"center", margin: "20px"}}>
            <h1>Saved Lyrics</h1>
            <div>
               
                    {results.length > 0 && <ul>
                        {results.map(({ full_title, url, lyrics_id }) =>
                            <li>
                                <Link href={url}>
                                    <a target="_blank">{full_title}</a>
                                </Link>
                                <MyButton style={{margin: "10px", width: "20%", display: "inline-block" }} onClick={() => window.open(url,"_blank")}>Go {'>'}</MyButton>
                            </li>
                        )
                        }
                    </ul>}         
            </div>
        </div>
    );
}

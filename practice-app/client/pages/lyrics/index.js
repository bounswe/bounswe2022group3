import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Button from "../../components/Button/Button";
import AuthLayout from "../../layouts/auth/AuthLayout";
import styles from "../../styles/user/form.module.scss";
import axios from "axios";
import { API_URL } from "../../next.config";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import MyButton from "../../components/Button/Button";
import { useState } from "react";

export default function Lyrics() {
    const [searchParameter, setSearchParameter] = useState("");
    const [results, setResults] = useState([]);

    const router = useRouter();

    const getInputValue = async (event) => {
        setSearchParameter(event.target.value);   
        // console.log(searchParameter);     
    };

    const search_lyrics = async () => {
        if (searchParameter.length == 0) {
            toast.warning("Please enter a search parameter");
            return;
        }
        try {
            const body = { 'searchparameter': searchParameter};
            const res = (
                await axios.post(`${API_URL}/lyrics/search_lyrics`, body)
            ).data;
            if (res) {
                console.log(res.searchresult);
                setResults(res.searchresult);
            }
            else { 
                console.log("yok yok")
                toast.warning("Something went wrong. Try again.");
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div className={`${styles.container} chess`}>
            <h1>Welcome to the Lyrics Corner!</h1>
            <h3>Please enter a search parameter and hit search button to search lyrics</h3>
            <div>
                <label>
                    <input type="text" onChange={getInputValue} defaultValue=""/>
                </label>
                <MyButton onClick={search_lyrics}>Search</MyButton>
            </div>
            
            <div>
                <ul>

                    {results.map(({full_title, url})=> <li><a href={url} target="_blank">{full_title}</a></li>)}
                </ul>
            </div>

            <div>
                <MyButton onClick={() => router.push("/lyrics/saved")}>Saved Lyrics</MyButton>
            </div>
        </div>
    );
}
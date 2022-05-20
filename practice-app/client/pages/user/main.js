import MainButton from "../../components/Button/MainButton";
import { useRef, useState, useEffect } from "react";
import MainLayout from "../../layouts/main/MainLayout";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../../next.config";
export default function main() {
    const router = useRouter();
    const [user_name, setUsername] = useState("");

    const handleClick = async (route) => {
        if (route === "chess") {
            router.push('/chess');
        }
        else if (route === "quiz") {
            router.push('/quiz');
        }
        else if (route === "movies") {
            router.push('/movies/search');
        }
        else if (route === "coin") {
            router.push('/coin');
        }
        else if (route === "tweets") {
            router.push('/tweet');
        }
        else if (route === "lyrics") {
            router.push('/lyrics');
        }
        else if (route === "posts") {
            router.push('/posts');
        }
        else if (route === "currency") {
            router.push('/currency');
        }
        else if (route === "verify") {
            router.push('/verify/verify');
        }
    }; 

    const getUsername = async () => {
        const email = localStorage.getItem("email");
        if(!email){
            return
        }
        const res = (await axios.get(`${API_URL}/users/getUsername?email=${email}`)).data;
        if (res && res.user_name) {
            setUsername(res.user_name);
        } else {
            toast.warning("Something went wrong. Try again.");
        }
    };
    useEffect(() => {
        if(!localStorage.getItem("access_token")){
            router.push(`/user/login`);
        };
        getUsername();
    }, []);
    return (
        <>
            <h1 style={{marginBottom:"0"}}>Welcome to The Desert of the Real !</h1>
            <h2 style={{marginBottom:"20px"}}>{user_name}</h2>
            <h2 style={{marginBottom:"30px"}}>Choose Wisely!</h2>

            <div className="grid-container">
                <div className="grid-item" style={{display:"inline-block"}}>
                    <MainButton color="blue" onClick={() => handleClick("chess")}>Chess</MainButton>
                    <MainButton color="blue" onClick={() => handleClick("quiz")}>Quiz</MainButton>
                    <MainButton color="blue" onClick={() => handleClick("movies")}>Movies</MainButton>
                    <MainButton color="blue" onClick={() => handleClick("coin")}>Coin</MainButton>
                </div>
                <div className="grid-item" style={{display:"inline-block"}}>
                    <MainButton color="red" onClick={() => handleClick("tweets")}>Tweets</MainButton>
                    <MainButton color="red" onClick={() => handleClick("lyrics")}>Lyrics</MainButton>
                    <MainButton color="red" onClick={() => handleClick("currency")}>Currency</MainButton>
                    <MainButton color="red" onClick={() => handleClick("posts")}>Posts</MainButton>
                </div>
                <div className="grid-item" style={{display:"inline-block"}}>
                    <MainButton color="red" onClick={() => handleClick("verify")}>Verify</MainButton>
                </div>
            </div>
        </>
    );
}
main.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
import MainButton from "../../components/Button/MainButton";
import { useRef, useState, useEffect } from "react";
import MainLayout from "../../layouts/main/MainLayout";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../../next.config";
export default function main() {
    const router = useRouter();
    const [user_name, setUsername] = useState("");

    const handleClick = async (values) => {
        router.push(`/chess`);
    };
// 

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
            {/* <Image src="/desert.png"  width="729" height="300" /> */}
            <div className="grid-container">
                <div className="grid-item" style={{display:"inline-block"}}>
                <MainButton style={{backgroundColor:"#4253b5"}} onClick={handleClick}>Chess</MainButton>
                <MainButton style={{backgroundColor:"#4253b5"}}>Login</MainButton>
                <MainButton style={{backgroundColor:"#4253b5"}}>Login</MainButton>
                </div>
                <div className="grid-item" style={{display:"inline-block"}}>
                <MainButton style={{backgroundColor:"#CB3C27"}}>Login</MainButton>
                <MainButton style={{backgroundColor:"#CB3C27"}}>Login</MainButton>
                <MainButton style={{backgroundColor:"#CB3C27"}}>Login</MainButton>
                </div>
            </div>
        </>
    );
}
main.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
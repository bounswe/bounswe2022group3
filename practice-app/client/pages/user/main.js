import MainButton from "../../components/Button/MainButton";
import { useRef, useState, useEffect } from "react";
import AuthLayout from "../../layouts/auth/AuthLayout";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../../next.config";
export default function main() {
    const router = useRouter();
    const [user_name, setUsername] = useState("");

    const handleClick = async (values) => {
        router.push(`/chess`);
    };
    if (typeof window !== 'undefined') {
        if(!localStorage.getItem("access_token")){
            router.push(`/user/login`);
        };
    }

    const getUsername = async () => {
        const email = localStorage.getItem("email");
        console.log(email)
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
        getUsername();
    }, []);
    return (
        <>
            <h1 style={{marginBottom:"0"}}>Welcome to The Desert of the Real !</h1>
                <h2 style={{marginBottom:"20px"}}>{user_name}</h2>
                <h2 style={{marginBottom:"30px"}}>Choose Wisely!</h2>
            {/* <Image src="/desert.png"  width="729" height="300" /> */}
            <div className='buttons'>
                {/* TODO: Add necessary buttons for each feature, after all added to master */}
                {/* Make half of the buttons blue and half red, represnting bluepil redpil, maybe add a little border radius to make them look like pill.  */}
                <MainButton style={{backgroundColor:"#4253b5", marginRight: "4rem"}} onClick={handleClick}>Chess</MainButton>
                <MainButton style={{backgroundColor:"#CB3C27", marginLeft: "4rem"}}>Login</MainButton>
                <MainButton style={{backgroundColor:"#4253b5", marginRight: "4rem"}}>Login</MainButton>

                <MainButton style={{backgroundColor:"#CB3C27", marginLeft: "4rem"}}>Login</MainButton>
                <MainButton style={{backgroundColor:"#4253b5", marginRight: "4rem"}}>Login</MainButton>
                <MainButton style={{backgroundColor:"#CB3C27", marginLeft: "4rem"}}>Login</MainButton>
            </div>
        </>
    );
}
main.getLayout = function getLayout(page) {
    return <AuthLayout>{page}</AuthLayout>;
};
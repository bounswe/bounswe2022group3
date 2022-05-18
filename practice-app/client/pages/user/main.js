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
            <h1>Welcome to The Desert of the Real ! </h1>
                <h1>{user_name}</h1>
            {/* <Image src="/desert.png"  width="729" height="300" /> */}
            <div className='buttons'>
                {/* <div>
                    {Endpoints.map(MainButton, this)}
                </div> */}

                <MainButton type="submit" onClick={handleClick}>Chess</MainButton>
                <MainButton type="submit">Login</MainButton>
                <MainButton type="submit">Login</MainButton>
                <MainButton type="submit">Login</MainButton>
                <MainButton type="submit">Login</MainButton>
                <MainButton type="submit">Login</MainButton>
            </div>

        </>
    );
}
main.getLayout = function getLayout(page) {
    return <AuthLayout>{page}</AuthLayout>;
};
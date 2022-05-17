import MainButton from "../../components/Button/MainButton";
import AuthLayout from "../../layouts/auth/AuthLayout";
import { useRouter } from "next/router";
import Image from "next/image";
import desert from '../../public/desert.png'
export default function main() {
    const router = useRouter();

    const handleClick = async (values) => {
        router.push(`/chess`);
    };

    return (
        <>
            <h1>The Desert of the Real !</h1>
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
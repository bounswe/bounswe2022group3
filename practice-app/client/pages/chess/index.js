import { useRouter } from "next/router";
import MyButton from "../../components/Button/Button";
import styles from "../../styles/chess/chess.module.scss";

export default function Chess() {
    const router = useRouter();

    return (
        <div className={`${styles.container} chess`}>
            <h1>Welcome to the Chess Corner!</h1>
            <div>
                <MyButton onClick={() => router.push("/chess/create")}>Create a game</MyButton>
            </div>
            <div>
                <MyButton onClick={() => router.push("/chess/games")}>Previous Games</MyButton>
            </div>
        </div>
    );
}

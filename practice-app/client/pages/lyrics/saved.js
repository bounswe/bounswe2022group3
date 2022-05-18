import { useRouter } from "next/router";
import MyButton from "../../components/Button/Button";
import styles from "../../styles/chess/chess.module.scss";

export default function Chess() {
    const router = useRouter();

    return (
        <div className={`${styles.container} chess`}>
            <h1>Zubaley Burayı Doldurcaz Daha</h1>
        </div>
    );
}

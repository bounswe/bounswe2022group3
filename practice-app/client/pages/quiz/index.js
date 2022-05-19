import { useRouter } from "next/router";
import MyButton from "../../components/Button/Button";

import { API_URL } from "../../next.config";
import styles from "../../styles/QuizForm.module.scss"
export default function Quiz() {
    const router = useRouter();

    return (
        <div className={styles.middle}>
            <h1>Quizzes</h1>
            <div>
                <MyButton onClick={() => router.push("/quiz/new_quiz")}>Create a New Quiz</MyButton>
            </div>
            <div>
                <MyButton onClick={() => router.push("/quiz/user_quiz")}>Saved Quizzes</MyButton>
            </div>
        </div>
    );
}


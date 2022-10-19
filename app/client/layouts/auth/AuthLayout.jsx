import Image from "next/image";
import styles from "./AuthLayout.module.scss";

function AuthLayout({ children }) {
    return (
        <>
            <div className={styles.icon}>
                <Image src="/education.png" width="50px" height="50px" />
                <h2>BUcademy</h2>
            </div>
            <div className={styles.container}>
                <div className={styles.loginFormContainer}>{children}</div>
                <div className={styles.loginImageContainer}>
                    <Image
                        priority
                        src="/login.png"
                        width="100%"
                        height="100%"
                        layout="responsive"
                    />
                </div>
            </div>
        </>
    );
}

export default AuthLayout;

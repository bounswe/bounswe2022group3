import Image from "next/image";
import Link from "next/link";
import styles from "./AuthLayout.module.scss";

function AuthLayout({ children }) {
    return (
        <>
            <Link href="/">
                <div className={styles.icon}>
                    <Image src="/education.png" width="50px" height="50px" />
                    <h2>BUcademy</h2>
                </div>
            </Link>
            
            <div className={styles.container}>
                <div className={styles.loginFormContainer}>{children}</div>
            </div>
        </>
    );
}

export default AuthLayout;

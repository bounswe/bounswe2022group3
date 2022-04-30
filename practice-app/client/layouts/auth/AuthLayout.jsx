import styles from "./AuthLayout.module.scss";

function AuthLayout({ children }) {
    return (
        <div className={styles.container}>
            <div className={styles.loginFormContainer}>{children}</div>
        </div>
    );
}

export default AuthLayout;

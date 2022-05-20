import styles from "./MainLayout.module.scss";

function MainLayout({ style={},children }) {
    return (
        <div className={styles.container}>
            <div className={styles.loginFormContainer}>{children}</div>
        </div>
    );
}

export default MainLayout;

import styles from "./Loading.module.scss";

function Loading({ show }) {
    return (
        <>
            {show && (
                <div className={styles.container}>
                    <div className={styles.lds_dual_ring}></div>
                </div>
            )}
        </>
    );
}

export default Loading;

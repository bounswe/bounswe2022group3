import MainLayout from "../../../../layouts/main/MainLayout";
import styles from "../../../../styles/my/resources.module.scss";

export default function resources() {
    return (
        <section className={styles.container}>
            <h2>Learning Guitar</h2>
            <h1>Resources</h1>
        </section>
    );
}

resources.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

import MainLayout from "../../../../layouts/main/MainLayout";
import styles from "../../../../styles/my/resources.module.scss";

export default function events() {
    return (
        <section className={styles.container}>
            <h2>Learning Guitar</h2>
            <h1>Events</h1>
        </section>
    );
}

events.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

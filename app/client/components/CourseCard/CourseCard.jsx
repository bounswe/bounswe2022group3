import styles from './CourseCard.module.scss'
import Image from "next/image";


function CourseCard({ courseId, courseTitle, courseInfo, courseRating, courseImage, courseInstructor }) {
    const ratingPercent = (courseRating*100)/5;
    return (
        <div className={styles.courseCard}>
            <img
                src={courseImage}
                width="100%"
                height="50%"
                layout="responsive"
            />
            <div className={styles.courseCardInfo}>
                <h3 className={styles.courseCardTitle}>{courseTitle}</h3>
                <p>{courseInfo}</p>
                <div className={styles.courseCardInfoLastLine}>
                    <p>{courseInstructor}</p>
                    <div className={styles.ratings}>
                        <div className={styles.emptyStars}></div>
                        <div className={styles.fullStars} style={{width: ratingPercent + '%'}}></div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default CourseCard
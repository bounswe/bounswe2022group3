import styles from './CourseCard.module.scss'
import Rating from "../Rating/Rating"
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
                    <Rating rating={courseRating}></Rating>
                </div>
                
            </div>
        </div>
    )
}

export default CourseCard
import styles from './Rating.module.scss'

function Rating({ rating }) {
    const ratingPercent = (rating*100)/5;
    return (
        <div className={styles.ratings}>
            <div className={styles.emptyStars}></div>
            <div className={styles.fullStars} style={{ width: ratingPercent + '%' }}></div>
        </div>
    )
}

export default Rating
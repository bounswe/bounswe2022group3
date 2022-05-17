import styles from './Button.module.scss'

function MainButton({type="button",onClick=() => {}, children}) {
  return (
    <button type={type} onClick={onClick} className={styles.mainButton}>
        {children}
    </button>
  )
}

export default MainButton
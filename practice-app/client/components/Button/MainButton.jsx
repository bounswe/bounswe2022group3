import styles from './Button.module.scss'

function MainButton({type="button", style={},onClick=() => {}, children}) {
  return (
    <button type={type} style={style} onClick={onClick} className={styles.mainButton}>
        {children}
    </button>
  )
}

export default MainButton
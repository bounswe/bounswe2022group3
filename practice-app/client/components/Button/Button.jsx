import styles from './Button.module.scss'

function Button({ type = "button", onClick = () => { }, children }) {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {children}
    </button>
  )
}

export default Button
import styles from './Button.module.scss'

function Button({type="button", children}) {
  return (
    <button type={type} className={styles.button}>
        {children}
    </button>
  )
}

export default Button
import styles from './Button.module.scss'

function Button({type="button",style={}, onClick=() => {}, children}) {
  return (
    <button type={type} style={style} onClick={onClick} className={styles.button}>
        {children}
    </button>
  )
}

export default Button
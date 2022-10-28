import styles from './Button.module.scss'

function Button({children, ...props}) {
  return (
    <button type="button" {...props} className={styles.button + ((" " + props.className) || "")}>
        {children}
    </button>
  )
}

export default Button
import styles from "./Button.module.scss";

function MainButton({
    color,
    type = "button",
    style = {},
    onClick = () => {},
    children,
}) {
    return (
        <button
            type={type}
            style={style}
            onClick={onClick}
            className={`${styles.mainButton} ${
                color === "red" ? styles.mainButton_red : styles.mainButton_blue
            }`}
        >
            {children}
        </button>
    );
}

export default MainButton;

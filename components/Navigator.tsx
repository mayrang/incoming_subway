
import styles from "../styles/Navigator.module.scss";

interface NavigatorProps {
    leftButton?: JSX.Element;
    leftOnClick?: () => void;
    centerText: string|undefined;
    rightButton?: JSX.Element;
}

const Navigator = ({leftButton, leftOnClick, centerText, rightButton}:NavigatorProps) => {
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.leftIcon} onClick={leftOnClick}>{leftButton}</div>
                <div className={styles.logo}>{centerText}</div>
                <div className={styles.rightIcon}>{rightButton}</div>
            </nav>
        </header>
    );
};

export default Navigator;
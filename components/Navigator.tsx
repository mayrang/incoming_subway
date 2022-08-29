
import styles from "../styles/Navigator.module.scss";

interface NavigatorProps {
    leftButton?: JSX.Element;
    leftOnClick?: () => void;
    centerText: string|undefined;
}

const Navigator = ({leftButton, leftOnClick, centerText}:NavigatorProps) => {
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.leftIcon} onClick={leftOnClick}>{leftButton}</div>
                <div className={styles.logo}>{centerText}</div>
            </nav>
        </header>
    );
};

export default Navigator;
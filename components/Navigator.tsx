import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import styles from "../styles/Navigator.module.scss";

const Navigator = () => {
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.leftIcon}><FontAwesomeIcon icon={faArrowLeft} size="lg"/></div>
                <div className={styles.logo}>Home</div>
            </nav>
        </header>
    );
};

export default Navigator;
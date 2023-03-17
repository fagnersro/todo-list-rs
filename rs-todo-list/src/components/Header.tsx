import styles from "./Header.module.css";
import todoListLogo from "../assets/Logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={todoListLogo} alt="Todo list" />
    </header>
  );
}

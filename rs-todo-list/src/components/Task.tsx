import styles from "./Task.module.css";
import { Trash } from "@phosphor-icons/react";
import { ChangeEvent } from "react";

interface TaskProps {
  id: string;
  content: string;
  isComplete: boolean;

  onCheckTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Task({
  id,
  content,
  isComplete,
  onCheckTask,
  onDeleteTask,
}: TaskProps) {
  function handlePreventSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function onCheked() {
    onCheckTask(id);
  }

  return (
    <li className={styles.task}>
      <form onSubmit={handlePreventSubmit} className={styles.wrapper}>
        <div className={styles.content}>
          <div>
            <input
              type="checkbox"
              name={id}
              id={id}
              onClick={onCheked}
              defaultChecked={isComplete}
            />
          </div>

          <label htmlFor={id} className={styles.paragraph}>
            <p className={isComplete ? styles.paragraph2 : styles.paragraph}>
              {content}
            </p>
          </label>

          <div className={styles.wrapperBtnDelete}>
            <button className={styles.btnDelete} onClick={handleDeleteTask}>
              <Trash />
            </button>
          </div>
        </div>
      </form>
    </li>
  );
}

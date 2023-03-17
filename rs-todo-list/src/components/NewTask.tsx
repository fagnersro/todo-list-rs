import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

import { PlusCircle } from "@phosphor-icons/react";
import clipBoard from "../assets/Clipboard.svg";
import styles from "./NewTask.module.css";
import { Task } from "./Task";

interface TypeTask {
  id: string;
  content: string;
  isComplete: boolean;
}

export function NewTask() {
  const [tasks, setTasks] = useState<TypeTask[]>([]);
  const [taskContent, setTaskContent] = useState("");
  const [tasksCompleted, setTasksCompleted] = useState(0);

  const isInputEmpty = taskContent.length === 0;

  useEffect(() => {
    const tasksDone = tasks.reduce((accumulator, { isComplete }) => {
      return isComplete ? accumulator + 1 : accumulator;
    }, 0);

    setTasksCompleted(tasksDone);
  }, [tasks]);

  useEffect(() => {
    const toLocalStorage = localStorage.getItem("task-list");
    const toLocalStoreJSON = JSON.parse(toLocalStorage!) || "";
    setTasks(toLocalStoreJSON);
  }, []);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (!isInputEmpty) {
      const newTask = {
        id: uuidv4(),
        content: taskContent,
        isComplete: false,
      };

      setTasks([newTask, ...tasks]);
      setTaskContent("");
      localStorage.setItem("task-list", JSON.stringify([newTask, ...tasks]));
    }
  }

  function handleTaskIsCompleted(taskId: string) {
    const checkedTask = tasks.map((task) =>
      task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
    );
    setTasks(checkedTask);
    localStorage.setItem("task-list", JSON.stringify(checkedTask));
  }

  function handleDeleteTask(taskToDeleteId: String) {
    const taskWithoutDeleteOne = tasks.filter(
      (task) => task.id !== taskToDeleteId
    );
    setTasks(taskWithoutDeleteOne);
    localStorage.setItem("task-list", JSON.stringify(taskWithoutDeleteOne));
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setTaskContent(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("O que vamos memorizar ?");
  }

  return (
    <>
      <form onSubmit={handleCreateNewTask} className={styles.formNewTask}>
        <div>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
            value={taskContent}
          />

          <button type="submit">
            Criar
            <PlusCircle size={16} />
          </button>
        </div>
      </form>

      <article className={styles.tasks}>
        <header>
          <div className={styles.counterTask}>
            <p className={styles.TaskP}>Tarefas Críadas</p>

            <span>{tasks.length}</span>
          </div>

          <div className={styles.counterComplete}>
            <p className={styles.completeP}>Concluídas</p>

            {tasksCompleted > 0 ? (
              <span className={styles.dualCounter}>
                <span>{tasksCompleted}</span>
                <span>de</span>
                <span>{tasks.length}</span>
              </span>
            ) : (
              <span>0</span>
            )}
          </div>
        </header>

        {tasks.length ? (
          <main className={styles.containerDownOnTask}>
            {tasks.map(({ id, content, isComplete }) => {
              return (
                <ul key={id}>
                  <Task
                    id={id}
                    content={content}
                    isComplete={isComplete}
                    onDeleteTask={handleDeleteTask}
                    onCheckTask={handleTaskIsCompleted}
                  />
                </ul>
              );
            })}
          </main>
        ) : (
          <main className={styles.containerDown}>
            <div className={styles.empty}>
              <img src={clipBoard} alt="Clipboard" />

              <div className={styles.emptyContent}>
                <span>Você ainda não tem tarefas cadastradas</span>

                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
          </main>
        )}
      </article>
    </>
  );
}

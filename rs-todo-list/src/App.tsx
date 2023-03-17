import { Header } from "./components/Header";
import { NewTask } from "./components/NewTask";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.wrapper}>
        <NewTask />
      </div>
      <footer style={{ height: "30px" }}></footer>
    </div>
  );
}

export default App;

import Flow from "../Flow";
import SQLHabitLogo from "./SQLHabitLogo";

import "./App.css";

function App() {
  return (
    <div className="App">
      <a
        href="https://www.sqlhabit.com"
        target="_blank"
        rel="noreferrer"
        className="App__logo">
        <SQLHabitLogo/>
      </a>
      <Flow />
    </div>
  );
}

export default App;

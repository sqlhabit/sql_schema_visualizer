import Visualizer from "../Visualizer";
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
      <Visualizer />
    </div>
  );
}

export default App;

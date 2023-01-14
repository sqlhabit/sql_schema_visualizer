import Flow from '../Flow';
import SQLHabitLogo from "./SQLHabitLogo";

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App__logo">
        <SQLHabitLogo/>
      </div>
      <Flow />
    </div>
  );
}

export default App;

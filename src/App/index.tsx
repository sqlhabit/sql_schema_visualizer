import Visualizer from "../Visualizer";
import SQLHabitLogo from "./SQLHabitLogo";
import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";
import databases from "../config/databases.json";
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

      <Routes>
        <Route path="/" element={<Database />}>
          <Route path="databases/:slug" element={<Database />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Layout() {
  return (
    <div className="layout">
      <div className="layout__outlet">
        <Outlet />
      </div>
    </div>
  );
}

function Database() {
  let { slug } = useParams();

  const databaseNames = Object.keys(databases);
  const databaseName = slug || databaseNames[0];

  return (
    <Visualizer database={databaseName} />
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;

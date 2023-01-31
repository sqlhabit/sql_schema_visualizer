import Visualizer from "../Visualizer";
import SQLHabitLogo from "./SQLHabitLogo";
import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";

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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="databases/:slug" element={<Database />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav style={{position: "absolute", right: 24}}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/databases/bindle">Bindle</Link>
          </li>
          <li>
            <Link to="/databases/finance">Finance</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <div style={ { width: 800, height: 600 } }>
        <Outlet />
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Database() {
  let { slug } = useParams();

  return (
    <Visualizer database={slug} />
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

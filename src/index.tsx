import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

const root = (document.getElementById("root") as HTMLElement);

const basename = process.env.NODE_ENV === "production" ? "/sql_schema_visualizer" : "/";

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

import { render, } from "@testing-library/react";
import { createMemoryHistory } from "history";

import App from ".";
import { Router } from "react-router-dom";

test("renders SQL Habit logo", () => {
  const history = createMemoryHistory();

  const { container } = render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const logo = container.querySelector(".App__logo");

  expect(logo).toBeInTheDocument();
});

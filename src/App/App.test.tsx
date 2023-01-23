import { render, } from "@testing-library/react";

import App from ".";

test("renders SQL Habit logo", () => {
  const { container } = render(<App />);

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const logo = container.querySelector(".App__logo");

  expect(logo).toBeInTheDocument();
});

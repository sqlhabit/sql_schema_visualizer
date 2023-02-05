import { render } from "@testing-library/react";
import Visualizer from ".";

const wrapperStyle = { width: 1200, height: 800 };

test("renders nodes and edges", async () => {
  const { container } = render(
    <div style={wrapperStyle}>
      <Visualizer database={"bindle"} />
    </div>
  );

  console.log(container.innerHTML);

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const nodes = container.getElementsByClassName("react-flow__node");
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const edges = container.getElementsByClassName("react-flow__edge");

  expect(nodes.length).toBe(14);

  // Edges are added onInit, so we know node widths
  // and can properly calculate edge handle positions.
  expect(edges.length).toBe(0);
});

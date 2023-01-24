import { Node } from "reactflow";
import { TablePositions } from "../types";

export const logTablePositions = (tableNodes: Node[]) => {
  const positions = {} as TablePositions;

  const compare = ( a: String, b: String ) => {
    if ( a < b ) {
      return -1;
    }

    if ( a > b ) {
      return 1;
    }

    return 0;
  }

  tableNodes.sort((n1: Node, n2: Node) => compare(n1.id, n2.id)).forEach((n: Node) => {
    positions[n.id as keyof TablePositions] = {
      x: Math.round(n.position.x),
      y: Math.round(n.position.y)
    };
  });

  navigator.clipboard.writeText(JSON.stringify(positions, null, 2));

  console.log(JSON.stringify(positions, null, 2));
};

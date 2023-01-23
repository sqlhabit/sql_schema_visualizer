import { Edge } from "reactflow";

export const setEdgeClassName = (edge: Edge) => {
  if(edge.className?.includes("has-many-edge-reversed")) {
    edge.className = "has-many-edge-reversed";
    edge.markerEnd = "hasManyReversed"
  } else if(edge.className?.includes("has-many-edge")) {
    edge.className = "has-many-edge";
    edge.markerEnd = "hasMany"
  } else if(edge.className?.includes("has-one-edge-reversed")) {
    edge.className = "has-one-edge-reversed";
    edge.markerEnd = "hasOneReversed"
  } else if(edge.className?.includes("has-one-edge")) {
    edge.className = "has-one-edge";
    edge.markerEnd = "hasOne"
  }

  return edge;
};

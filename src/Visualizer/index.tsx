import { useCallback, useState } from "react";
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Controls,
  ControlButton,
  Background,
  useStoreApi,
  ReactFlowProvider,
  getConnectedEdges,
  OnSelectionChangeParams,
  NodeChange,
  getIncomers,
  getOutgoers
} from "reactflow";

import MaximizeIcon from "./Icons/MaximizeIcon";
import MinimizeIcon from "./Icons/MinimizeIcon";
import InfoIcon from "./Icons/InfoIcon";

import tables from "../Config/Tables";
import tablePositions from "../Config/TablePositions";
import edgeConfigs from "../Config/Edges";

import TableNode from "./TableNode";
import InfoPopup from "./InfoPopup";
import Markers from "./Markers";

import fullTableName from "./helpers/fullTableName";
import edgeClassName from "./helpers/edgeClassName";
import edgeMarkerName from "./helpers/edgeMarkerName";
import calculateTargetPosition from "./helpers/calculateTargetPosition";
import calculateSourcePosition from "./helpers/calculateSourcePosition";

// this is important! You need to import the styles from the lib to make it work
import "reactflow/dist/style.css";
import "./Style";

interface Position {
  x: number;
  y: number;
};

interface Positions {
  tableName: Position;
};

const tablePositionsWithSchema = {} as Positions;

Object.entries(tablePositions).forEach(params => {
  const tableName = params[0];
  const position = params[1] as Position;

  if(tableName.includes(".")) {
    tablePositionsWithSchema[tableName as keyof Positions] = position;
  } else {
    tablePositionsWithSchema[fullTableName(tableName) as keyof Positions] = position;
  }
});

const nodeTypes = {
  table: TableNode,
};

let initialNodes: Node[] = [];

tables.forEach(table => {
  const schemaName = (table as any).schema || "public";
  const tableID = fullTableName(table.name, schemaName);

  const tableDefinition: Node = {
    id: tableID,
    data: table,
    position: (tablePositionsWithSchema as any)[tableID] || { x: 0, y: 0 },
    type: "table"
  }

  initialNodes.push(tableDefinition);
});

edgeConfigs.forEach(edgeConfig => {
  const sourceTableName = fullTableName(edgeConfig.source);
  const targetTableName = fullTableName(edgeConfig.target);

  edgeConfig.source = sourceTableName;
  edgeConfig.target = targetTableName;
})

function Flow() {
  const store = useStoreApi();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const [fullscreenOn, setFullScreen] = useState(false);
  const [infoPopupOn, setInfoPopupOn] = useState(false);
  let nodeHoverActive = true;

  const onInit = (instance: any) => {
    const nodes = instance.getNodes();
    const initialEdges: Edge[] = [];

    edgeConfigs.forEach(edgeConfig => {
      const sourceNode = nodes.find((node: Node) => node.id === edgeConfig.source);
      const targetNode = nodes.find((node: Node) => node.id === edgeConfig.target);

      const sourcePosition = edgeConfig.sourcePosition || calculateSourcePosition(sourceNode.width, sourceNode!.position.x, targetNode.width, targetNode!.position.x);
      const targetPosition = edgeConfig.targetPosition || calculateTargetPosition(sourceNode.width, sourceNode!.position.x, targetNode.width, targetNode!.position.x);

      const sourceHandle = `${edgeConfig.sourceKey}-${sourcePosition === "right" ? "r" : "l"}`;
      const targetHandle = `${edgeConfig.targetKey}-${targetPosition === "right" ? "r" : "l"}`;

      initialEdges.push({
        id: `${edgeConfig.source}-${edgeConfig.target}`,
        source: edgeConfig.source,
        target: edgeConfig.target,
        sourceHandle,
        targetHandle,
        type: "smoothstep",
        markerEnd: edgeMarkerName(edgeConfig, targetPosition),
        className: edgeClassName(edgeConfig, targetPosition)
      });
    });

    setEdges((eds) => eds.concat(initialEdges));

    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "p") {
        const nodes = instance.getNodes();

        const positions = {} as Positions;

        const compare = ( a: String, b: String ) => {
          if ( a < b ) {
            return -1;
          }

          if ( a > b ) {
            return 1;
          }

          return 0;
        }

        nodes.sort((n1: Node, n2: Node) => compare(n1.id, n2.id)).forEach((n: Node) => {
          positions[n.id as keyof Positions] = {
            x: Math.round(n.position.x),
            y: Math.round(n.position.y)
          };
        });

        navigator.clipboard.writeText(JSON.stringify(positions, null, 2));
        console.log(JSON.stringify(positions, null, 2));
      }
    }

    document.addEventListener("keydown", handleKeyboard)

    // https://javascriptf1.com/snippet/detect-fullscreen-mode-with-javascript
    window.addEventListener("resize", (event) => {
      setFullScreen(window.innerHeight === window.screen.height);
    });
  }

  // An SVG z-index hack to move selected edge on top of other edges.
  function moveInFront(element: any) {
    if(!element) {
      return;
    }

    const svg = element.closest("svg");
    svg.appendChild(element);
  }

  // https://github.com/wbkd/react-flow/issues/2580
  const onNodeMouseEnter = useCallback(
    (_: any, node: Node) => {
      if(!nodeHoverActive) {
        return;
      }

      const state = store.getState();
      state.resetSelectedElements();
      state.addSelectedNodes([node.id]);

      const connectedEdges = getConnectedEdges([node], edges);
      connectedEdges.map(edge => {
        // https://reactflow.dev/docs/examples/nodes/update-node/
        setEdges((eds) =>
          eds.map((ed) => {
            if (ed.id === edge.id) {
              if(edge.className?.includes("has-many-edge-reversed")) {
                ed.className = "has-many-edge-reversed has-many-edge-reversed--highlighted";
                ed.markerEnd = "hasManyReversedHighlighted"

                // https://stackoverflow.com/questions/17786618/how-to-use-z-index-in-svg-elements
                const svg = document.querySelector(".react-flow__edges")?.querySelector(`[data-testid="rf__edge-${ed.id}"]`)
                moveInFront(svg)
              } else if(edge.className?.includes("has-many-edge")) {
                ed.className = "has-many-edge has-many-edge--highlighted";
                ed.markerEnd = "hasManyHighlighted"

                const svg = document.querySelector(".react-flow__edges")?.querySelector(`[data-testid="rf__edge-${ed.id}"]`)
                moveInFront(svg)
              } else if(edge.className?.includes("has-one-edge-reversed")) {
                ed.className = "has-one-edge-reversed has-one-edge-reversed--highlighted";
                ed.markerEnd = "hasOneReversedHighlighted"

                const svg = document.querySelector(".react-flow__edges")?.querySelector(`[data-testid="rf__edge-${ed.id}"]`)
                moveInFront(svg)
              } else if(edge.className?.includes("has-one-edge")) {
                ed.className = "has-one-edge has-one-edge--highlighted";
                ed.markerEnd = "hasOneHighlighted"

                const svg = document.querySelector(".react-flow__edges")?.querySelector(`[data-testid="rf__edge-${ed.id}"]`)
                moveInFront(svg)
              }
            }

            return ed;
          })
        );

        return edge
      })
    },
    [edges, nodeHoverActive, setEdges, store]
  );

  const onNodeMouseLeave = useCallback(
    (_: any, node: Node) => {
      if(!nodeHoverActive) {
        return;
      }

      const state = store.getState();
      state.resetSelectedElements();

      setEdges((eds) =>
        eds.map((ed) => {
          if(ed.className?.includes("has-many-edge-reversed")) {
            ed.className = "has-many-edge-reversed";
            ed.markerEnd = "hasManyReversed"
          } else if(ed.className?.includes("has-many-edge")) {
            ed.className = "has-many-edge";
            ed.markerEnd = "hasMany"
          } else if(ed.className?.includes("has-one-edge-reversed")) {
            ed.className = "has-one-edge-reversed";
            ed.markerEnd = "hasOneReversed"
          } else if(ed.className?.includes("has-one-edge")) {
            ed.className = "has-one-edge";
            ed.markerEnd = "hasOne"
          }

          return ed;
        })
      );

      // https://stackoverflow.com/questions/2520650/how-do-you-clear-the-focus-in-javascript
      (document.activeElement as HTMLElement).blur();
    },
    [nodeHoverActive, setEdges, store]
  );

  const onSelectionChange = useCallback(
    (params: OnSelectionChangeParams) => {
      const edges = params.edges;
      edges.forEach(ed => {
        const svg = document.querySelector(".react-flow__edges")?.querySelector(`[data-testid="rf__edge-${ed.id}"]`)
        moveInFront(svg)
      })
    },
    []
  );

  const handleNodesChange = useCallback(
    (nodeChanges: NodeChange[]) => {
      nodeChanges.forEach(nodeChange => {
        if(nodeChange.type === "position" && nodeChange.positionAbsolute) { // nodeChange.positionAbsolute contains new position
          const node = nodes.find(node => node.id === nodeChange.id);

          if(!node) {
            return;
          }

          const incomingNodes = getIncomers(node, nodes, edges);
          incomingNodes.forEach(incomingNode => {
            const edge = edges.find(edge => {
              return edge.id === `${incomingNode.id}-${node.id}`;
            });

            const edgeConfig = edgeConfigs.find(edgeConfig => {
              return edgeConfig.source === incomingNode.id && edgeConfig.target === node.id;
            });

            if(nodeChange.positionAbsolute?.x) {
              setEdges((eds) =>
                eds.map((ed) => {
                  if(edge && ed.id === edge.id) {
                    const sourcePosition = edgeConfig!.sourcePosition || calculateSourcePosition((incomingNode.width as number), incomingNode.position.x, (node.width as number), nodeChange.positionAbsolute!.x);
                    const targetPosition = edgeConfig!.targetPosition || calculateTargetPosition((incomingNode.width as number), incomingNode.position.x, (node.width as number), nodeChange.positionAbsolute!.x);

                    const sourceHandle = `${edgeConfig!.sourceKey}-${sourcePosition === "right" ? "r" : "l"}`;
                    const targetHandle = `${edgeConfig!.targetKey}-${targetPosition === "right" ? "r" : "l"}`;

                    ed.sourceHandle = sourceHandle;
                    ed.targetHandle = targetHandle;
                    ed.className = edgeClassName(edgeConfig, targetPosition);
                    ed.markerEnd = edgeMarkerName(edgeConfig, targetPosition);
                  }

                  return ed;
                })
              )
            }
          });

          const outgoingNodes = getOutgoers(node, nodes, edges);
          outgoingNodes.forEach(targetNode => {
            const edge = edges.find(edge => {
              return edge.id === `${node.id}-${targetNode.id}`;
            });

            const edgeConfig = edgeConfigs.find(edgeConfig => {
              return edgeConfig.source === nodeChange.id && edgeConfig.target === targetNode.id;
            });

            if(nodeChange.positionAbsolute?.x) {
              setEdges((eds) =>
                eds.map((ed) => {
                  if(edge && ed.id === edge.id) {
                    const sourcePosition = edgeConfig!.sourcePosition || calculateSourcePosition((node.width as number), nodeChange.positionAbsolute!.x, (targetNode.width as number), targetNode.position.x);
                    const targetPosition = edgeConfig!.targetPosition || calculateTargetPosition((node.width as number), nodeChange.positionAbsolute!.x, (targetNode.width as number), targetNode.position.x);

                    const sourceHandle = `${edgeConfig!.sourceKey}-${sourcePosition === "right" ? "r" : "l"}`;
                    const targetHandle = `${edgeConfig!.targetKey}-${targetPosition === "right" ? "r" : "l"}`;

                    ed.sourceHandle = sourceHandle;
                    ed.targetHandle = targetHandle;
                    ed.className = edgeClassName(edgeConfig, targetPosition);
                    ed.markerEnd = edgeMarkerName(edgeConfig, targetPosition);
                  }

                  return ed;
                })
              )
            }
          });
        }
      });

      onNodesChange(nodeChanges);
    },
    [onNodesChange, setEdges, nodes, edges]
  )

  const toggleFullScreen = () => {
    if(fullscreenOn) {
      document.exitFullscreen().then(function() {
        setFullScreen(false)
      })
      .catch(function(error) {
        alert("Can't exit fullscreen")
        console.error(error)
      });
    } else {
      var element = document.querySelector("body");

      // make the element go to full-screen mode
      element && element.requestFullscreen()
        .then(function() {
          setFullScreen(true)
        })
        .catch(function(error) {
          alert("Can't turn on fullscreen")
          console.error(error)
        });
    }
  }

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if(e.code === "Escape") {
      setInfoPopupOn(false);
    }
  });

  // https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
  document.addEventListener("click", (event: Event) => {
    const target = (event.target as HTMLInputElement);

    if (target && target.closest(".into-popup-toggle")) {
      return;
    }

    if (target && !target.closest(".info-popup__inner")) {
      setInfoPopupOn(false);
    }
  })

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if(e.code === "MetaLeft") {
      nodeHoverActive = false;
    }
  }, false);

  document.addEventListener("keyup", (e: KeyboardEvent) => {
    if(e.code === "MetaLeft") {
      nodeHoverActive = true;
    }
  }, false);

  // https://stackoverflow.com/questions/16664584/changing-an-svg-markers-color-css
  return (
    <div className="Flow">
      <Markers />
      <ReactFlow
        nodes={nodes}
        onNodesChange={handleNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        snapToGrid={true}
        fitView
        snapGrid={[16, 16]}
        nodeTypes={nodeTypes}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onSelectionChange={onSelectionChange}
      >
        <Controls>
          <ControlButton onClick={toggleFullScreen}>
            {!fullscreenOn && <MaximizeIcon />}
            {fullscreenOn && <MinimizeIcon />}
          </ControlButton>
          <ControlButton onClick={() => { setInfoPopupOn(!infoPopupOn) }} className="into-popup-toggle">
            <InfoIcon />
          </ControlButton>
        </Controls>
        <Background color="#aaa" gap={16} />
      </ReactFlow>
      {infoPopupOn && <InfoPopup onClose={() => { setInfoPopupOn(false) }} />}
    </div>
  );
}

// https://codesandbox.io/s/elastic-elion-dbqwty?file=/src/App.js
// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);

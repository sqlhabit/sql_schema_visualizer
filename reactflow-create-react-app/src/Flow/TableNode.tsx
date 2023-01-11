import { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

import '@reactflow/node-resizer/dist/style.css';

const leftHandleStyle: CSSProperties = {
  width: 2,
  height: 2,
  minWidth: 2,
  left: 0,
  top: "50%",
  transform: "translateX(-50%) translateY(-50%)"
};
const rightHandleStyle: CSSProperties = {
  width: 2,
  height: 2,
  minWidth: 2,
  right: 0,
  top: "50%",
  transform: "translateX(50%) translateY(-50%)"
};

const tableStyle: CSSProperties = {
  border: "1px solid red",
  borderRadius: 4,
  paddingTop: 12,
  backgroundColor: "#FFF"
};
const tableNameStyle: CSSProperties = {
  borderBottom: "1px solid red",
  paddingLeft: 8,
  paddingRight: 8,
  paddingBottom: 12,
  fontWeight: 800,
};
const columnNameStyle: CSSProperties = {
  borderBottom: "1px solid red",
  position: "relative",
  fontSize: 12,
  lineHeight: 1
};
const columnNameInnerStyle: CSSProperties = {
  padding: 8,
};

const TableNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  return (
    <div style={tableStyle}>
      <div style={tableNameStyle}>
        {data.name}
      </div>

      {data.columns.map((column: any, index: any) => (
        <div key={index} style={columnNameStyle} className="column-name">
          {column.handleType && <Handle
            type={column.handleType}
            position={column.handleType === "source" ? Position.Right : Position.Left}
            id={column.name}
            style={column.handleType === "source" ? rightHandleStyle : leftHandleStyle}
            className={column.handleType === "source" ? "source-handle" : "target-handle"}
          />}

          <div style={columnNameInnerStyle}>
            {column.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(TableNode);

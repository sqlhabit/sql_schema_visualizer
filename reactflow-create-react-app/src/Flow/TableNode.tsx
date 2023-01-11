import { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

import '@reactflow/node-resizer/dist/style.css';

const sourceHandleStyle: CSSProperties = {
  left: 0,
  top: "50%",
  transform: "translateX(-50%) translateY(-50%)"
};

const tableStyle: CSSProperties = {
  border: "1px solid red",
  borderRadius: 4,
  paddingTop: 12
};
const tableNameStyle: CSSProperties = {
  borderBottom: "1px solid red",
  paddingLeft: 8,
  paddingRight: 8,
  paddingBottom: 12,
  fontWeight: 800
};
const columnNameStyle: CSSProperties = {
  borderBottom: "1px solid red",
  position: "relative",
  fontSize: 16,
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

      <div style={columnNameStyle} className="column-name">
        <Handle
          type="source"
          position={Position.Left}
          id="a"
          style={sourceHandleStyle}
        />

        <div style={columnNameInnerStyle}>
          id
        </div>
      </div>

      <div style={columnNameStyle} className="column-name">
        <div style={columnNameInnerStyle}>
          <Handle
            type="target"
            position={Position.Left}
            id="b"
            style={sourceHandleStyle}
          />
          user_id
        </div>
      </div>

      <div style={columnNameStyle} className="column-name">
        <div style={columnNameInnerStyle}>
          first_name
        </div>
      </div>

      <div style={columnNameStyle} className="column-name">
        <div style={columnNameInnerStyle}>
          last_name
        </div>
      </div>
    </div>
  );
};

export default memo(TableNode);

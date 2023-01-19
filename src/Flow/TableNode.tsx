import { useState } from 'react';
import { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

import '@reactflow/node-resizer/dist/style.css';

import KeyIcon from "./Icons/KeyIcon";
import schemaColors from './schemaColors';

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
  backgroundColor: "#FFF"
};
const tableNameStyle: CSSProperties = {
  borderBottom: 0,
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 8,
  paddingBottom: 8,
  fontWeight: "bold",
  textAlign: "center"
};
const columnNameStyle: CSSProperties = {
  borderBottom: 0,
  position: "relative",
  fontSize: 12,
  lineHeight: 1,
  zIndex: 50
};
const columnNameInnerStyle: CSSProperties = {
  padding: 8,
  display: "flex",
  justifyContent: "space-between"
};

const TableNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [showDescription, setshowDescription] = useState(false);
  const [descriptionOnHoverActive, setDescriptionOnHoverActive] = useState(false);

  const tableNamebgColor = (schemaName: string) => {
    let bgColor = schemaColors[schemaName];

    if(!bgColor) {
      bgColor = schemaColors.DEFAULT;
    }

    return bgColor
  };

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if(e.code === "MetaLeft") {
      setDescriptionOnHoverActive(true)
    }
  }, false);

  document.addEventListener('keyup', (e: KeyboardEvent) => {
    if(e.code === "MetaLeft") {
      setDescriptionOnHoverActive(false)
    }
  }, false);

  return (
    <div style={tableStyle} className="table">
      <div
        style={{...tableNameStyle, backgroundColor: tableNamebgColor(data.schema) }}
        className="table__name"
        onMouseEnter={() => {
          if(descriptionOnHoverActive) {
            setshowDescription(true)
          }
        }}
        onMouseLeave={() => setshowDescription(false)}>
        {data.schema ? `${data.schema}.${data.name}` : data.name}

        <div className={showDescription ? 'table__description table__description--active' : 'table__description'}>
          {data.description}
        </div>
      </div>

      <div className="table__columns">
        {data.columns.map((column: any, index: any) => (
          <div
            key={index}
            style={columnNameStyle}
            className={selectedColumn === column.name ? 'column-name column-name--selected' : 'column-name'}
            onMouseEnter={() => {
              if(descriptionOnHoverActive) {
                setSelectedColumn(column.name)
              }
            }}
            onMouseLeave={() => setSelectedColumn("")}>
            {column.handleType && <Handle
              type={column.handleType}
              position={Position.Right}
              id={`${column.name}-r`}
              style={rightHandleStyle}
              className={column.handleType === "source" ? "source-handle" : "target-handle"}
            />}
            {column.handleType && <Handle
              type={column.handleType}
              position={Position.Left}
              id={`${column.name}-l`}
              style={leftHandleStyle}
              className={column.handleType === "source" ? "source-handle" : "target-handle"}
            />}

            <div style={columnNameInnerStyle} className="column-name__inner">
              <div className="column-name__name">
                {column.key && <KeyIcon />}
                {column.name}
              </div>
              <div className="column-name__type">
                {column.type}
              </div>

              <div className="column-name__description">
                {column.description || "No description."}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TableNode);

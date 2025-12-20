import { useState, FC, useEffect, memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { KeyIcon } from "../components";
import { markdown } from "../helpers";
import { tableHighlightsPresent, isTableHighlighted, isColumnHighlighted } from "../helpers/tableHighlights";

import "@reactflow/node-resizer/dist/style.css";

const TableNodeComponent: FC<NodeProps> = ({ data }) => {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [showDescription, setshowDescription] = useState(false);
  const [descriptionOnHoverActive, setDescriptionOnHoverActive] = useState(false);

  // Cache for parsed descriptions - only parse when first needed
  const [parsedTableDescription, setParsedTableDescription] = useState<string | null>(null);
  const [parsedColumnDescriptions, setParsedColumnDescriptions] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if(e.code === "MetaLeft") {
        setDescriptionOnHoverActive(true)
      }
    }, false);

    document.addEventListener("keyup", (e: KeyboardEvent) => {
      if(e.code === "MetaLeft") {
        setDescriptionOnHoverActive(false)
      }
    }, false);
  }, []);

  const tableClass = ({ schema, tableName}: { schema: string, tableName: string }) => {
    const classes = ["table"]

    if (isTableHighlighted({ schema, tableName })) {
      classes.push("table--highlighted")
    } else if (tableHighlightsPresent()) {
      classes.push("table--dimmed")
    }

    return classes.join(" ")
  }

  const columnClass = ({ selectedColumn, columnName }: { selectedColumn: string, columnName: string }) => {
    const classes = ["column-name"]

    if (selectedColumn === columnName) {
      classes.push("column-name--selected")
    }

    if (isColumnHighlighted({ schema: data.schema, tableName: data.name, columnName })) {
      classes.push("column-name--highlighted")
    } else if (tableHighlightsPresent()) {
      classes.push("column-name--dimmed")
    }

    return classes.join(" ")
  }

  // Lazy load table description only when first shown
  const getTableDescription = () => {
    if (parsedTableDescription === null) {
      const parsed = markdown(data.description || "No description.");
      setParsedTableDescription(parsed);
      return parsed;
    }
    return parsedTableDescription;
  };

  // Lazy load column description only when first shown
  const getColumnDescription = (column: any) => {
    const cached = parsedColumnDescriptions.get(column.name);
    if (cached !== undefined) {
      return cached;
    }

    const parsed = markdown(column.description || "No description.");
    setParsedColumnDescriptions(new Map(parsedColumnDescriptions.set(column.name, parsed)));
    return parsed;
  };

  return (
    <div
      className={tableClass({ schema: data.schema, tableName: data.name })}>
      <div
        style={isTableHighlighted({ schema: data.schema, tableName: data.name }) ? {} : { backgroundColor: data.schemaColor }}
        className="table__name"
        onMouseEnter={() => {
          if(descriptionOnHoverActive) {
            setshowDescription(true)
          }
        }}
        onMouseLeave={() => setshowDescription(false)}>
        {data.schema ? `${data.schema}.${data.name}` : data.name}

        <div
          className={showDescription ? "table__description table__description--active" : "table__description"}
          dangerouslySetInnerHTML={{__html: showDescription ? getTableDescription() : "" }} />
      </div>

      <div className="table__columns">
        {data.columns.map((column: any, index: any) => (
          <div
            key={index}
            className={columnClass({ selectedColumn, columnName: column.name })}
            onMouseEnter={() => {
              if(descriptionOnHoverActive) {
                setSelectedColumn(column.name)
              }
            }}
            onMouseLeave={() => setSelectedColumn("")}>
            {column.handleType && <Handle
              type={column.handleType}
              position={Position.Right}
              id={`${column.name}-right`}
              className={column.handleType === "source" ? "right-handle source-handle" : "right-handle target-handle"}
            />}
            {column.handleType && <Handle
              type={column.handleType}
              position={Position.Left}
              id={`${column.name}-left`}
              className={column.handleType === "source" ? "left-handle source-handle" : "left-handle target-handle"}
            />}

            <div className="column-name__inner">
              <div className="column-name__name">
                {column.key && <KeyIcon />}
                {column.name}
              </div>
              <div className="column-name__type">
                {column.type}
              </div>

              <div
                className="column-name__description"
                dangerouslySetInnerHTML={{__html: selectedColumn === column.name ? getColumnDescription(column) : "" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
// Only re-render if data changes (which happens when switching databases or updating positions)
export const TableNode = memo(TableNodeComponent);

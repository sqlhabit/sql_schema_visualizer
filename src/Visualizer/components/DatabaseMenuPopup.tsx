import { useState, useEffect } from "react";
import { markdown } from "../helpers";
import { CloseIcon } from "../components";
import { DatabaseMenuPopupProps } from "../types";
import databases from "../../config/databases";

export function DatabaseMenuPopup(props: DatabaseMenuPopupProps) {
  const [parsedHeadline, setParsedHeadline] = useState<string>("");
  const [parsedSubheadline, setParsedSubheadline] = useState<string>("");
  const [parsedDescriptions, setParsedDescriptions] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    // Load headline
    Promise.resolve(markdown(props.headline)).then(setParsedHeadline);

    // Load subheadline if present
    if (props.subheadline) {
      Promise.resolve(markdown(props.subheadline)).then(setParsedSubheadline);
    }

    // Load all database teasers
    Object.keys(databases).forEach(databaseName => {
      Promise.resolve(markdown(databases[databaseName].teaser || "No teaser.")).then(parsed => {
        setParsedDescriptions(prev => new Map(prev).set(databaseName, parsed));
      });
    });
  }, [props.headline, props.subheadline]);

  const databaseHref = ((databaseName: string) => {
    if(process.env.NODE_ENV === "production") {
      return `/sql_schema_visualizer/databases/${databaseName}`
    } else {
      return `/databases/${databaseName}`;
    }
  });

  return (
    <div
      className="info-popup">
      <div className="info-popup__inner">
        <CloseIcon
          className="info-popup__close-icon"
          onClick={() => { props.onClose() }} />

        <h1
          className="info-popup__headline"
          dangerouslySetInnerHTML={{__html: parsedHeadline }} />

        {props.subheadline && <h2
          className="info-popup__subheadline"
          dangerouslySetInnerHTML={{__html: parsedSubheadline }} />}

        <div className="info-popup__body">
          {Object.keys(databases).map(databaseName => {
            return (
              <div key={databaseName}>
                <h3
                  className="info-popup__database-name">
                  { /* design_notes/0001_using_regular_links.md */}
                  <a href={databaseHref(databaseName)}>{databases[databaseName].name}</a>
                </h3>

                <p
                  dangerouslySetInnerHTML={{__html: parsedDescriptions.get(databaseName) || "" }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { markdown } from "../helpers";
import { CloseIcon, InfoIcon } from "../components";
import { DatabaseMenuPopupProps } from "../types";
import databases from "../../config/databases";

export function DatabaseMenuSidebar(props: DatabaseMenuPopupProps) {
  const [parsedHeadline, setParsedHeadline] = useState<string>("");
  const [parsedSubheadline, setParsedSubheadline] = useState<string>("");
  const [parsedTeasers, setParsedTeasers] = useState<Map<string, string>>(new Map());
  const [parsedDescriptions, setParsedDescriptions] = useState<Map<string, string>>(new Map());
  const [expandedTile, setExpandedTile] = useState<string | null>(null);

  useEffect(() => {
    // Load headline
    Promise.resolve(markdown(props.headline)).then(setParsedHeadline);

    // Load subheadline if present
    if (props.subheadline) {
      Promise.resolve(markdown(props.subheadline)).then(setParsedSubheadline);
    }

    // Load all database teasers and descriptions
    Object.keys(databases).forEach(databaseName => {
      Promise.resolve(markdown(databases[databaseName].teaser || "No teaser.")).then(parsed => {
        setParsedTeasers(prev => new Map(prev).set(databaseName, parsed));
      });

      Promise.resolve(markdown(databases[databaseName].description || "No description.")).then(parsed => {
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
    <div className="database-menu-sidebar">
      <div className="database-menu-sidebar__inner">
        <CloseIcon
          className="database-menu-sidebar__close-icon"
          onClick={() => { props.onClose() }} />

        <h1
          className="database-menu-sidebar__headline"
          dangerouslySetInnerHTML={{__html: parsedHeadline }} />

        {props.subheadline && <h2
          className="database-menu-sidebar__subheadline"
          dangerouslySetInnerHTML={{__html: parsedSubheadline }} />}

        <div className="database-menu-sidebar__body">
          {Object.keys(databases).map((databaseName, index) => {
            const isExpanded = expandedTile === databaseName;

            return (
              <a
                href={databaseHref(databaseName)}
                key={databaseName}
                className={`database-tile ${isExpanded ? 'database-tile--expanded' : ''}`}
                onMouseLeave={() => setExpandedTile(null)}>
                <div className="database-tile__index">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="database-tile__content">
                  <h3 className="database-tile__name">
                    {databases[databaseName].name}
                  </h3>
                  <div
                    className="database-tile__teaser"
                    dangerouslySetInnerHTML={{__html: parsedTeasers.get(databaseName) || "" }} />
                  <div
                    className="database-tile__description"
                    dangerouslySetInnerHTML={{__html: parsedDescriptions.get(databaseName) || "" }} />
                </div>
                <div
                  className="database-tile__info-icon"
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    setExpandedTile(databaseName);
                  }}>
                  <InfoIcon />
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  );
};

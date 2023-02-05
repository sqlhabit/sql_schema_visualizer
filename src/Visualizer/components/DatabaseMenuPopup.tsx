import { markdown } from "../helpers";
import { CloseIcon } from "../components";
import { DatabaseMenuPopupProps } from "../types";
import databases from "../../config/databases";

export function DatabaseMenuPopup(props: DatabaseMenuPopupProps) {
  const databaseHref = ((databaseName: string) => {
    return `/databases/${databaseName}`;
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
          dangerouslySetInnerHTML={{__html: markdown(props.headline) }} />

        {props.subheadline && <h2
          className="info-popup__subheadline"
          dangerouslySetInnerHTML={{__html: markdown(props.subheadline) }} />}

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
                  dangerouslySetInnerHTML={{__html: markdown(databases[databaseName].description || "No description.") }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

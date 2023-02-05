import { markdown } from "../helpers";
import { CloseIcon } from "../components";
import { PopupProps } from "../types";
import databases from "../../config/databases";

export function DatabaseMenuPopup(props: PopupProps) {
  return (
    <div
      className="info-popup">
      <div className="info-popup__inner">
        <CloseIcon
          className="info-popup__close-icon"
          onClick={() => { props.onClose() }} />

        <h1
          className="info-popup__headline"
          dangerouslySetInnerHTML={{__html: markdown("Choose database :point_down:") }} />

        <div className="info-popup__body">
          {Object.keys(databases).map(databaseName => {
            return (
              <div key={databaseName}>
                <a href={`/databases/${databaseName}`}>{databases[databaseName].name}</a>

                <div
                  dangerouslySetInnerHTML={{__html: markdown(databases[databaseName].description || "No description.") }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

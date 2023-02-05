import { markdown } from "../helpers";
import { CloseIcon } from "../components";
import { PopupProps } from "../types";
import databases from "../../config/databases";

export function UnknownDatasetPopup(props: PopupProps) {
  return (
    <div
      className="info-popup">
      <div className="info-popup__inner">
        <CloseIcon
          className="info-popup__close-icon"
          onClick={() => { props.onClose() }} />

        <h1 className="info-popup__headline" dangerouslySetInnerHTML={{__html: markdown("Unknown dataset :warning:") }} />

        <div className="info-popup__body">
          <h2>Available datasets</h2>

          {Object.keys(databases).map(databaseName => {
            return (
              <div key={databaseName}>
                <a href={`/databases/${databaseName}`}>{databases[databaseName].name}</a>

                <div>
                  {databases[databaseName].description}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};
